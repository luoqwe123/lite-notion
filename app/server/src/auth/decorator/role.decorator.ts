import { SetMetadata, createParamDecorator, ExecutionContext } from '@nestjs/common';
import { RoleWeight } from '@/common/constants';
// 传入需要的最小权限
export const roleWeight = (minWeight: RoleWeight) => SetMetadata('roles', minWeight);