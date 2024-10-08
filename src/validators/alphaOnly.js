const regex = /^[a-zA-ZÑñ ]*$/;

export default function alphaOnly(value) {
    return regex.test(value);
}