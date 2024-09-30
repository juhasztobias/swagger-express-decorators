import _ from 'lodash';
import { IApiModelArgs } from '.';
import { IApiModelPropertyArgs } from './decorators/api-model-property.decorator';
import { IApiPathArgs } from './decorators/api-path.decorator';

import {
    IApiOperationArgsBase,
    IApiOperationArgsBaseResponse,
    IController,
    IPath,
    ISwagger,
    ISwaggerBuildDefinitionModel,
    ISwaggerBuildDefinitionModelProperty,
    ISwaggerDefinition,
    ISwaggerDefinitionProperty,
    ISwaggerDefinitionPropertyItems,
    ISwaggerInfo,
    ISwaggerSecurityDefinition
} from './types';

import { SwaggerDefinitionConstant } from './enums/swagger-definition.constant';
import { buildOperationResponses } from './lib/operations/operation-responses.build';
import { buildOperation } from './lib/operations/operation.build';
import { buildRef } from './lib/ref.build';
import { buildSwagger } from './lib/swagger.build';

export class SwaggerService {
    public static getInstance(): SwaggerService {
        if (!SwaggerService.instance) {
            const newSwaggerService: SwaggerService = new SwaggerService();
            newSwaggerService.initData();
            SwaggerService.instance = newSwaggerService;
        }
        return SwaggerService.instance;
    }

    private static instance: SwaggerService;
    private controllerMap: { [key: string]: IController } = {};
    private data: ISwagger;
    private modelsMap: { [key: string]: ISwaggerBuildDefinitionModel } = {};
    private globalResponses: { [key: string]: IApiOperationArgsBaseResponse };

    public resetData(): void {
        this.controllerMap = {};
        this.initData();
    }

    private initData(): void {
        this.data = {
            basePath: '/',
            info: {
                title: '',
                version: '',
            } as ISwaggerInfo,
            paths: {},
            tags: [],
            schemes: [SwaggerDefinitionConstant.Scheme.HTTP],
            produces: [SwaggerDefinitionConstant.Produce.JSON],
            consumes: [SwaggerDefinitionConstant.Consume.JSON],
            definitions: {},
            swagger: '2.0',
        };
    }

    public setData(data: Partial<ISwagger>): ISwagger {
        let initData = this.getData();
        this.data = {
            ...initData,
            ...data
        }
        return this.data;
    }

    public getData(): ISwagger {
        return _.cloneDeep(this.data);
    }

    public setDefinitions(models: {
        [key: string]: ISwaggerBuildDefinitionModel;
    }): void {
        const definitions: { [key: string]: ISwaggerDefinition } = {};
        for (const modelIndex in models) {
            const model: ISwaggerBuildDefinitionModel = models[modelIndex];
            const newDefinition: ISwaggerDefinition = {
                type: SwaggerDefinitionConstant.Model.Type.OBJECT,
                properties: {},
                required: [],
            };
            if (model.description) {
                newDefinition.description = model.description;
            }
            for (const propertyIndex in model.properties) {
                const property: ISwaggerBuildDefinitionModelProperty =
                    model.properties[propertyIndex];
                const newProperty: ISwaggerDefinitionProperty = {
                    type: property.type,
                };
                newProperty.format = property.format;
                newProperty.description = property.description;
                newProperty.enum = property.enum;
                newProperty.example = property.example;
                if (property.itemType) {
                    newProperty.items = {
                        type: property.itemType,
                    } as ISwaggerDefinitionPropertyItems;
                }
                if (property.model) {
                    if (
                        _.isEqual(
                            SwaggerDefinitionConstant.Model.Property.Type.ARRAY,
                            property.type
                        )
                    ) {
                        newProperty.items = {
                            $ref: buildRef(property.model),
                        } as ISwaggerDefinitionPropertyItems;
                    } else {
                        newProperty.$ref = buildRef(property.model);
                    }
                }
                if (property.required) {
                    if (!newDefinition.required) newDefinition.required = [];
                    newDefinition.required.push(propertyIndex);
                }
                newDefinition.properties[propertyIndex] = newProperty;
            }
            definitions[modelIndex] = newDefinition;
        }
        this.data.definitions = _.mergeWith(this.data.definitions, definitions);
    }

    public setGlobalResponses(globalResponses: {
        [key: string]: IApiOperationArgsBaseResponse;
    }): void {
        this.globalResponses = buildOperationResponses(globalResponses);
    }

