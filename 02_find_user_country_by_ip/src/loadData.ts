import fs from 'fs';

export type IPRange = {
    start: number;
    end: number;
    countryCode: string;
    countryName: string;
}

const formatRange = (ipPart: string, leftBorder: number = 1, rightBorder: number = -1) => ipPart.trim().slice(leftBorder, rightBorder);


export const loadIPRanges = () => {
    const lines = fs.readFileSync('IP2LOCATION-LITE-DB1.CSV', 'utf8').split('\n');

    return lines.reduce((ipRanges, line) => {
        if (line.length > 0) {
            const parts = line.split(',');
            ipRanges.push({
                start: Number(formatRange(parts[0])),
                end: Number(formatRange(parts[1])),
                countryCode: formatRange(parts[2]),
                countryName: formatRange(parts[3]),
            });
        }
        return ipRanges;
    }, [] as IPRange[]);
};
