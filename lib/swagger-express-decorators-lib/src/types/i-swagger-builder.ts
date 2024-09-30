import { IApiOperationArgsBaseResponse } from "./i-api-operation-args.base";
import { ISwaggerExternalDocs, ISwaggerInfo } from "./i-swagger";

export type ISwaggerBuildDefinitionModelPropertyType = {
    type?: string | ISwaggerBuildDefinitionModelPropertyType;
}

export type ISwaggerBuildDefinitionModelProperty = {
    /**
     * Define type of property. Example: SwaggerDefinitionConstant.Definition.Property.Type.STRING
     * Optional.
     */
    type?: string;

    /**
     * Define format of property. Example: SwaggerDefinitionConstant.Definition.Property.Format.INT_64
     * Optional.
     */
    format?: string;

    /**
     * Define if property is required.
     * Optional. Default is false.
     */
    required?: boolean;

    /**
     * Define model.
     * Optional.
     */
    model?: string;

    /**
     * Define enum;
     * Optional.
     */
    enum?: string[];

    /**
     * Define description.
     * Optional.
     */
    description?: string;

    /**
     * Define type of item. Example: SwaggerDefinitionConstant.Definition.Property.Type.STRING
     * Optional.
     */
    itemType?: string;

    /**
     * Define example.
     */
    example?: any[];
}

export type ISwaggerBuildDefinitionModel = {
    /**
     * Define description.
     */
    description?: string;

    /**
     * Define all properties of model.
     */
    properties: { [key: string]: ISwaggerBuildDefinitionModelProperty };
}

export type ISwaggerSecurityDefinition = {
    /**
     * Define type of security.
     */
    type: string;

    /**
     * Define where security set.
     * Optional.
     */
    in?: string;

    /**
     * Define name of security.
     * Optional.
     */
    name?: string;
}

export type ISwaggerBuildDefinition = {
    /**
     * Base URL for all API.
     * Optional. Default is "/".
     */
    basePath?: string;

    /**
     * Version Open API
     * Optional.
     */
    openapi?: string;

    /**
     * Metadata.
     */
    info: ISwaggerInfo;

    /**
     * Define the MIME types supported by the API for consumes. The root-level definition can be overridden in individual operations.
     * Optional. Default is SwaggerDefinition.Consume.JSON = "application/json".
     */
    consumes?: string[];

    /**
     * Define the MIME types supported by the API for produces. The root-level definition can be overridden in individual operations.
     * Optional. Default is SwaggerDefinition.Produce.JSON = "application/json".
     */
    produces?: string[];

    /**
     * Define schemes.
     * Optional. Default is SwaggerDefinition.Scheme.HTTP = "http".
     */
    schemes?: string[];

    /**
     * Define host.
     * Optional.
     */
    host?: string;

    /**
     * Define All Definitions.
     * Optional.
     */
    models?: { [key: string]: ISwaggerBuildDefinitionModel };

    /**
     * Define external doc
     * Optional.
     */
    externalDocs?: ISwaggerExternalDocs;

    /**
     * Define security definitions list.
     * Optional.
     */
    securityDefinitions?: { [key: string]: ISwaggerSecurityDefinition };

    /**
     * Define global responses.
     * Optional.
     */
    responses?: { [key: string]: IApiOperationArgsBaseResponse };
}