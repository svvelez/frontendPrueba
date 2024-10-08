function fileType(value) {
    if (value == null) {
        return false
    }
    return (
        value.type == 'image/png' || value.type == 'image/jpg' ||
        value.type == 'image/jpeg' || value.type == 'application/pdf'
    ) ? true : false;
}

export default function fileTypeAccept(value) {
    return fileType(value);
}