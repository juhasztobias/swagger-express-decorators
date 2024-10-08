import * as express from 'express';
import { inject, injectable } from 'inversify';
import {
    controller,
    httpGet,
    httpPost,
    interfaces
} from 'inversify-express-utils';
import 'reflect-metadata';
import {
    ApiOperationGet,
    ApiOperationPost,
    ApiPath,
    SwaggerDefinitionConstant
} from 'swagger-express-decorators';
import { CarModel } from './car.model';
import { CarsService } from './cars.service';

@ApiPath({
    path: '/cars',
    name: 'Cars',
    security: { apiKeyHeader: [] },
})
@controller('/cars')
@injectable()
export class CarsController implements interfaces.Controller {
    constructor(@inject(CarsService.name) private carsService: CarsService) { }

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
    @httpGet('/')
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
    @httpPost('/')
    public postCar(
        request: express.Request,
        response: express.Response,
        next: express.NextFunction
    ): void {
        if (!request.body) {
            return response.status(400).end();
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
