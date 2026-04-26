import { validateEmail, validatePassword, validateName } from '@utils/index';

export const validateRegistrationForm = (email: string, password: string, name: string) => {
    if (!validateName(name)) {
        return {
            valid: false,
            message: 'Nama minimal 5 huruf dan hanya boleh berisi huruf/spasi.',
        };
    }

    if (!validateEmail(email)) {
        return {
            valid: false,
            message: 'Email tidak sesuai. Mohon isi email dengan benar.',
        };
    }

    if (!validatePassword(password)) {
        return {
            valid: false,
            message: 'Password harus minimal 6 karakter.', // updated message
        };
    }

    return { valid: true };
};
