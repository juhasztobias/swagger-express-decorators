import { IApiOperationArgsBase } from '../../interfaces';
import { ApiOperation } from './api-operation.decorator';
export interface IApiOperationPutArgs extends IApiOperationArgsBase { }

export function ApiOperationPut(args: IApiOperationPutArgs): MethodDecorator {
    return ApiOperation({
        operation: 'put',
        ...args
    });
}
