
import { Injectable, NestInterceptor, ExecutionContext, CallHandler, HttpStatus } from '@nestjs/common';
import { map } from "rxjs/operators";


@Injectable()
export class ResponseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler) {
        context.switchToHttp().getResponse().statusCode = 200;
        return next.handle().pipe(
            map((data) => {   // data 就是控制器方法实际返回的数据 。
               
                return data?.meta ?{ code: HttpStatus.OK,meta:data.meta,data:data.data}: {
                    code: HttpStatus.OK,
                    data,
                }
            })
        )
    }
}
