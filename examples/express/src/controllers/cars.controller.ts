import * as express from 'express';
import 'reflect-metadata';
import {
    ApiOperationGet,
    ApiOperationPost,
    ApiPath,
    SwaggerDefinitionConstant
} from 'swagger-express-decorators';
import { CarModel } from '../models/car.model';
import { CarsService } from '../services/cars.service';

@ApiPath({
    path: '/cars',
    name: 'Cars',
    security: { apiKeyHeader: [] },
})
export class CarsController {
    [x: string]: any;
    constructor(private carsService: CarsService) { }

    @ApiOperationGet({
        description: 'Get cars objects list',
        summary: 'Get cars list',
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
    public getCars(
        request: express.Request,
        response: express.Response,
        next: express.NextFunction
    ): void {
        response.json(this.carsService.getCars());
    }

    @ApiOperationPost({
        description: 'Post car object',
        summary: 'Post new car',
        parameters: {
            body: {
                description: 'New car',
                required: true,
                model: 'Car',
            },
        },
        responses: {
            200: {
                model: 'Car',
            },
            400: { description: 'Parameters fail' },
        },
    })
    public postCar(
        request: express.Request,
        response: express.Response,
        next: express.NextFunction
    ): void {
        if (!request.body) {
            response.status(400).end();
            return;
        }
        const newCar = new CarModel();
        newCar.id = request.body.id;
        newCar.name = request.body.name;
        newCar.description = request.body.description;
        newCar.author = request.body.author;
        this.carsService.addCar(request.body);
        response.json(request.body);
    }
}
