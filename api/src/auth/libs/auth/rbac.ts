import {Role} from './roles.enum';
import { Permission } from './permissions.enum';

export const RolePermissions: Record<Role, Permission[]> ={
    [Role.OWNER]: Object.values(Permission),
    [Role.ADMIN]: [
        Permission.CREATE_TASK,
        Permission.READ_TASK,
        Permission.UPDATE_TASK,
        Permission.DELETE_TASK,
    ],
    [Role.VIEWER]: [Permission.READ_TASK],
};