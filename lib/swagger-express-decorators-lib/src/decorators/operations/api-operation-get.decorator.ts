import { IApiOperationArgsBase } from '../../types';
import { ApiOperation } from './api-operation.decorator';
export interface IApiOperationGetArgs extends IApiOperationArgsBase { }

export function ApiOperationGet(args: IApiOperationGetArgs): MethodDecorator {
    return ApiOperation({
        operation: 'get',
        ...args
    });
}
