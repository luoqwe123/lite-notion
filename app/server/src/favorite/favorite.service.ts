import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class favoriteService {
     constructor(private prisma: PrismaService,){}
}