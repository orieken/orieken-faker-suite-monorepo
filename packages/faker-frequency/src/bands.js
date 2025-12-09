export const BAND_RANGES = {
    VHF: { minHz: 30e6, maxHz: 300e6 },
    UHF: { minHz: 300e6, maxHz: 3e9 },
    SHF: { minHz: 3e9, maxHz: 30e9 },
    EHF: { minHz: 30e9, maxHz: 300e9 }
};
export const assertRange = (min, max) => {
    if (min >= max)
        throw new Error(`Invalid range: min (${min}) must be < max (${max})`);
};
export const applyOverrides = (overrides) => {
    if (!overrides)
        return { ...BAND_RANGES };
    const copy = { ...BAND_RANGES };
    for (const band of Object.keys(overrides)) {
        const ov = overrides[band];
        if (!ov)
            continue;
        if (ov.minHz >= ov.maxHz)
            throw new Error(`Override for band ${band} invalid: minHz >= maxHz`);
        copy[band] = { minHz: ov.minHz, maxHz: ov.maxHz };
    }
    return copy;
};
