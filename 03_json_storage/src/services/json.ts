import * as fs from 'fs';
import * as path from 'path';
import {Json} from "../models/json.types";

export class JsonData {
    private dataDirectory: string = path.join(__dirname, '../..', 'json_data');

    constructor() {
        if (!fs.existsSync(this.dataDirectory)) {
            fs.mkdirSync(this.dataDirectory);
        }
    }

    storeData(jsonPath: string, data: Json) {
        if (!jsonPath) throw new Error('jsonPath is required');

        const filePath = path.join(this.dataDirectory, `${jsonPath}.json`);
        fs.writeFileSync(filePath, JSON.stringify(data));
    }

    getData(jsonPath: string): Json {
        const filePath = path.join(this.dataDirectory, `${jsonPath}.json`);
        if (fs.existsSync(filePath)) {
            const rawData = fs.readFileSync(filePath, 'utf8');
            return JSON.parse(rawData);
        }

        const data = {};
        this.storeData(jsonPath, data);
        return data;
    }
}
