export const alphabetReverse = "zyxwvutsrqponmlqjihgfedcbaZYXWVUTSRQPONMLQJIHGFEDCBA";

export const fillArray = (value, len, arr = null) => {
    if(arr == null) arr = [];
    for (var i = 0; i < len; i++) {
        arr.push(value);
    }
    return arr;
}

export const deepClone = async (obj) => {
    return await JSON.parse(await JSON.stringify(obj));
}

export const roundToPrecision = (x, precision) => {
    //Thanks, https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round#Decimal_rounding
    var y = +x + (precision === undefined ? 0.5 : precision/2);
    return y - (y % (precision === undefined ? 1 : +precision));
}