import {
  Injectable,
  Inject,
  NestInterceptor,
  CallHandler,
  ExecutionContext,
} from '@nestjs/common';
import { Logger } from 'winston';
import { Observable } from 'rxjs';

@Injectable()
export default class LoggerInterceptor implements NestInterceptor {
  constructor(@Inject('winston') private logger: Logger) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    this.log(context.switchToHttp().getRequest());
    return next.handle();
  }

  private log(req) {
    if (req) {
      const body = { ...req.body };
      delete body.password;
      delete body.passwordConfirmation;
      const { user } = req as any;
      const userEmail = user ? user.email : null;
      this.logger.info({
        timestamp: new Date().toISOString(),
        method: req.method,
        route: req.route.path,
        data: {
          body,
          query: req.query,
          params: req.params,
        },
        from: req.ip,
        madeBy: userEmail,
      });
    } else {
      this.logger.info({
        message: 'Request object not found',
      });
    }
  }
}
