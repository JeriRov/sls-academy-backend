export type JsonDataValue = string | number | boolean | null | JsonDataValue[];
export type JsonObject = Record<string, JsonDataValue> | JsonDataValue[];
