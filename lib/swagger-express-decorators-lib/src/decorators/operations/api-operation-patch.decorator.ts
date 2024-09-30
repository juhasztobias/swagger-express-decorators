import { IApiOperationArgsBase } from '../../types';
import { ApiOperation } from './api-operation.decorator';
export interface IApiOperationPatchArgs extends IApiOperationArgsBase { }

export function ApiOperationPatch(
    args: IApiOperationPatchArgs
): MethodDecorator {
    return ApiOperation({
        operation: 'patch',
        ...args
    });
}
