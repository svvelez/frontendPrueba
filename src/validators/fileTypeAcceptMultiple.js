function fileType(value) {
    if (value == null) {
        return false
    }
    for (let i = 0; i < value.length; i++) {
        if (
            value[i].type == 'image/png' || value[i].type == 'image/jpg' ||
            value[i].type == 'image/jpeg' || value[i].type == 'application/pdf'
        ) {
            return true
        }else{
            return false
        }
    }
}

export default function fileTypeAcceptMultiple(value) {
    return fileType(value);
}