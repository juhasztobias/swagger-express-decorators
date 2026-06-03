import bodyParser = require('body-parser');
import * as express from 'express';
import * as swagger from 'swagger-express-decorators';
import { SwaggerDefinitionConstant } from 'swagger-express-decorators';

const app = express();

app.use('/api-docs/swagger', express.static('swagger'));
app.use(
    '/api-docs/swagger/assets',
    express.static('node_modules/swagger-ui-dist')
);
app.use(bodyParser.json());
app.use(
    swagger.express({
        definition: {
            info: {
                title: 'My api',
                version: '1.0',
            },
            models: {
                ApiError: {
                    properties: {
                        code: {
                            type:
                                SwaggerDefinitionConstant.Model.Property
                                    .Type.STRING,
                            example: ['400'],
                        },
                        message: {
                            type:
                                SwaggerDefinitionConstant.Model.Property
                                    .Type.STRING,
                            example: ['Name of car is required.'],
                        },
                    },
                },
            },
            responses: {
                500: {},
            },
            externalDocs: {
                url: 'My url',
            },
            securityDefinitions: {
                apiKeyHeader: {
                    type: SwaggerDefinitionConstant.Security.Type.API_KEY,
                    in: SwaggerDefinitionConstant.Security.In.HEADER,
                    name: 'apiHeader',
                },
            },
        },
    })
);

app.use((
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Logger interceptor
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

export default app;