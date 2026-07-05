import { Module } from '@nestjs/common';
import { documentService } from './document.service';
import { documentController } from './document.controller';

@Module({
  imports: [],
  controllers: [documentController],
  providers: [documentService],
  exports: [documentService],
})


export class documentModule {}