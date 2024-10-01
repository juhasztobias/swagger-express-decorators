import { IApiBodyOperationArgsBaseParameter, ISwaggerOperationParameter, ISwaggerOperationSchema, ISwaggerPropertySchemaOperation } from "../../interfaces";
import { buildRef } from "../ref.build";

export const buildBodyOperationParameter = (
    bodyOperationArgsBaseParameter?: IApiBodyOperationArgsBaseParameter
): ISwaggerOperationParameter[] => {
    if (!bodyOperationArgsBaseParameter) return [];
    const swaggerOperationParameterList: ISwaggerOperationParameter[] = [];
    const swaggerOperationParameter = {} as ISwaggerOperationParameter;
    swaggerOperationParameter.name = bodyOperationArgsBaseParameter.name
        ? bodyOperationArgsBaseParameter.name
        : 'body';
    swaggerOperationParameter.in = 'body';
    swaggerOperationParameter.type = bodyOperationArgsBaseParameter.type;
    swaggerOperationParameter.description =
        bodyOperationArgsBaseParameter.description;
    swaggerOperationParameter.required =
        bodyOperationArgsBaseParameter.required;
    swaggerOperationParameter.format =
        bodyOperationArgsBaseParameter.format;
    swaggerOperationParameter.deprecated =
        bodyOperationArgsBaseParameter.deprecated;
    swaggerOperationParameter.allowEmptyValue =
        bodyOperationArgsBaseParameter.allowEmptyValue;
    swaggerOperationParameter.minimum =
        bodyOperationArgsBaseParameter.minimum;
    swaggerOperationParameter.maximum =
        bodyOperationArgsBaseParameter.maximum;
    swaggerOperationParameter.default =
        bodyOperationArgsBaseParameter.default;
    let schema = {} as ISwaggerOperationSchema;
    if (bodyOperationArgsBaseParameter.properties) {
        schema.type = 'object';
        schema.required = [];
        schema.properties = {} as {
            [key: string]: ISwaggerPropertySchemaOperation;
        };
        for (const propetyIndex in bodyOperationArgsBaseParameter.properties) {
            const propertyBodyOperationArgsBaseParameter =
                bodyOperationArgsBaseParameter.properties[propetyIndex];
            const propertySchemaOperation = {} as ISwaggerPropertySchemaOperation;
            propertySchemaOperation.type =
                propertyBodyOperationArgsBaseParameter.type;
            schema.properties[propetyIndex] = propertySchemaOperation;
            if (propertyBodyOperationArgsBaseParameter.required) {
                schema.required.push(propetyIndex);
            }
        }
    }
    if (bodyOperationArgsBaseParameter.model) {
        const swaggerOperationSchema: ISwaggerOperationSchema = {
            $ref: buildRef(bodyOperationArgsBaseParameter.model),
        };

        if (bodyOperationArgsBaseParameter.type !== 'array') {
            schema = swaggerOperationSchema;
        } else {
            schema.type = bodyOperationArgsBaseParameter.type;
            schema.items = {
                $ref: buildRef(bodyOperationArgsBaseParameter.model),
            };
        }
    }
    swaggerOperationParameter.schema = schema;
    swaggerOperationParameterList.push(swaggerOperationParameter);
    return swaggerOperationParameterList;
}
