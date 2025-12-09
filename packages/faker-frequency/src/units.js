const UNIT_FACTORS = {
    Hz: 1,
    kHz: 1e3,
    MHz: 1e6,
    GHz: 1e9
};
export const toHz = (value, unit) => value * UNIT_FACTORS[unit];
export const fromHz = (hz, unit) => hz / UNIT_FACTORS[unit];
export const defaultUnitForBand = (band) => {
    switch (band) {
        case 'VHF':
        case 'UHF':
            return 'MHz';
        case 'SHF':
        case 'EHF':
            return 'GHz';
    }
};
