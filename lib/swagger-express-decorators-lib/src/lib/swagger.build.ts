import { IApiOperationArgsBaseResponse, IController, IPath, ISwagger, ISwaggerPath, ISwaggerTag, ValidIPathMethods } from "../types";
import { capitalize } from "../utils/capitalize.string";
import { buildSwaggerOperation } from "./operations/swagger.operation.build";

type GlobalResponseType = { [key: string]: IApiOperationArgsBaseResponse };
type ControllerMapType = { [key: string]: IController };

export const buildSwagger = (
    data: ISwagger,
    controllerMap: ControllerMapType,
    globalResponses: GlobalResponseType
): {
    data: ISwagger;
    controllerMap: ControllerMapType;
    globalResponses: GlobalResponseType;
} => {
    for (const controllerIndex in controllerMap) {
        const controller: IController = controllerMap[controllerIndex];
        const controllerPath = controller.path ?? '/';
        const controllerArr = controller.paths ? Object.values(controller.paths) : [];

        const controllerName = capitalize(controller.name);
        if (!data.tags?.find((tag: ISwaggerTag) => tag.name === controllerName)) {
            data.tags ??= [];
            data.tags.push({
                name: controllerName,
                description: controller.description,
            } as ISwaggerTag);
        }

        if (!Boolean(controllerArr?.length)) {
            const swaggerPath: ISwaggerPath = {};
            data.paths ??= {};
            data.paths[controllerPath] = swaggerPath;
            continue;
        }

        for (const pathIndex in controller.paths) {
            const path: IPath = controller.paths[pathIndex];
            const swaggerPath: ISwaggerPath = {};

            const addMethodToPath = (method: ValidIPathMethods, path: IPath) =>
                !path[method] ? undefined : buildSwaggerOperation(data, globalResponses, path[method], controllerMap);

            swaggerPath.get = addMethodToPath('get', path);
            swaggerPath.post = addMethodToPath('post', path);
            swaggerPath.put = addMethodToPath('put', path);
            swaggerPath.patch = addMethodToPath('patch', path);
            swaggerPath.delete = addMethodToPath('delete', path);

            data.paths = { ...data.paths };
            const concatedPath = Boolean(path.path?.length) ? controllerPath.concat(path.path) : controllerPath;
            data.paths[concatedPath] = { ...(data.paths[concatedPath] ?? []), ...swaggerPath };
        }
    }

    return {
        data,
        controllerMap,
        globalResponses
    };
}