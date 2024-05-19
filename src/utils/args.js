
function getArgByKey(key, short = false) {
    const argIndex = process.argv.indexOf(`--${key}`);
    if (argIndex === -1) {
        if (short) {
            const argIndexShort = process.argv.indexOf(`-${key.substring(0, 1)}`);
            return argIndexShort === -1 ? null : process.argv[argIndexShort + 1];
        } else {
            return null;
        }
    } else {
        return argIndex === -1 ? null : process.argv[argIndex + 1];
    }
}

module.exports = {
    getArgByKey
};