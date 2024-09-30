import { IApiOperationArgsBase } from '../../i-api-operation-args.base';
import { ApiOperation } from './api-operation.decorator';
export interface IApiOperationDeleteArgs extends IApiOperationArgsBase { }

export function ApiOperationDelete(
    args: IApiOperationDeleteArgs
): MethodDecorator {
    return ApiOperation({
        operation: 'delete',
        ...args
    });
}