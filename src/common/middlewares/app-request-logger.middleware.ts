import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AppRequestLoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');
  use(req: Request, res: Response, next: NextFunction) {
    const { ip, method, path: url } = req;
    const userAgent = req.get('user-agent');

    res.on('close', () => {
      const { statusCode } = res;
      const contentLength = res.get('content-length');
      this.logger.log(
        JSON.stringify({
          ip: ip,
          method: method,
          path: url,
          userAgent: userAgent,
          statusCode: statusCode,
          contentLength: contentLength
        })
      )
    });

    next();
  }
}
