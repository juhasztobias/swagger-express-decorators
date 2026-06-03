export const isNotEmptyObject = (obj: any): boolean => {
    return Boolean(obj) && Boolean(Object.keys(obj)?.length);
}