import { NestInterceptor, ExecutionContext, CallHandler, UseInterceptors } from "@nestjs/common";
import { Observable, map } from "rxjs";
import { plainToClass } from 'class-transformer'

export function SerialiseInterceptor(dto: any) {
    return UseInterceptors(new SerialiseInterceptorClass(dto));
}

class SerialiseInterceptorClass implements NestInterceptor {
    constructor(
        private dto: any,
    ) {}

    intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
        return handler
            .handle()
            .pipe(map((data) => plainToClass(this.dto, data, { excludeExtraneousValues: true })));
    }
}
