import { capitalize } from "../utils/capitalize.string";

export const buildRef = (definition: string): string => '#/definitions/'.concat(capitalize(definition));