import * as express from 'express';
import { inject, injectable } from 'inversify';
import {
    controller,
    httpGet,
    interfaces,
    requestParam,
} from 'inversify-express-utils';
import 'reflect-metadata';
import {
    ApiOperationGet,
    ApiPath,
    SwaggerDefinitionConstant,
} from 'swagger-express-decorators';
import { CarsService } from './cars.service';

@ApiPath({
    name: 'Cars',
    path: '/cars/{id}',
})
@controller('/cars/:id')
@injectable()
export class CarController implements interfaces.Controller {
    constructor(
        @inject(CarsService.name) private carsService: CarsService
    ) { }

    @ApiOperationGet({
        description: 'Get car object',
        parameters: {
            header: {
                'x-custom-header': {
                    required: true,
                    type: SwaggerDefinitionConstant.Parameter.Type.STRING,
                },
            },
            path: {
                id: {
                    required: true,
                    type: SwaggerDefinitionConstant.Parameter.Type.STRING,
                },
            },
        },
        responses: {
            200: {
                model: 'Car',
            },
            400: {},
        },
    })
    @httpGet('/')
    public getCar(
        @requestParam('id') id: string,
        request: express.Request,
        response: express.Response,
        next: express.NextFunction
    ): void {
        response.json(this.carsService.getCarById(id));
    }
}
