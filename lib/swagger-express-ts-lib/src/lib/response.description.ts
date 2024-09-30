const ResponseDescription = {
    "200": 'Success',
    "201": 'Created',
    "202": 'Accepted',
    "203": 'Non-Authoritative Information',
    "204": 'No Content',
    "205": 'Reset Content',
    "206": 'Partial Content',
    "400": 'Client error and Bad Request',
    "401": 'Client error and Unauthorized',
    "404": 'Client error and Not Found',
    "406": 'Client error and Not Acceptable',
    "500": 'Internal Server Error',
    "501": 'Not Implemented',
    "503": 'Service Unavailable',
}
type ResponseDescriptionType = keyof typeof ResponseDescription;
const isResponseDescription = (value: any): value is ResponseDescriptionType => Object.values(ResponseDescription).includes(value);
export const getResponseDescription = (responseIndex: string): string | undefined => isResponseDescription(parseInt(responseIndex)) ? ResponseDescription[parseInt(responseIndex)] : undefined;