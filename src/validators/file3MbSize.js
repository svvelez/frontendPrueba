function fileSize(value) {
    if (value == null) {
        return false
    }
    return (value.size > 6291456) ? false : true;
}

export default function file3MbSize(value) {
    return fileSize(value);
}