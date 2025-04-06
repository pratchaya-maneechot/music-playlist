/* eslint-disable @typescript-eslint/no-explicit-any */
import { injectable } from 'inversify';
import { ISongService, Song } from '../../domain';
import fetch from 'node-fetch';
import { InfraException } from '../../exceptions';
import { StatusCodes } from 'http-status-codes';

const ITUNES_API_BASE_URL = 'https://itunes.apple.com';
const LIMIT = 15;

@injectable()
export class SongService implements ISongService {
  async searchByTerm(q?: string): Promise<Song[]> {
    if (!q || q.trim() === '') {
      return [];
    }

    const url = `${ITUNES_API_BASE_URL}/search?term=${encodeURIComponent(
      q
    )}&entity=song&limit=${LIMIT}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new InfraException(
        StatusCodes.INTERNAL_SERVER_ERROR,
        `iTunes API request failed with status: ${response.status}`
      );
    }

    const data = await (response.json() as Promise<any>);
    return this.mapToSongs(data.results || []);
  }

  async detail(referenceId: number): Promise<Song> {
    const url = `${ITUNES_API_BASE_URL}/lookup?id=${referenceId}&limit=1`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new InfraException(
        StatusCodes.INTERNAL_SERVER_ERROR,
        `iTunes API request failed with status: ${response.status}`
      );
    }

    const data = await (response.json() as Promise<any>);
    const results = data.results || [];
    if (results.length === 0) {
      throw new InfraException(
        StatusCodes.NOT_FOUND,
        `Song with ID ${referenceId} not found in iTunes`
      );
    }

    return this.mapToSong(results[0]);
  }

  private mapToSongs(results: any[]): Song[] {
    return results.map(this.mapToSong);
  }

  private mapToSong(item: any): Song {
    const durationMillie = item.trackTimeMillie || 0;
    const minutes = Math.floor(durationMillie / 60000);
    const seconds = Math.floor((durationMillie % 60000) / 1000)
      .toString()
      .padStart(2, '0');
    const duration = `${minutes}:${seconds}`;

    const now = new Date();

    return {
      id: item.trackId,
      title: item.trackName,
      artist: item.artistName,
      album: item.collectionName,
      duration,
      createdAt: now,
      updatedAt: now,
    };
  }
}
