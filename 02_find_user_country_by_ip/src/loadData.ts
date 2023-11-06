import fs from 'fs';

export type IPRange = {
    start: number;
    end: number;
    countryCode: string;
    countryName: string;
}

export const loadIPRanges = () => {
    const lines = fs.readFileSync('IP2LOCATION-LITE-DB1.CSV', 'utf8').split('\n');
    const ipRanges: IPRange[] = new Array(lines.length);
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].length > 0) {
            let parts = lines[i].split(',');
            ipRanges[i] = {
                start: Number(parts[0].trim().slice(1, -1)),
                end: Number(parts[1].trim().slice(1, -1)),
                countryCode: parts[2].trim().slice(1, -1),
                countryName: parts[3].trim().slice(1, -1)
            }
        }
    }
    return ipRanges;
}
