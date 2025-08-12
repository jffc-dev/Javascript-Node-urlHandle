import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ResourceRepository } from 'src/application/contracts/resource.repository';
import { Prisma } from 'generated/prisma';
import { ACTION_CREATE, ACTION_FIND } from 'src/application/utils/constants';
import { PrismaResourceMapper } from '../mappers/prisma-resource.mapper';
import { Resource } from 'src/domain/resource';
import { FindResourceRepositoryDto } from 'src/application/dtos/repository/resource/find-resource.dto';
import { FindByParticipantIdsRepositoryDto } from 'src/application/dtos/repository/resource/find-by-participant-ids.dto';
import { CreateResourceRepositoryDto } from 'src/application/dtos/repository/resource/create.dto';
import { SetParticipantsRepositoryDto } from 'src/application/dtos/repository/resource/set-participants.dto';
import { SetFlagsRepositoryDto } from 'src/application/dtos/repository/resource/set-flags.dto';
import { PrismaClientManager } from '../prisma-client-manager';
import { FindByFlagIdsRepositoryDto } from 'src/application/dtos/repository/resource/find-by-flag-ids.dto';
import { UpdateResourceRepositoryDto } from 'src/application/dtos/repository/resource/update.dto';
import { GetRandomRepositoryDto } from 'src/application/dtos/repository/resource/get-random.dto';

@Injectable()
export class PrismaResourceRepository implements ResourceRepository {
  constructor(
    private prisma: PrismaService,
    private clientManager: PrismaClientManager,
  ) {}
  async findByResourceIds(resourceIds: number[]): Promise<Resource[]> {
    try {
      const prismaTx = this.clientManager.getClient();
      const resources = await prismaTx.resource.findMany({
        include: {
          participants: {
            select: {
              id: true,
            },
          },
          flags: {
            select: {
              id: true,
            },
          },
        },
        where: {
          id: {
            in: resourceIds,
          },
        },
      });

      const resourceMap = new Map(resources.map((r) => [r.id, r]));
      const orderedResources = resourceIds
        .map((id) => resourceMap.get(id))
        .filter(Boolean);

      const data = orderedResources.map((resource) => {
        return PrismaResourceMapper.toDomain(resource!);
      });
      return data;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        this.handleDBError(error, ACTION_FIND);
      }
      throw error;
    }
  }

  async getRandom(query: GetRandomRepositoryDto): Promise<number[]> {
    const { size, initialIds = [] } = query;
    try {
      const prismaTx = this.clientManager.getClient();
      const resources = await prismaTx.$queryRaw<{ id: number }[]>`
        WITH id_list AS (
          SELECT unnest(${initialIds}::int[]) AS resourceId
        )
        SELECT id FROM "Resource" 
        WHERE "status" = 'PENDING' AND id NOT IN (SELECT resourceId FROM id_list)
        ORDER BY RANDOM() LIMIT ${size}
      `;

      return resources.map((resource) => resource.id);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        this.handleDBError(error, ACTION_FIND);
      }
      throw error;
    }
  }

  async update(input: UpdateResourceRepositoryDto): Promise<Resource> {
    const { title, url, status, id } = input;
    try {
      const prismaTx = this.clientManager.getClient();
      const resource = await prismaTx.resource.update({
        where: { id },
        data: {
          title,
          url,
          status,
        },
      });

      return PrismaResourceMapper.toDomain(resource);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        this.handleDBError(error, ACTION_CREATE);
      }
      throw error;
    }
  }

  async get(id: number): Promise<Resource> {
    try {
      const prismaTx = this.clientManager.getClient();
      const resource = await prismaTx.resource.findUniqueOrThrow({
        include: {
          participants: true,
          flags: true,
        },
        where: {
          id,
        },
      });

      return PrismaResourceMapper.toDomain(resource);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        this.handleDBError(error, ACTION_FIND);
      }
      throw error;
    }
  }

  async setFlags(input: SetFlagsRepositoryDto): Promise<Resource | null> {
    const { id, flagIds } = input;
    try {
      const prismaTx = this.clientManager.getClient();
      const resource = await prismaTx.resource.update({
        where: { id },
        data: {
          flags: {
            set: flagIds,
          },
        },
        include: {
          flags: true,
        },
      });

      return PrismaResourceMapper.toDomain(resource);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        this.handleDBError(error, ACTION_CREATE);
      }
      throw error;
    }
  }

  async setParticipants(
    input: SetParticipantsRepositoryDto,
  ): Promise<Resource | null> {
    const { id, participantds } = input;
    try {
      const prismaTx = this.clientManager.getClient();
      const resource = await prismaTx.resource.update({
        where: { id },
        data: {
          participants: {
            set: participantds,
          },
        },
        include: {
          participants: true,
        },
      });

      return PrismaResourceMapper.toDomain(resource);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        this.handleDBError(error, ACTION_CREATE);
      }
      throw error;
    }
  }

  async create(input: CreateResourceRepositoryDto): Promise<Resource> {
    const { title, url, parentId, status = 'PENDING' } = input;
    try {
      const prismaTx = this.clientManager.getClient();
      const resource = await prismaTx.resource.create({
        data: {
          title,
          url,
          status,
          parent: {
            connect: parentId ? { id: parentId } : undefined,
          },
        },
      });

      return PrismaResourceMapper.toDomain(resource);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        this.handleDBError(error, ACTION_CREATE);
      }
      throw error;
    }
  }

  async find(query: FindResourceRepositoryDto): Promise<Resource[]> {
    const { page, limit, filter } = query;
    const { status, participantIds, flagIds } = filter;
    try {
      const prismaTx = this.clientManager.getClient();
      const resources = await prismaTx.resource.findMany({
        include: {
          participants: true,
        },
        take: limit,
        skip: (page - 1) * limit,
        where: {
          AND: [
            {
              status: {
                in: status,
              },
            },
            {
              participants: {
                some: {
                  id: participantIds.length
                    ? { in: participantIds }
                    : undefined,
                },
              },
            },
            {
              flags: {
                some: {
                  id: flagIds.length ? { in: flagIds } : undefined,
                },
              },
            },
          ],
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
      const prismaTx = this.clientManager.getClient();
      const resources = await prismaTx.resource.findMany({
        include: {
          participants: true,
        },
        where: {
          participants: {
            some: {
              id: {
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

  async findByFlagIds(query: FindByFlagIdsRepositoryDto): Promise<Resource[]> {
    const { flagIds } = query;
    try {
      const prismaTx = this.clientManager.getClient();
      const resources = await prismaTx.resource.findMany({
        include: {
          flags: true,
        },
        where: {
          flags: {
            some: {
              id: {
                in: flagIds,
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
