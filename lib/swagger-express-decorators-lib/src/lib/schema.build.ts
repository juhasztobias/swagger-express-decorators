import { SwaggerDefinitionConstant } from "..";
import { ISwaggerOperationSchema, ISwaggerOperationSchemaItems } from "../types";
import { buildRef } from "./ref.build";

const buildObjectSchema = (model: string): ISwaggerOperationSchema => {
    return {
        $ref: buildRef(model)
    };
}

const buildArraySchema = (model: string): ISwaggerOperationSchema => {
    const simpleSchema = buildObjectSchema(model);
    return {
        items: {
            $ref: simpleSchema.$ref,
        } as ISwaggerOperationSchemaItems,
        type: SwaggerDefinitionConstant.Response.Type.ARRAY,
        ...simpleSchema
    };
}

export const buildSchema = (type?: string, model?: string): ISwaggerOperationSchema | undefined => {
    if (!model) return undefined;
    return type === SwaggerDefinitionConstant.Response.Type.ARRAY ? buildArraySchema(model) : buildObjectSchema(model);
};