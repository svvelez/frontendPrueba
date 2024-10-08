function fileSize(value) {
    if (value == null) {
        return false
    }else{
        for (let i = 0; i < value.length; i++) {
            if (value[i].size > 6291456) {
                return false
            }else{
                return true
            }
        }
    }
}

export default function file6MbSizeMultiple(value) {
    return fileSize(value);
}