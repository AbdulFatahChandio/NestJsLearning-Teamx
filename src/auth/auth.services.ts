import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
// import {bcrypt} from "bcrypt";
import * as bcrypt from "bcrypt";

@Injectable({})
export class AuthService{
    constructor(private prisma :PrismaService){

    }
    // test(){}
    async signup(dto: AuthDto){
        //Generate a hash password
        const hash = await bcrypt.hash(dto.password , 10);
        //save the user in db
        const user = await this.prisma.user.create({
            data:
            {
                email: dto.email,
                hash
            },
        });
delete (user as Partial<any>).hash /** https://stackoverflow.com/questions/63702057/what-is-the-logic-behind-the-typescript-error-the-operand-of-a-delete-operato/63705211 */
        //return the saved user 
        return user;
    }

    signin (){
        return 'I am signed in ';
    }
}