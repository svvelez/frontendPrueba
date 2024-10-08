function fileType(value) {
    if (value == null) {
        return false
    }else{
        if (value.length > 6) {
            return false
        }else{
            return true
        }
    }
}

export default function filesquantity(value) {
    return fileType(value);
}
