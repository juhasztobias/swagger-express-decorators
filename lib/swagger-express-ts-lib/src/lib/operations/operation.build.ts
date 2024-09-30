import _ from "lodash";
import { SwaggerDefinitionConstant } from "../..";
import { IApiOperationArgsBase } from "../../i-api-operation-args.base";
import { ISwaggerOperation } from "../../i-swagger";
import { buildBodyOperationParameter } from "../parameters/body.parameter.build";
import { buildParameters } from "../parameters/parameters.build";
import { buildOperationResponses } from "./operation-responses.build";
import { buildOperationSecurity } from "./operation-security.build";

export const buildOperation = (
    args: IApiOperationArgsBase,
    target: any,
    propertyKey: string | symbol
): ISwaggerOperation => {

    const argsCopy = _.cloneDeep(args) as
        Omit<IApiOperationArgsBase,
            | 'responses'
            | 'security'
            | 'parameters'
            | 'tags'
            | 'produces'
            | 'consumes'
        >;

    const operation: ISwaggerOperation = {
        operationId: propertyKey,
        ...argsCopy,
    };

    Boolean(args.produces?.length) && (operation.produces = args.produces);
    Boolean(args.consumes?.length) && (operation.consumes = args.consumes);
    Boolean(args.tags?.length) && (operation.tags = args.tags);
    Boolean(args.responses?.length) && (operation.responses = buildOperationResponses(args.responses));
    Boolean(args.security?.length) && (operation.security = buildOperationSecurity(args.security!));

    if (args.parameters) {
        operation.parameters = [
            ...buildParameters(SwaggerDefinitionConstant.Parameter.In.HEADER, args.parameters.header),
            ...buildParameters(SwaggerDefinitionConstant.Parameter.In.PATH, args.parameters.path),
            ...buildParameters(SwaggerDefinitionConstant.Parameter.In.QUERY, args.parameters.query),
            ...buildParameters(SwaggerDefinitionConstant.Parameter.In.FORM_DATA, args.parameters.formData),
            ...buildBodyOperationParameter(args.parameters.body),
        ];
    }

    return operation;
}