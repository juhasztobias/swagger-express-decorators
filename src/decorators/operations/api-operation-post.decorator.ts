import { IApiOperationArgsBase } from '../../interfaces';
import { ApiOperation } from './api-operation.decorator';
export interface IApiOperationPostArgs extends IApiOperationArgsBase { }

export function ApiOperationPost(args: IApiOperationPostArgs): MethodDecorator {
    return ApiOperation({
        operation: 'post',
        ...args
    });
}
