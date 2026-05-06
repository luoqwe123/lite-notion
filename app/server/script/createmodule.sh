#!/bin/bash

# 检查是否提供了足够的参数
if [ $# -ne 2 ]; then
    echo "用法: $0 <文件夹路径> <命名>"
    exit 1
fi

# 获取输入参数
folder_path="$1"
module_name="$2"

# 将命名转换为首字母大写（用于类名）
capitalized_name=$(echo "$module_name" | awk '{print toupper(substr($0,1,1)) substr($0,2)}')

# 检查文件夹是否存在，如果不存在则创建
if [ ! -d "$folder_path" ]; then
    mkdir -p "$folder_path"
    echo "已创建文件夹: $folder_path"
fi

# 创建 x.module.ts 文件
cat << EOF > "$folder_path/$module_name.module.ts"
import { Module } from '@nestjs/common';
import { ${capitalized_name}Controller } from './$module_name.controller';
import { ${capitalized_name}Service } from './$module_name.service';

@Module({
  controllers: [${capitalized_name}Controller],
  providers: [${capitalized_name}Service],
})
export class ${capitalized_name}Module {}
EOF
echo "已创建 $folder_path/$module_name.module.ts"

# 创建 x.service.ts 文件
cat << EOF > "$folder_path/$module_name.service.ts"
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ${capitalized_name}Service {
  constructor(private prisma: PrismaService, private config: ConfigService) {}
}
EOF
echo "已创建 $folder_path/$module_name.service.ts"

# 创建 x.controller.ts 文件
cat << EOF > "$folder_path/$module_name.controller.ts"
import { Controller } from '@nestjs/common';
import { ${capitalized_name}Service } from './${module_name}.service';

@Controller('$module_name')
export class ${capitalized_name}Controller {
  constructor(private readonly ${module_name}Service: ${capitalized_name}Service) {}
}
EOF
echo "已创建 $folder_path/$module_name.controller.ts"