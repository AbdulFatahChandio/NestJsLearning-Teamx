
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUser = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    return data ? user?.[data] : user;
  },
);




// import {
//   createParamDecorator,
//   ExecutionContext,
// } from '@nestjs/common';

// // import { Request } from 'express';

// export const GetUser = createParamDecorator(
//   (
//     data: string | undefined,
//     ctx: ExecutionContext,
//   ) => {
//     const request: Express.Request = ctx
//       .switchToHttp()
//       .getRequest();
//     if (data) {
//       return request.user[data];
//     }
//     return request.user;
//   },
// );

