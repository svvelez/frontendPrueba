const regex = /^[0-9]+$/;

export default function numeric(value) {
    return regex.test(value);
}