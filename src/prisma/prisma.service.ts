import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from 'generated/prisma';
import { url } from 'inspector';

@Injectable()
export class PrismaService extends PrismaClient{
    constructor(config: ConfigService){
        super({
            datasources:{
                db:{
                    url: config.get('DATABASE_URL')
                }
            }
        })
    }
}
