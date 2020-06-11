import * as crypto from 'crypto';

const PASSWORD_LENGTH = 256;
const SALT_LENGTH = 64;
const ITERATIONS = 10000;
const DIGEST = 'sha256';
const BYTE_TO_STRING_ENCODING = 'hex';

/**
 * Generates a PersistedPassword given the password provided by the user. This should be called
 * when creating a user or redefining the password
 */
export function generateHash(password) {
    return ((accept, reject) => {
        const salt = crypto.randomBytes(SALT_LENGTH).toString(BYTE_TO_STRING_ENCODING);
        crypto.pbkdf2(password, salt, ITERATIONS, PASSWORD_LENGTH, DIGEST, (error, hash) => {
            if (error) {
                reject(error);
            } else {
                accept({
                           salt: salt,
                           hash: hash.toString(BYTE_TO_STRING_ENCODING),
                           iterations: ITERATIONS,
                       });
            }
        });
    })
}

/**
 * Verifies the attempted password against the password information saved in the database. This
 * should be called when the user tries to log in.
 */
export function verifyPassword(salt, hash, iterations, passwordAttempt) {
    return ((accept, reject) => {
        crypto.pbkdf2(passwordAttempt, salt, iterations, PASSWORD_LENGTH, DIGEST, (error, hashAttempt) => {
                if (error) {
                    reject(error);
                } else {
                    (hash === hashAttempt.toString(BYTE_TO_STRING_ENCODING)) ? accept() : reject();
                }
            });
    })
}