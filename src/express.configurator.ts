// TODO: Remove express from dependencies and make it work for any framework (e.g. express, koa, fastify, etc.)
import * as assert from 'assert';
import { Router } from 'express';
import { ISwaggerBuildDefinition } from './interfaces';
import { ISwagger } from './interfaces/i-swagger';
import { build } from './swagger.builder';
import { SwaggerService } from './swagger.service';

export interface ISwaggerExpressOptions {
    /**
     * Path of resource.
     * Default is "/api-docs/swagger.json".
     */
    path?: string;

    /**
     * Swagger Definition.
     */
    definition: ISwaggerBuildDefinition;
}

/**
 * Creates a swagger JSON object and returns it to the client.
 * This function is also quite useful even if you are not using express, 
 * as it can be used to generate the swagger JSON object and then returned to the client. See example below with express.
 * 
 * @param definition - Swagger definition object, see {@link ISwaggerBuildDefinition}
 * @param callback - Callback function that will be called with the generated swagger JSON object, 
 * useful for those cases where you need to modify the swagger JSON object before returning it to the client.
 * @returns {ISwagger} - Swagger JSON object that can be returned to the client, see {@link ISwagger}
 * 
 * @example
 * ```js
 * import { swaggerJSON } from 'swagger-express-decorators';
 * import swaggerUi from 'swagger-ui-express';
 * import express from 'express';
 * import cors from 'cors';
 * 
 * const app = express();
 * app.use(cors());
 * app.use(express.json());
 * 
 * app.get('/api-docs/swagger.json', async (req, res) => {
 *   const swaggerJSON = await swaggerJSON({
 *     info: {
 *       title: 'My API',
 *       version: '1.0.0',
 *     },
 *   });
 *   res.json(swaggerJSON);
 * });
 * 
 * app.use('/api-docs/swagger', swaggerUi.serve, swaggerUi.setup(
 *  null,
 *  null,
 *  null,
 *  null,
 *  null,
 *  '/api-docs/swagger.json'
 * ));
 */
export const swaggerJSON = (
    definition: ISwaggerBuildDefinition,
    callback?: (swaggerJSON: ISwagger) => void
): ISwagger => {
    assert.ok(definition, 'Definition is required.');

    build(definition);
    const data = SwaggerService.getInstance().getData();

    callback?.(data);
    return data;
}

export function express(options?: ISwaggerExpressOptions): Router {
    let path: string = '/api-docs/swagger.json';
    const router: Router = Router();

    options && router.get(path, (_req, res, _next) => {
        const json = swaggerJSON(options.definition);
        res.json(json);
    })

    return router;
}