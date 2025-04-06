'reflect-metadata';
//
import { mockDeep, mockReset } from 'jest-mock-extended';
import { AddSongToPlaylistCommandHandler } from '../../application/commands/playlist/add-song.handler';
import {
  ISongService,
  ISongRepository,
  IPlaylistRepository,
  Song,
} from '../../domain';
import { AddSongToPlaylistCommand } from '../../application/commands/playlist/defs/add-song';

describe('AddSongToPlaylistCommandHandler', () => {
  const mockSongService = mockDeep<ISongService>();
  const mockSongRepository = mockDeep<ISongRepository>();
  const mockPlaylistRepository = mockDeep<IPlaylistRepository>();

  const handler = new AddSongToPlaylistCommandHandler(
    mockSongService,
    mockSongRepository,
    mockPlaylistRepository
  );

  const sampleCommand = new AddSongToPlaylistCommand({
    playlistId: 123,
    referenceId: 456,
  });

  const sampleSongData: Song = {
    id: 456,
    title: 'Test Song',
    artist: 'Test Artist',
    duration: '',
    album: '',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(() => {
    mockReset(mockSongService);
    mockReset(mockSongRepository);
    mockReset(mockPlaylistRepository);

    mockSongService.detail.mockResolvedValue(sampleSongData);
    mockPlaylistRepository.addSongToPlaylist.mockResolvedValue(undefined);
  });

  it('should add the song to the playlist after syncing song data', async () => {
    mockSongRepository.finOne.mockRejectedValue(new Error('Song not found'));

    await handler.handle(sampleCommand);

    expect(mockSongService.detail).toHaveBeenCalledWith(456);
    expect(mockSongRepository.finOne).toHaveBeenCalledWith(456);
    expect(mockSongRepository.create).toHaveBeenCalledWith(sampleSongData);
    expect(mockPlaylistRepository.addSongToPlaylist).toHaveBeenCalledWith(
      123,
      456
    );
  });

  it('should update existing song data if the song already exists', async () => {
    const existingSong = {
      ...sampleSongData,
      id: 789,
    };
    mockSongRepository.finOne.mockResolvedValue(existingSong);

    await handler.handle(sampleCommand);

    expect(mockSongService.detail).toHaveBeenCalledWith(456);
    expect(mockSongRepository.finOne).toHaveBeenCalledWith(456);
    expect(mockSongRepository.update).toHaveBeenCalledWith(789, sampleSongData);
    expect(mockSongRepository.create).not.toHaveBeenCalled();
    expect(mockPlaylistRepository.addSongToPlaylist).toHaveBeenCalledWith(
      123,
      456
    );
  });

  it('should throw an error if the playlist repository fails', async () => {
    const expectedError = new Error('Failed to add song to playlist');
    mockPlaylistRepository.addSongToPlaylist.mockRejectedValue(expectedError);

    await expect(handler.handle(sampleCommand)).rejects.toThrow(expectedError);
    expect(mockSongService.detail).toHaveBeenCalledWith(456);
  });

  it('should have the correct command name to handle', () => {
    expect(handler.cmdToHandle).toBe('AddSongToPlaylistCommand');
  });
});
