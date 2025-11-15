import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Response } from 'express';
import { Prisma } from 'generated/prisma';
import { GraphQLError } from 'graphql';

@Catch(
  Prisma.PrismaClientKnownRequestError,
  Prisma.PrismaClientUnknownRequestError,
)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  private response: Response;
  private contextType: string;

  private handleError(code: HttpStatus, message: string) {
    if (this.contextType === 'graphql') {
      throw new GraphQLError(message, {
        extensions: {
          code,
        },
      });
    } else if (this.contextType === 'http') {
      this.response.status(Number(code)).json({ message });
    }
    return;
  }

  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response: Response = ctx.getResponse<Response>();
    const { code, meta } = exception;

    this.contextType = host.getType();
    if (host.getType() === 'http') {
      this.response = response;
    }

    switch (code) {
      case 'P2002': {
        const target = (meta as { target: string[] }).target;
        const message = `Unique constraint failed on the field: ${target.join(', ')}`;
        this.handleError(HttpStatus.FORBIDDEN, message);
        break;
      }
      case 'P2025': {
        const { action, modelName } = meta as {
          action: string;
          modelName: string;
        };
        const message = `Error ${action} ${modelName}, not found`;
        this.handleError(HttpStatus.NOT_FOUND, message);
        break;
      }
      case 'P2003': {
        const { action, modelName, field_name } = meta as {
          action: string;
          modelName: string;
          field_name: string;
        };
        const message = `Error ${action} ${modelName}, something went wrong with ${field_name}`;
        this.handleError(HttpStatus.UNPROCESSABLE_ENTITY, message);
        break;
      }
      default:
        super.catch(exception, host);
        break;
    }
  }
}
