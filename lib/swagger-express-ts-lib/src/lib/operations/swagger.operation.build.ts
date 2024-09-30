import _, { capitalize } from "lodash";
import { IApiOperationArgsBaseResponse, IController, ISwagger, ISwaggerOperation } from "../../types";
import { buildOperationSecurity } from "./operation-security.build";

export const buildSwaggerOperation = (
    data: ISwagger,
    globalResponses: { [key: string]: IApiOperationArgsBaseResponse },
    operation: ISwaggerOperation,
    controller: IController
): ISwaggerOperation => {
    if (_.isUndefined(operation.produces)) {
        operation.produces = data.produces;
    }
    if (_.isUndefined(operation.consumes)) {
        operation.consumes = data.consumes;
    }
    if (_.isUndefined(operation.security) && controller.security) {
        operation.security = buildOperationSecurity(controller.security);
    }
    if (_.isUndefined(operation.deprecated) && controller.deprecated) {
        operation.deprecated = controller.deprecated;
    }
    if (globalResponses) {
        operation.responses = _.mergeWith(
            _.cloneDeep(globalResponses),
            operation.responses
        );
    }

    const controllerName = capitalize(controller.name);
    if (operation.tags && operation.tags.length > 0) {
        operation.tags.unshift(controllerName);
    } else {
        operation.tags = [controllerName];
    }
    return operation;
}