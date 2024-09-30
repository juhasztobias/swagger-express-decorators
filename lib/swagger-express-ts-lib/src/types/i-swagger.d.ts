import { ISwaggerSecurityDefinition } from '../swagger.builder';
export type ISwaggerLicense = {
    name: string;
    url?: string;
}

export type ISwaggerContact = {
    name?: string;
    url?: string;
    email?: string;
}

export type ISwaggerInfo = {
    title: string;
    description?: string;
    termsOfService?: string;
    contact?: ISwaggerContact;
    license?: ISwaggerLicense;
    version: string;
}

export type ISwaggerVariableServer = {
    enum?: [string];
    default: string;
    description?: string;
}

export type ISwaggerServer = {
    url: string;
    description?: string;
    variables: [ISwaggerVariableServer]; // TODO : Fix it
}

export type ISwaggerExternalDocs = {
    description?: string;
    url: string;
}

export type ISwaggerOperationParameter = {
    name: string;
    in: string;
    type?: string;
    items?: {
        type?: string;
    };
    format?: string;
    description?: string;
    required?: boolean;
    minimum?: number;
    maximum?: number;
    default?: number;
    deprecated?: boolean;
    allowEmptyValue?: boolean;
    schema?: ISwaggerOperationSchema;
}

export type ISwaggerPropertySchemaOperation = {
    type: string;
}

export type ISwaggerOperationSchema = {
    type?: string;
    items?: { $ref: string };
    $ref?: string;
    format?: string;
    required?: string[]; // Array content name of property
    properties?: { [key: string]: ISwaggerPropertySchemaOperation }
}

export type ISwaggerOperationSchemaItems = {
    $ref: string;
}

export type ISwaggerOperationResponse = {
    description?: string;
    schema?: ISwaggerOperationSchema;
}

export type ISwaggerOperation = {
    tags?: string[];
    summary?: string;
    description?: string;
    operationId: string | symbol;
    parameters?: ISwaggerOperationParameter[];
    produces?: string[];
    consumes?: string[];
    responses?: { [key: string]: ISwaggerOperationResponse };
    security?: { [key: string]: any[] }[];
    deprecated?: boolean;
}

export type ISwaggerTag = {
    name: string;
    description: string;
}

export type ISwaggerPath = {
    get?: ISwaggerOperation;
    post?: ISwaggerOperation;
    put?: ISwaggerOperation;
    patch?: ISwaggerOperation;
    delete?: ISwaggerOperation;
}

export type ISwaggerDefinitionPropertyItems = {
    $ref?: string;
    type?: string;
}

export type ISwaggerDefinitionProperty = {
    type?: string; // Example : SwaggerDefinition.Definition.Property.Type.INTEGER
    format?: string; // Example : SwaggerDefinition.Definition.Property.Format.INT_64
    required?: boolean;
    description?: string;
    enum?: string[];
    items?: ISwaggerDefinitionPropertyItems;
    $ref?: string;
    example?: any[]
}

export type ISwaggerDefinitionXML = {
    name: string;
}

export type ISwaggerDefinition = {
    type: string; // Example : SwaggerDefinition.Definition.Type.OBJECT
    required?: string[];
    properties: { [key: string]: ISwaggerDefinitionProperty };
    xml?: ISwaggerDefinitionXML;
    description?: string;
}

export type ISwagger = {
    basePath?: string;
    openapi?: string;
    info: ISwaggerInfo;
    servers?: [ISwaggerServer];
    paths?: { [key: string]: ISwaggerPath };
    host?: string;
    swagger: string;
    tags?: ISwaggerTag[];
    schemes: string[]; // Example : SwaggerDefinition.Scheme.HTTP
    produces: string[]; // Example : SwaggerDefinition.Produce.JSON
    consumes: string[]; // Example : SwaggerDefinition.Consume.JSON
    definitions: { [key: string]: ISwaggerDefinition };
    externalDocs?: ISwaggerExternalDocs;
    securityDefinitions?: { [key: string]: ISwaggerSecurityDefinition };
}
