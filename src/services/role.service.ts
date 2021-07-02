import { Injectable } from '@nestjs/common';

import PrismaService from './prisma.service';

@Injectable()
export default class RoleService {
  constructor(private prisma: PrismaService) {}

  async find(id: number): Promise<any> {
    return this.prisma.role.findUnique({ where: { id } });
  }
}
