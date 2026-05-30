import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import sharp from "sharp";
import axios from 'axios';
import "dotenv/config";

@Injectable()
export class updateService {
    constructor(private prisma: PrismaService,) { }
    // 允许的图片 MIME 类型
    private readonly allowedMimeTypes = [
        'image/jpeg',
        'image/png',
        'image/gif',
        'image/webp',
    ];

    // 允许的文件最大 5MB
    private readonly maxSize = 5 * 1024 * 1024;

    async uploadImage(file: Express.Multer.File) {
        try {
            // 1. 校验文件是否存在
            if (!file) throw new BadRequestException('请上传图片');

            // 2. 校验大小
            if (file.size > this.maxSize) {
                throw new BadRequestException('图片不能超过 5MB');
            }

            // 3. 校验格式
            if (!this.allowedMimeTypes.includes(file.mimetype)) {
                throw new BadRequestException('仅支持 JPG/PNG/GIF/WebP');
            }

            // 4. 图片压缩（企业必做）
            let optimizedBuffer = await sharp(file.buffer)
                .resize(1600, 1600, { fit: 'inside', withoutEnlargement: true })
                .webp({ quality: 80 })
                .toBuffer();

            // 5. 【可选】添加水印（打开即用）
            // optimizedBuffer = await this.addWatermark(optimizedBuffer);

            // 6. 上传到 SM.MS 免费云存储
            const FormData = require('form-data');
            const formData = new FormData();

            formData.append('image', optimizedBuffer, `image_${Date.now()}.webp`);
            //  官方必填：cdn_domain
            formData.append('cdn_domain', 'img.scdn.io');
            const res = await axios({
                method: 'POST',
                url: process.env["TUCHUANG_URL"],
                headers: {
                    ...formData.getHeaders(),
                    // Authorization: process.env["TUCHUANG_KEY"],
                },
                data: formData,
            });
            // console.log("res", res.data.url)

            if (res.data.success) {
                return {
                    url: res.data.data.url,
                    filename: res.data.data.filename,
                    size: file.size,
                };
            } else {
                throw new BadRequestException(res.data.message || '上传失败');
            }
        } catch (err: any) {
            throw new BadRequestException('上传失败：' + err.message);
        }
    }

    // 水印
    private async addWatermark(buffer: Buffer): Promise<Buffer> {
        const watermark = Buffer.from('水印文字');
        return sharp(buffer)
            .composite([
                {
                    input: watermark,
                    gravity: 'southeast',
                },
            ])
            .toBuffer();
    }
}