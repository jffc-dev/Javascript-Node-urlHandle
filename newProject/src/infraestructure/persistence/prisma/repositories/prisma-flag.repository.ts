import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { FlagRepository } from 'src/application/contracts/flag.repository';
import { Flag } from 'src/domain/flag';
import { Prisma } from 'generated/prisma';
import { ACTION_FIND, ACTION_UPDATE } from 'src/application/utils/constants';
import { PrismaClientManager } from '../prisma-client-manager';
import { PrismaFlagMapper } from '../mappers/prisma-flag.mapper';
import { ListFlagsRepositoryDto } from 'src/application/dtos/repository/flag/list.dto';
import { FindByResourceIdsFlagRepositoryDto } from 'src/application/dtos/repository/flag/find-by-resource-ids.dto';
import { FindByIdsFlagRepositoryDto } from 'src/application/dtos/repository/flag/find-by-ids.dto';
import { CreateFlagRepositoryDto } from 'src/application/dtos/repository/flag/create-participants.dto';
import { UpdateFlagRepositoryDto } from 'src/application/dtos/repository/flag/update-participants.dto';

@Injectable()
export class PrismaFlagRepository implements FlagRepository {
  constructor(
    private prisma: PrismaService,
    private clientManager: PrismaClientManager,
  ) {}

  async list(query: ListFlagsRepositoryDto): Promise<Flag[]> {
    const { page, limit } = query;
    try {
      const prismaTx = this.clientManager.getClient();
      const flags = await prismaTx.flag.findMany({
        take: limit,
        skip: (page - 1) * limit,
      });

      const data = flags.map((flag) => PrismaFlagMapper.toDomain(flag));
      return data;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        this.handleDBError(error, ACTION_FIND);
      }
      throw error;
    }
  }

  async findByResourceIds(
    query: FindByResourceIdsFlagRepositoryDto,
  ): Promise<Flag[]> {
    const { resourceIds } = query;
    try {
      const prismaTx = this.clientManager.getClient();
      const flags = await prismaTx.flag.findMany({
        where: {
          resources: {
            some: {
              id: {
                in: resourceIds,
              },
            },
          },
        },
        include: {
          resources: true,
        },
      });
      console.log('flags', flags);
      flags.map((flag) => console.log('flag', flag));

      const data = flags.map((flag) => PrismaFlagMapper.toDomain(flag));
      return data;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        this.handleDBError(error, ACTION_FIND);
      }
      throw error;
    }
  }

  async findByIds(query: FindByIdsFlagRepositoryDto): Promise<Flag[]> {
    const { flagIds } = query;
    try {
      const prismaTx = this.clientManager.getClient();
      const flags = await prismaTx.flag.findMany({
        where: {
          id: {
            in: flagIds,
          },
        },
      });

      const data = flags.map((flag) => PrismaFlagMapper.toDomain(flag));
      return data;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        this.handleDBError(error, ACTION_FIND);
      }
      throw error;
    }
  }

  async create(input: CreateFlagRepositoryDto): Promise<Flag> {
    const { name } = input;
    try {
      const prismaTx = this.clientManager.getClient();
      const flag = await prismaTx.flag.create({
        data: {
          name,
        },
      });
      return PrismaFlagMapper.toDomain(flag);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        this.handleDBError(error, ACTION_FIND);
      }
      throw error;
    }
  }

  async update(input: UpdateFlagRepositoryDto): Promise<Flag> {
    const { id, name } = input;
    try {
      const prismaTx = this.clientManager.getClient();
      const flag = await prismaTx.flag.update({
        where: {
          id,
        },
        data: {
          name,
        },
      });
      return PrismaFlagMapper.toDomain(flag);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        this.handleDBError(error, ACTION_UPDATE);
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
