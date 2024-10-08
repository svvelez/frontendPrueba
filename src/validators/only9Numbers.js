function onlyNumber(value) {
    if (value == null) {
        return false
    }
    return (value.length != 9) ? false : true;
}

export default function only9Number(value) {
    return onlyNumber(value);
}