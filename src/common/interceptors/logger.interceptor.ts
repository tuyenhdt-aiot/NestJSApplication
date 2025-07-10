import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggerInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const { method, originalUrl, body, query, params } = req;

    const now = Date.now();

    return next.handle().pipe(
      tap((responseData) => {
        const res = context.switchToHttp().getResponse();
        const statusCode = res.statusCode;

        this.logger.log(
          `${method} ${originalUrl} ${statusCode} +${Date.now() - now}ms\n` +
            `Params: ${JSON.stringify(params)}\n` +
            `Query: ${JSON.stringify(query)}\n` +
            `Body: ${JSON.stringify(body)}\n` +
            `Response: ${JSON.stringify(responseData)}`,
        );
      }),
    );
  }
}
