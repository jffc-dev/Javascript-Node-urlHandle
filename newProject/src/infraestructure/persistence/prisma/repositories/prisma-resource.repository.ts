import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ResourceRepository } from 'src/application/contracts/resource.repository';
import { Prisma } from 'generated/prisma';
import { ACTION_FIND } from 'src/application/utils/constants';
import { PrismaResourceMapper } from '../mappers/prisma-resource.mapper';
import { Resource } from 'src/domain/resource';

@Injectable()
export class PrismaResourceRepository implements ResourceRepository {
  constructor(private prisma: PrismaService) {}

  async getResources(): Promise<Resource[]> {
    try {
      const resources = await this.prisma.resource.findMany({});

      const data = resources.map((resource) =>
        PrismaResourceMapper.toDomain(resource),
      );
      return data;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        this.handleDBError(error, ACTION_FIND);
      }
      throw error;
    }
  }

  handleDBError(
    error: Prisma.PrismaClientKnownRequestError,
    action?: string,
  ): void {
    const { meta = {} } = error;
    meta.action = action;

    throw error;
  }
}
