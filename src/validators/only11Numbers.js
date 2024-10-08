function onlyNumber(value) {
    if (value == null) {
        return false
    }
    return (value.length != 11) ? false : true;
}

export default function only11Number(value) {
    return onlyNumber(value);
}