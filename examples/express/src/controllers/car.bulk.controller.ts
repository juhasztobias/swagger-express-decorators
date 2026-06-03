import * as express from 'express';
import 'reflect-metadata';
import { ApiOperationGet, ApiOperationPost, ApiPath, SwaggerDefinitionConstant } from 'swagger-express-decorators';
import { CarsService } from '../services/cars.service';

@ApiPath({
  name: 'CarBulk',
  path: '/car/bulk',
})
export class CarBulkController {
  constructor(private carsService: CarsService) { }

  @ApiOperationPost({
    description: 'Post car objects',
    summary: 'Post new cars',
    parameters: {
      body: {
        description: 'New car',
        required: true,
        model: 'Car',
        type: 'array',
      },
    },
    responses: {
      200: {
        description: 'Success',
        model: 'Car',
      },
      400: { description: 'Parameters fail' },
    },
  })
  public postBulkCar(
    request: express.Request,
    response: express.Response
  ): void {
    if (!request.body) {
      response.status(400).end();
      return;
    }

    response.json(request.body);
  }

  @ApiOperationGet({
    description: 'Get cars objects list by ids',
    summary: 'Get cars list by ids',
    parameters: {
      query: {
        ids: {
          type: 'array',
          required: true,
          items: {
            type: 'string'
          }
        }
      },
    },
    responses: {
      200: {
        description: 'Success',
        type: SwaggerDefinitionConstant.Response.Type.ARRAY,
        model: 'Car',
      },
    },
    security: {
      apiKeyHeader: [],
    },
  })
  public getCarsByIds(
    request: express.Request,
    response: express.Response
  ): void {
    response.json(this.carsService.getCarsByIds(request.query.ids as string[]));
  }
}
