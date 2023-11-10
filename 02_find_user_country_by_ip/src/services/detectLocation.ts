import {ipRanges} from "../index";

const IP_OCTET_BASE = 256;

export const ipToNumber = (ip: string): number => {
    const parts = ip.split('.').map(Number);
    return parts.reduce((acc, part) => acc * IP_OCTET_BASE + part, 0);
}

export const findCountryByIp = (ip: string) => {
    let userCountry = {
        countryName: 'Unknown',
        countryCode: 'Unknown',
    };
    const userIPNum = ipToNumber(ip);

    for (const range of ipRanges) {
        if (userIPNum >= range.start && userIPNum <= range.end) {
            userCountry.countryName = range.countryName;
            userCountry.countryCode = range.countryCode
            break;
        }
    }

    return userCountry;
}