    public addPath(args: IApiPathArgs, target: any): void {
        let currentController: IController = {
            path: args.path,
            name: args.name,
            paths: {},
        };
        for (const controllerIndex in this.controllerMap) {
            const controller: IController = this.controllerMap[controllerIndex];
            if (controllerIndex === target.name) {
                currentController = controller;
                currentController.path = args.path;
                currentController.name = args.name;
                currentController.description = args.description;
                currentController.security = args.security;
                currentController.deprecated = args.deprecated;
            }
        }
        this.controllerMap[target.name] = _.mergeWith(
            this.controllerMap[target.name],
            currentController
        );
    }

    public addSecurityDefinitions(securityDefinitions: {
        [key: string]: ISwaggerSecurityDefinition;
    }): void {
        this.data.securityDefinitions = securityDefinitions;
    }

    public buildSwagger(): void {
        this.data = buildSwagger(this.data, this.controllerMap, this.globalResponses);
    }

    public addApiModelProperty(
        args: IApiModelPropertyArgs,
        target: any,
        propertyKey: string | symbol,
        propertyType: string
    ) {
        const definitionKey = target.constructor.name;
        let swaggerBuildDefinitionModel: ISwaggerBuildDefinitionModel = this
            .modelsMap[definitionKey];
        if (!swaggerBuildDefinitionModel) {
            swaggerBuildDefinitionModel = {
                properties: {},
            };
            this.modelsMap[definitionKey] = swaggerBuildDefinitionModel;
        }

        const swaggerBuildDefinitionModelProperty: ISwaggerBuildDefinitionModelProperty = {
            type: _.lowerCase(propertyType),
        };
        if (args) {
            swaggerBuildDefinitionModelProperty.required = args.required;
            swaggerBuildDefinitionModelProperty.description = args.description;
            swaggerBuildDefinitionModelProperty.enum = args.enum;
            swaggerBuildDefinitionModelProperty.itemType = args.itemType;
            swaggerBuildDefinitionModelProperty.example = args.example;
            swaggerBuildDefinitionModelProperty.format = args.format;
            if (args.model) {
                swaggerBuildDefinitionModelProperty.model = args.model;
                if (!_.isEqual('Array', propertyType)) {
                    swaggerBuildDefinitionModelProperty.type = undefined;
                }
            }
            if (args.type) {
                swaggerBuildDefinitionModelProperty.type = args.type;
            }
        }
        swaggerBuildDefinitionModel.properties[
            propertyKey.toString()
        ] = swaggerBuildDefinitionModelProperty;
        this.setDefinitions(this.modelsMap);
    }

    public addApiModel(args: IApiModelArgs, target: any): any {
        const definitionKey = target.name;
        let swaggerBuildDefinitionModel: ISwaggerBuildDefinitionModel = this
            .modelsMap[definitionKey];
        if (!swaggerBuildDefinitionModel) {
            swaggerBuildDefinitionModel = {
                properties: {},
            };
            this.modelsMap[definitionKey] = swaggerBuildDefinitionModel;
        }
        if (args) {
            swaggerBuildDefinitionModel.description = args.description;
            if (args.name) {
                const name: string = _.upperFirst(args.name);
                this.modelsMap[name] = _.cloneDeep(
                    this.modelsMap[definitionKey]
                );
                if (!_.isEqual(name, definitionKey)) {
                    delete this.modelsMap[definitionKey];
                    delete this.data.definitions[definitionKey];
                }
            }
        }
        this.setDefinitions(this.modelsMap);
    }

    public addOperation(
        operation: string,
        args: IApiOperationArgsBase,
        target: any,
        propertyKey: string | symbol
    ): void {
        const currentPathname = Boolean(args.path?.length) ? args.path! : '/';
        const controller = Object.keys(this.controllerMap).find((controllerIndex) => controllerIndex === target.constructor.name);
        let currentController: IController = controller ? this.controllerMap[controller] : {};

        if (!currentController.paths) currentController.paths = {};
        if (!currentController.paths[currentPathname]) currentController.paths[currentPathname] = {} as IPath;

        let currentPath = currentController.paths[currentPathname];
        currentPath.path = currentPath.path;
        currentPath[operation] = buildOperation(args, target, propertyKey);

        this.controllerMap[target.constructor.name] = currentController;
    }
}
