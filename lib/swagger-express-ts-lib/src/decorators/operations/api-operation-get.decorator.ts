import { IApiOperationArgsBase } from '../../i-api-operation-args.base';
import { ApiOperation } from './api-operation.decorator';
export interface IApiOperationGetArgs extends IApiOperationArgsBase { }

export function ApiOperationGet(args: IApiOperationGetArgs): MethodDecorator {
    return ApiOperation({
        operation: 'get',
        ...args
    });
}
