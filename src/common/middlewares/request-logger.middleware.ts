import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { createLogger, format, transports } from "winston";

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  private readonly logger = createLogger({
    level: "info",
    format: format.combine(
      format.timestamp(),
      format.colorize(),
      format.printf(({ timestamp, level, message }) => {
        return `[${timestamp}] [${level}] ${message}`;
      }),
    ),
    transports: [new transports.Console()],
  });

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl } = req;
    const startTime = Date.now();

    this.logger.info(`Route: ${method} ${originalUrl}`);
    // res.on('finish', () => {
    // const { statusCode } = res;
    // const duration = Date.now() - startTime;
    // this.logger.info(`Route: ${method} ${originalUrl} | Status: ${statusCode} | Time: ${duration}ms`);
    // });
    next();
  }
}
