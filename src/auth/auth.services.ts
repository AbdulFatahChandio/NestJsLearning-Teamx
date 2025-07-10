import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
// import { PrismaClientKnownRequestError } from "@prisma/client/rm -rf node_modules package-lock.json";
import { AuthDto } from "./dto";
// import {bcrypt} from "bcrypt";
import * as bcrypt from "bcrypt";

@Injectable({})
export class AuthService {
    constructor(private prisma: PrismaService) {

    }
    // test(){}
    async signup(dto: AuthDto) {
        //Generate a hash password
        const hash = await bcrypt.hash(dto.password, 10);
        //save the user in db
        try {

            const user = await this.prisma.user.create({
                data:
                {
                    email: dto.email,
                    hash
                },
            });
            // delete (user as Partial<any>).hash /** https://stackoverflow.com/questions/63702057/what-is-the-logic-behind-the-typescript-error-the-operand-of-a-delete-operato/63705211 */
            //return the saved user 
            return user;
        } catch (error: any) {
            if (error?.code === 'P2002') {
                throw new ForbiddenException('Credentials taken');
            }
            throw error;
        }

    }

     async signin(dto: AuthDto) {
    // find the user by email
    const user = await this.prisma.user.findUnique({
        where: {
          email: dto.email,
        },
      });
    console.log("🚀 ~ AuthService ~ signin ~ user:", user)
    // if user does not exist throw exception
    if (!user)
      throw new ForbiddenException(
        'Credentials incorrect',
      );

    // compare password
    const matchPassword = await bcrypt.compare(dto.password ,user.hash )
    console.log("🚀 ~ AuthService ~ signin ~ dto.password:", dto.password)
    console.log("🚀 ~ AuthService ~ signin ~ user.hash:", user.hash)
    console.log("🚀 ~ AuthService ~ signin ~ matchPassword:", matchPassword)
    if (!matchPassword)
      throw new ForbiddenException(
        'Credentials incorrect',
      );
    //   delete (user as Partial<any>).hash /** https://stackoverflow.com/questions/63702057/what-is-the-logic-behind-the-typescript-error-the-operand-of-a-delete-operato/63705211 */
            //return the saved user 
            return user;
    }
}