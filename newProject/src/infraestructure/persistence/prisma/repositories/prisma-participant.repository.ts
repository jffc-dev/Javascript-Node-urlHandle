import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ParticipantRepository } from 'src/application/contracts/participant.repository';
import { Participant } from 'src/domain/participant';
import { ListParticipantsRepositoryDto } from 'src/application/dtos/repository/list-participants.dto';
import { PrismaParticipantMapper } from '../mappers/prisma-participant.mapper';
import { Prisma } from 'generated/prisma';
import { ACTION_FIND, ACTION_UPDATE } from 'src/application/utils/constants';
import { CreateParticipantRepositoryDto } from 'src/application/dtos/repository/create-participants.dto';
import { FindByIdsParticipantDto } from 'src/application/dtos/repository/participant/find-by-ids.dto';
import { FindByResourceIdsRepositoryDto } from 'src/application/dtos/repository/participant/find-by-resource-ids.dto';
import { UpdateParticipantRepositoryDto } from 'src/application/dtos/repository/participant/create-participants.dto copy';

@Injectable()
export class PrismaParticipantRepository implements ParticipantRepository {
  constructor(private prisma: PrismaService) {}

  async list(query: ListParticipantsRepositoryDto): Promise<Participant[]> {
    const { page, limit } = query;
    try {
      const participants = await this.prisma.participant.findMany({
        take: limit,
        skip: (page - 1) * limit,
      });

      const data = participants.map((participant) =>
        PrismaParticipantMapper.toDomain(participant),
      );
      return data;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        this.handleDBError(error, ACTION_FIND);
      }
      throw error;
    }
  }

  async findByResourceIds(
    query: FindByResourceIdsRepositoryDto,
  ): Promise<Participant[]> {
    const { resourceIds } = query;
    try {
      const participants = await this.prisma.participant.findMany({
        where: {
          resourceParticipants: {
            some: {
              resourceId: {
                in: resourceIds,
              },
            },
          },
        },
        include: {
          resourceParticipants: true,
        },
      });

      const data = participants.map((participant) =>
        PrismaParticipantMapper.toDomain(participant),
      );
      return data;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        this.handleDBError(error, ACTION_FIND);
      }
      throw error;
    }
  }

  async findByIds(query: FindByIdsParticipantDto): Promise<Participant[]> {
    const { participantIds } = query;
    try {
      const participants = await this.prisma.participant.findMany({
        where: {
          id: {
            in: participantIds,
          },
        },
      });

      const data = participants.map((participant) =>
        PrismaParticipantMapper.toDomain(participant),
      );
      return data;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        this.handleDBError(error, ACTION_FIND);
      }
      throw error;
    }
  }

  async create(input: CreateParticipantRepositoryDto): Promise<Participant> {
    const { name } = input;
    try {
      const participant = await this.prisma.participant.create({
        data: {
          name,
        },
      });
      return PrismaParticipantMapper.toDomain(participant);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        this.handleDBError(error, ACTION_FIND);
      }
      throw error;
    }
  }

  async update(input: UpdateParticipantRepositoryDto): Promise<Participant> {
    const { id, name } = input;
    try {
      const participant = await this.prisma.participant.update({
        where: {
          id,
        },
        data: {
          name,
        },
      });
      return PrismaParticipantMapper.toDomain(participant);
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
