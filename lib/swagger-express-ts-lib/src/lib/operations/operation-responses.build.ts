import { IApiOperationArgsBaseResponse } from "../../i-api-operation-args.base";
import { ISwaggerOperationResponse } from "../../i-swagger";
import { getResponseDescription } from "../response.description";
import { buildSchema } from "../schema.build";

type ISwaggerOperationResponses = {
    [key: string]: ISwaggerOperationResponse;
}

export const buildOperationResponses = (responses: {
    [key: string]: IApiOperationArgsBaseResponse;
}): ISwaggerOperationResponses =>
    Object.entries(responses)
        .reduce((swaggerOperationResponses, [responseIndex, response]) => {
            swaggerOperationResponses[responseIndex] = buildSwaggerOperationResponse([responseIndex, response]);
            return swaggerOperationResponses;
        }, {});

const buildSwaggerOperationResponse = ([responseIndex, response]: [string, IApiOperationArgsBaseResponse]): ISwaggerOperationResponse => {
    return {
        description: response.description ?? getResponseDescription(responseIndex),
        schema: buildSchema(response.type, response.model),
    };
}