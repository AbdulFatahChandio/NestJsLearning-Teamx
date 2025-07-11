import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
// import { PrismaClientKnownRequestError } from "@prisma/client/rm -rf node_modules package-lock.json";
import { AuthDto } from "./dto";
// import {bcrypt} from "bcrypt";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Injectable({})
export class AuthService {
    constructor(
      private prisma: PrismaService,
      public JWT : JwtService,
      public config : ConfigService

    ) {

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
            return this.signToken(user.id, user.email);
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
<<<<<<< HEAD
    // console.log("🚀 ~ AuthService ~ signin ~ dto.password:", dto.password)
    // console.log("🚀 ~ AuthService ~ signin ~ user.hash:", user.hash)
    // console.log("🚀 ~ AuthService ~ signin ~ matchPassword:", matchPassword)
=======
    //console.log("🚀 ~ AuthService ~ signin ~ dto.password:", dto.password)
    //console.log("🚀 ~ AuthService ~ signin ~ user.hash:", user.hash)
    //console.log("🚀 ~ AuthService ~ signin ~ matchPassword:", matchPassword)
>>>>>>> 08973359d264cf778f9a053057f8e94ff43e1f2e
    if (!matchPassword)
      throw new ForbiddenException(
        'Credentials incorrect',
      );
    //   delete (user as Partial<any>).hash /** https://stackoverflow.com/questions/63702057/what-is-the-logic-behind-the-typescript-error-the-operand-of-a-delete-operato/63705211 */
            //return the saved user 
      return this.signToken(user.id, user.email);
    }
<<<<<<< HEAD
    async signToken(
        userId: number,
        email: string,
      ): Promise<{ access_token: string }> {
        const payload = {
          sub: userId,
          email,
        };
        const secret = this.config.get('JWT_SECRET');
    
        const token = await this.JWT.signAsync(
          payload,
          {
            expiresIn: '15m',
            secret: secret,
          },
        );
    
        return {
          access_token: token,
        };
      }
}


// signToken(userId: number, email: string): Promise<string> {
//   const payload = {
//     sub: userId,
//     email: email
//   }

//   const secret = this.config.get('JWT_SECRET');

//   return this.JWT.signAsync(payload, {
//     secret,           // Make sure to provide the secret
//     expiresIn: '15m',
//   });
// }

// signToken(
//   userId:number,
//   email :string,

// ):Promise<string>{
//   const payload ={
//     sub : userId,
//     email:string,s
//   }

//   const secret = this.config.get('JWT_SECRET')
//   return this.jwt.signAsync(payload , {
//     expiresIn: '15m'
//   })
// }
=======
}
>>>>>>> 08973359d264cf778f9a053057f8e94ff43e1f2e
