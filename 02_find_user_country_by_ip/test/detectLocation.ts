import {describe, it} from "node:test";
import assert from "node:assert";
import {findCountryByIp} from "../src/services/detectLocation";

const testRecords: Record<string, string> = {
    //CL: '45.232.208.143',
    AM: '185.182.120.34',
    MX: '45.177.176.23',
    TR: '5.44.80.51',
    NO: '91.149.48.22',
    //ES: '83.229.33.3',
    CY: '203.24.108.65',
    GB: '23.43.23.15',
    IE: '89.28.176.5',
    RO: '77.83.248.211',

    UA: '185.39.28.40',
    US: '54.86.50.139',
    IT: '101.63.200.159',
    FR: '143.126.159.200'
};

describe('findCountryById', () => {
    for (const countryCode in testRecords) {
        it(`For ${countryCode}`, () => {
            const ip: string = testRecords[countryCode];
            assert.strictEqual(findCountryByIp(ip).countryCode, countryCode);
        });
    }
});
