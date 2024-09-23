import { AppRequestLoggerMiddleware } from './app-request-logger.middleware';
import { Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

describe('AppRequestLoggerMiddleware', () => {
  let appRequestLoggerMiddleware: AppRequestLoggerMiddleware;
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;
  let logger: Logger;

  beforeEach(() => {
    appRequestLoggerMiddleware = new AppRequestLoggerMiddleware();
    req = {
      ip: '127.0.0.1',
      method: 'GET',
      path: '/test',
      get: jest.fn().mockReturnValue('user-agent-string'),
    };
    res = {
      statusCode: 200,
      get: jest.fn().mockReturnValue('123'), // Mock content-length header
      on: jest.fn().mockImplementation((event, callback) => {
        if (event === 'close') {
          callback();
        }
      }),
    };
    next = jest.fn();
    logger = new Logger();
    jest.spyOn(logger, 'log').mockImplementation(() => {});
    appRequestLoggerMiddleware['logger'] = logger; // Inject the mocked logger
  });

  it('should be defined', () => {
    expect(appRequestLoggerMiddleware).toBeDefined();
  });

  it('should log the request details on response close', () => {
    appRequestLoggerMiddleware.use(req as Request, res as Response, next);

    expect(res.on).toHaveBeenCalledWith('close', expect.any(Function));
    expect(next).toHaveBeenCalled();

    expect(logger.log).toHaveBeenCalledWith(
      JSON.stringify({
        ip: '127.0.0.1',
        method: 'GET',
        path: '/test',
        userAgent: 'user-agent-string',
        statusCode: 200,
        contentLength: '123',
      })
    );
  });
});
