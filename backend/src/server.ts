import 'reflect-metadata';
import Container from 'typedi';
import * as path from 'path';
import { getMetadataArgsStorage, useContainer, useExpressServer, RoutingControllersOptions } from 'routing-controllers';
import { routingControllersToSpec } from 'routing-controllers-openapi';
import * as swaggerUiExpress from 'swagger-ui-express';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';

import Express from 'express';
import morgan from 'morgan';

import * as controllers from './controllers';

import { Config } from './config';
import { CommonUtils } from './utils/common.utils';

const init = () => {
    const app: Express.Application = Express();
    useContainer(Container);
    const options: RoutingControllersOptions = {
        controllers: CommonUtils.getObjectValues(controllers),
        defaultErrorHandler: false,
        routePrefix: '/api',
    };
    useExpressServer(app, options);

    const client = path.join(__dirname, '../../', Config.CLIENT_PATH);
    app.use(Express.static(client));

    const schemas = validationMetadatasToSchemas({
        refPointerPrefix: '#/components/schemas/',
    });

    // Parse routing-controllers classes into OpenAPI spec:
    const storage = getMetadataArgsStorage();
    const spec = routingControllersToSpec(storage, options, {
        components: {
            schemas,
            securitySchemes: {
                basicAuth: {
                    scheme: 'basic',
                    type: 'http',
                },
            },
        },
        info: {
            description: 'Github search APIs',
            title: 'Github search APIs',
            version: '1.0.0',
        },
    });
    app.use('/docs', swaggerUiExpress.serve, swaggerUiExpress.setup(spec));

    if (!Config.REDIS_HOST || !Config.REDIS_PORT || !Config.REDIS_CACHE_TTL) {
        throw new Error(`Redis host, port and cache ttl are mandatory to start the server`);
    }
    app.use(morgan('combined'));
  

    return app;
};

const app = init();

export { app }
