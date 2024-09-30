
export const buildOperationSecurity = (argsSecurity: {
    [key: string]: any[];
}): { [key: string]: any[] }[] => {
    const securityToReturn: any[] = [];
    for (const securityIndex in argsSecurity) {
        const security: any[] = argsSecurity[securityIndex];
        const result: { [key: string]: any[] } = {};
        result[securityIndex] = security;
        securityToReturn.push(result);
    }
    return securityToReturn;
}