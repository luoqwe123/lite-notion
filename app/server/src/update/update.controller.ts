
import { Body, Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { updateService } from './update.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller("update")
export class updateController {
    constructor(private readonly updateService: updateService) { }
    @Post("image")
    @UseInterceptors(FileInterceptor('file'))
    async uploadImage(@UploadedFile() file: Express.Multer.File) {
        
        return this.updateService.uploadImage(file);
    }
}