import { Body, Controller, HttpCode, HttpStatus, ParseIntPipe, Post } from "@nestjs/common";
import { AuthService } from "./auth.services";
import { Request } from "express";
import { AuthDto } from "./dto";



@Controller({})
export class AuthController {
    constructor(private authService: AuthService) {
        // this.authService.test() }

    }
    
    @Post('signup')
    signup(@Body() dto: AuthDto) {
        return this.authService.signup(dto);
    }


    // signup(@Body('email') email:String , @Body('password', ParseIntPipe) password:String){
    //     console.log({
    //         email,
    //         typeOfEmail : typeof email,
    //         password,
    //         typeOfPassword : typeof password
    //     });

    //     return this.authService.signup();    
    // }

    //Signup with the simple dto
    // signup(@Body() dto: AuthDto) {
    //     console.log({
    //         dto,
    //     })

    //     return this.authService.signup();    
    // }

    //Signup with request req.body
    // signup(@Req() req: Request) {
    //     console.log("🚀 ~ signup ~ req:", req.body)

    //     return this.authService.signup();    
    // }

    @HttpCode(HttpStatus.OK)
    @Post('signin')
    signin(@Body() dto: AuthDto) {
        return this.authService.signin(dto);
    }
    // signin() {
    //     return this.authService.signin();
    // }

}