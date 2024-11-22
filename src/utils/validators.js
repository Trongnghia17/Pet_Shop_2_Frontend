// File: src/utils/validators.js

/**
 * Kiểm tra định dạng email
 * @param {string} email - Email cần kiểm tra
 * @returns {boolean} - True nếu email hợp lệ, ngược lại false
 */
export function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
