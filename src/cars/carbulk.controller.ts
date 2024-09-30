import * as express from 'express';
import { inject, injectable } from 'inversify';
import { controller, httpGet, httpPost, interfaces } from 'inversify-express-utils';
import 'reflect-metadata';
import { ApiOperationGet, ApiOperationPost, ApiPath, SwaggerDefinitionConstant } from 'swagger-express-decorators';
import { CarsService } from './cars.service';

@ApiPath({
  name: 'Cars',
  path: '/cars-bulk',
})
@controller('/cars-bulk')
@injectable()
export class CarBulkController implements interfaces.Controller {
  constructor(@inject(CarsService.name) private carsService: CarsService) { }

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
        model: 'Car',
      },
      400: { description: 'Parameters fail' },
    },
  })
  @httpPost('/')
  public postBulkCar(
    request: express.Request,
    response: express.Response
  ): void {
    if (!request.body) {
      return response.status(400).end();
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
        type: SwaggerDefinitionConstant.Response.Type.ARRAY,
        model: 'Car',
      },
    },
    security: {
      apiKeyHeader: [],
    },
  })
  @httpGet('/')
  public getCarsByIds(
    request: express.Request,
    response: express.Response
  ): void {
    response.json(this.carsService.getCarsByIds(request.query.ids as string[]));
  }
}
