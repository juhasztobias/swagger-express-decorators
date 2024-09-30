import { IApiOperationArgsBaseResponse, IController, ISwagger, ISwaggerOperation } from "../../types";
import { capitalize } from "../../utils/capitalize.string";
import { buildOperationSecurity } from "./operation-security.build";

export const buildSwaggerOperation = (
    data: ISwagger,
    globalResponses: { [key: string]: IApiOperationArgsBaseResponse },
    operation: ISwaggerOperation,
    controller: IController
): ISwaggerOperation => {
    operation.produces ??= data.produces;
    operation.consumes ??= data.consumes;
    operation.security ??= controller.security ? buildOperationSecurity(controller.security) : undefined;
    operation.deprecated ??= controller.deprecated;

    if (globalResponses) {
        operation.responses = {...globalResponses, ...operation.responses};
    }

    const controllerName = capitalize(controller.name);
    if (operation.tags && operation.tags.length > 0) {
        operation.tags.unshift(controllerName);
    } else {
        operation.tags = [controllerName];
    }
    return operation;
}