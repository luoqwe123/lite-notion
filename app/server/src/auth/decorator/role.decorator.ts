import { SetMetadata, applyDecorators,UseGuards } from '@nestjs/common';
import { RoleWeight } from '@/common/constants'; 
import { AuthGuard } from "@nestjs/passport";
import { RoleGuard } from '../guard/role.guard.js';
// 传入需要的最小权限
export function roleWeight(roles:RoleWeight) {
    
    return applyDecorators(SetMetadata("roles",roles),UseGuards(AuthGuard("jwt"),RoleGuard),)

}