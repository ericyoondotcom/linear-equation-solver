export const alphabetReverse = "zyxwvutsrqponmlqjihgfedcbaZYXWVUTSRQPONMLQJIHGFEDCBA";

export const fillArray = (value, len, arr = null) => {
    if(arr == null) arr = [];
    for (var i = 0; i < len; i++) {
        arr.push(value);
    }
    return arr;
}