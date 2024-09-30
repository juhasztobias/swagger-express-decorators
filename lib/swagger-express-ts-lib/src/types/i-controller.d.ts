import { IPath } from "./i-path";

export type IController = {
    path?: string;
    paths?: { [key: string]: IPath };
    name?: string;
    description?: string;
    security?: { [key: string]: any[] };
    deprecated?: boolean;
}