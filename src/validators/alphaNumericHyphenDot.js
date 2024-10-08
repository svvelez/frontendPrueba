const regex = /^[A-Za-z0-9.-]+$/;

export default function alphaNumericHyphenDot(value) {
    return regex.test(value);
}