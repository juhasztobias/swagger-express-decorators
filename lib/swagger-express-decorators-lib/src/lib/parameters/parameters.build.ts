import { IApiOperationArgsBaseParameter, ISwaggerOperationParameter } from "../../types";

type ParametersType = {
    [key: string]: IApiOperationArgsBaseParameter
}
export const buildParameters = (type: string, parameters?: ParametersType): ISwaggerOperationParameter[] => parameters ? Object.entries(parameters).map(buildSwaggerOperationParameter(type)) : [];
const buildSwaggerOperationParameter = (type: string) => ([key, value]: [string, IApiOperationArgsBaseParameter]): ISwaggerOperationParameter => {
    return {
        name: value.name ?? key,
        in: type,
        type: value.type,
        items: value.items,
        description: value.description,
        required: value.required,
        format: value.format,
        deprecated: value.deprecated,
        allowEmptyValue: value.allowEmptyValue,
        minimum: value.minimum,
        maximum: value.maximum,
        default: value.default,
    };
}