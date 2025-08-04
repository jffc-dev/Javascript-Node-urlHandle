import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ResourceRepository } from 'src/application/contracts/resource.repository';
import { Prisma } from 'generated/prisma';
import { ACTION_FIND } from 'src/application/utils/constants';
import { PrismaResourceMapper } from '../mappers/prisma-resource.mapper';
import { Resource } from 'src/domain/resource';
import { FindResourceRepositoryDto } from 'src/application/dtos/repository/resource/find-resource.dto';
import { FindByParticipantIdsRepositoryDto } from 'src/application/dtos/repository/resource/find-by-participant-ids.dto';

@Injectable()
export class PrismaResourceRepository implements ResourceRepository {
  constructor(private prisma: PrismaService) {}

  async find(query: FindResourceRepositoryDto): Promise<Resource[]> {
    const { page, limit, filter } = query;
    try {
      const resources = await this.prisma.resource.findMany({
        include: {
          resourceParticipants: true,
        },
        take: limit,
        skip: (page - 1) * limit,
        where: {
          status: {
            in: filter.status,
          },
        },
      });

      const data = resources.map((resource) => {
        return PrismaResourceMapper.toDomain(resource);
      });
      return data;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        this.handleDBError(error, ACTION_FIND);
      }
      throw error;
    }
  }

  async findByParticipantIds(
    query: FindByParticipantIdsRepositoryDto,
  ): Promise<Resource[]> {
    const { participantIds } = query;
    try {
      const resources = await this.prisma.resource.findMany({
        include: {
          resourceParticipants: true,
        },
        where: {
          resourceParticipants: {
            some: {
              participantId: {
                in: participantIds,
              },
            },
          },
        },
      });

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
