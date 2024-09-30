# swaggerJSON

SwaggerJSON is a function that can be used to generate the swagger JSON object and then returned to the client. It's completely framework agnostic, so you can use it with any framework. Let's see some quick examples.

## Example with express

```js
import { swaggerJSON } from 'swagger-express-decorators';
import swaggerUi from 'swagger-ui-express';
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api-docs/swagger.json', (req, res) => {
  const swaggerJSON = swaggerJSON({
    info: {
      title: 'My API',
      version: '1.0.0',
    },
  });
  res.json(swaggerJSON);
});

app.use('/api-docs/swagger', swaggerUi.serve, swaggerUi.setup(
 null,
 null,
 null,
 null,
 null,
 '/api-docs/swagger.json'
));
```

## Example with koa

```js
import { swaggerJSON } from 'swagger-express-decorators';
import swaggerUi from 'swagger-ui-koa';
import Koa from 'koa';
import cors from '@koa/cors';

const app = new Koa();
app.use(cors());
app.use((ctx, next) => {
  ctx.body = swaggerJSON({
    info: {
      title: 'My API',
      version: '1.0.0',
    },
  });
});

app.use(swaggerUi.serve);
app.use(swaggerUi.setup(
 null,
 null,
 null,
 null,
 null,
 '/api-docs/swagger.json'
));
```

## Example with hono

```js
import { swaggerJSON } from 'swagger-express-decorators';
import { Hono } from 'hono'
import { swaggerUI } from '@hono/swagger-ui'

const app = new Hono();

app.get('/api-docs/swagger.json', (c) => {
  const swaggerJSON = swaggerJSON({
    info: {
      title: 'My API',
      version: '1.0.0',
    },
  });
  c.json(swaggerJSON);
});
app.get('/ui', swaggerUI({ url: '/doc', configUrl: '/api-docs/swagger.json' }));
```

## Conclusion

As seen in the examples above, swagger-express-decorators can be used with any framework. The only requirement is that you have to return the swagger JSON object to the client so you can use it within the swagger UI.

If you have any contributions or suggestions on the examples, please feel free to open an issue or a pull request.