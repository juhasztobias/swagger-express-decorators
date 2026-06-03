import { ISwaggerOperation } from "./i-swagger";

export type IPath = {
    path: string;
    get?: ISwaggerOperation;
    post?: ISwaggerOperation;
    put?: ISwaggerOperation;
    patch?: ISwaggerOperation;
    delete?: ISwaggerOperation;
}
export type ValidIPathMethods = 'get' | 'post' | 'put' | 'patch' | 'delete';
// export enum ValidIPathMethods {
//     get = 'get',
//     post = 'post',
//     put = 'put',
//     patch = 'patch',
//     delete = 'delete',
// }