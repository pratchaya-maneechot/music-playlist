import { StatusCodes } from 'http-status-codes';

export class AppException extends Error {
  readonly httpCode: number;
  readonly statusCode: string;
  constructor(httpCode: StatusCodes, message: string) {
    super(message);
    this.httpCode = httpCode;
    this.statusCode = 'APP';
  }
}

export class DomainException extends Error {
  readonly httpCode: number;
  readonly statusCode: string;
  constructor(httpCode: number, message: string) {
    super(message);
    this.httpCode = httpCode;
    this.statusCode = 'DOMAIN';
  }
}

export class InfraException extends Error {
  readonly httpCode: number;
  readonly statusCode: string;
  constructor(httpCode: number, message: string) {
    super(message);
    this.httpCode = httpCode;
    this.statusCode = 'INFRA';
  }
}

export class InterfaceException extends Error {
  readonly httpCode: number;
  readonly statusCode: string;
  constructor(httpCode: number, message: string) {
    super(message);
    this.httpCode = httpCode;
    this.statusCode = 'INFRA';
  }
}
