import * as assert from 'assert';
import { SwaggerService } from './swagger.service';
import { ISwaggerBuildDefinition } from './types';

export function build(buildDefinition: ISwaggerBuildDefinition): void {
    assert.ok(buildDefinition, 'Definition are required.');
    assert.ok(
        buildDefinition.info,
        'Informations are required. Base is { title: "Title of my API", version: "1.0.0"}'
    );

    SwaggerService.getInstance().setData(buildDefinition);
    if (buildDefinition.securityDefinitions) {
        SwaggerService.getInstance().addSecurityDefinitions(
            buildDefinition.securityDefinitions
        );
    }
    if (buildDefinition.models) {
        SwaggerService.getInstance().setDefinitions(buildDefinition.models);
    }
    if (buildDefinition.responses) {
        SwaggerService.getInstance().setGlobalResponses(
            buildDefinition.responses
        );
    }
    SwaggerService.getInstance().buildSwagger();
}
