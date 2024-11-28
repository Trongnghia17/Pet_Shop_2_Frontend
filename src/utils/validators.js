export function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
export function isNullOrEmpty(value) {
    return value === null || value === undefined || value === '';
}