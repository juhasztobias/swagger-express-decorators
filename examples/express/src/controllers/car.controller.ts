import * as express from 'express';
import 'reflect-metadata';
import {
    ApiOperationGet,
    ApiPath,
    SwaggerDefinitionConstant,
} from 'swagger-express-decorators';
import { CarsService } from '../services/cars.service';

@ApiPath({
    name: 'Cars',
    path: '/cars/{id}',
})
export class CarController {
    constructor(private carsService: CarsService) { }

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
    public getCar(
        request: express.Request,
        response: express.Response,
        next: express.NextFunction
    ): void {
        const id = request.params.id;
        response.json(this.carsService.getCarById(id));
    }
}
