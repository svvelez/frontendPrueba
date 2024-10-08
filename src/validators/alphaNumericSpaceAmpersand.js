const regex = /^[A-Za-z0-9Ññ &]+$/;

export default function alphaNumericSpaceAmpersand(value) {
    return regex.test(value);
}