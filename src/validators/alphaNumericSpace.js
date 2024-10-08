const regex = /^[A-Za-z0-9 ]+$/;

export default function alphaNumericSpace(value) {
    return regex.test(value);
}