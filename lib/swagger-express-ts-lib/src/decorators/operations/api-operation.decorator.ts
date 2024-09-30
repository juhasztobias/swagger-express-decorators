import { IApiOperationArgsBase } from "../../i-api-operation-args.base";
import { SwaggerService } from "../../swagger.service";
type IApiOperationArgs = IApiOperationArgsBase & {
    operation: string;
}

export function ApiOperation(
    args: IApiOperationArgs,
): MethodDecorator {
    return (
        target: any,
        propertyKey: string | symbol,
        descriptor: PropertyDescriptor
    ) => {
        const operation: string = args.operation;
        const baseArgs: IApiOperationArgsBase & { operation?: string } = args;
        delete baseArgs.operation;

        SwaggerService.getInstance().addOperation(
            operation,
            baseArgs,
            target,
            propertyKey
        );
    };
}

// FOR REFERENCE ONLY
// public addOperationGet(
//     args: IApiOperationGetArgs,
//     target: any,
//     propertyKey: string | symbol
// ): void {
//     assert.ok(args, 'Args are required.');
//     assert.ok(args.responses, 'Responses are required.');
//     if (args.parameters) {
//         assert.ok(!args.parameters.body, 'Parameter body is not required.');
//     }
//     this.addOperation('get', args, target, propertyKey);
// }

// public addOperationPost(
//     args: IApiOperationPostArgs,
//     target: any,
//     propertyKey: string | symbol
// ): void {
//     assert.ok(args, 'Args are required.');
//     assert.ok(args.parameters, 'Parameters are required.');
//     assert.ok(args.responses, 'Responses are required.');
//     this.addOperation('post', args, target, propertyKey);
// }

// public addOperationPut(
//     args: IApiOperationPostArgs,
//     target: any,
//     propertyKey: string | symbol
// ): void {
//     assert.ok(args, 'Args are required.');
//     assert.ok(args.parameters, 'Parameters are required.');
//     assert.ok(args.responses, 'Responses are required.');
//     this.addOperation('put', args, target, propertyKey);
// }

// public addOperationPatch(
//     args: IApiOperationPostArgs,
//     target: any,
//     propertyKey: string | symbol
// ): void {
//     assert.ok(args, 'Args are required.');
//     assert.ok(args.parameters, 'Parameters are required.');
//     assert.ok(args.responses, 'Responses are required.');
//     this.addOperation('patch', args, target, propertyKey);
// }

// public addOperationDelete(
//     args: IApiOperationPostArgs,
//     target: any,
//     propertyKey: string | symbol
// ): void {
//     assert.ok(args, 'Args are required.');
//     assert.ok(args.parameters, 'Parameters are required.');
//     assert.ok(!args.parameters.body, 'Parameter body is not required.');
//     assert.ok(args.responses, 'Responses are required.');
//     this.addOperation('delete', args, target, propertyKey);
// }