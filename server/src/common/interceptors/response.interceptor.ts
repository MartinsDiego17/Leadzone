import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { Response } from "express";
import { ApiResponse } from "../../shared/ApiResponse";


@Injectable()

export class TransformInterceptor<T> implements NestInterceptor<T, ApiResponse<T>> {
    intercept(context: ExecutionContext, next: CallHandler): Observable<ApiResponse<T>> {

        const ctx = context.switchToHttp();
        const req = ctx.getRequest();
        const res = ctx.getResponse<Response>();

        return next.handle().pipe(
            map((result) => {

                res.status(result.status || 200)
                return {
                    success: true,
                    status: result.status || "OK",
                    message: result?.message || 'Request successful',
                    data: result?.data ?? result,
                    timestamp: new Date().toISOString(),
                    path: req.url,
                };
            }),
        );
    }
}
