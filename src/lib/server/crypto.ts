import crypto from 'crypto';

/**
 * Config constants - keep these stable (except salt/iv which are random per encryption)
 */
const SALT_BYTES = 16; // scrypt salt length
const IV_BYTES = 12; // AES-GCM recommended IV length
const TAG_BYTES = 16; // AES-GCM authentication tag length
const KEY_LEN = 32; // 256-bit key (AES-256)

/**
 * deriveKey
 * - Derives a 256-bit key from a passphrase + salt using scrypt.
 * - scrypt params: N, r, p are left to Node defaults via scryptSync, which are already safe
 */
function deriveKey(passphrase: string, salt: Buffer): Buffer {
    // Use scryptSync for key derivation (native, memory-hard)
    return crypto.scryptSync(passphrase, salt, KEY_LEN);
}

/**
 * encrypt
 * - plaintext: string to encrypt
 * - passphrase: secret phrase stored in env (e.g. process.env.ENCRYPTION_SECRET)
 * - aad: optional additional authenticated data (string). Useful to bind ciphertext to user/doc.
 *
 * Returns: base64(salt || iv || authTag || ciphertext)
 */
export function encrypt(plaintext: string, passphrase: string, aad?: string): string {
    if (!passphrase || passphrase.length < 16) {
        throw new Error(
            'Passphrase must be provided and be sufficiently long (>=16 chars recommended).'
        );
    }

    const salt = crypto.randomBytes(SALT_BYTES);
    const iv = crypto.randomBytes(IV_BYTES);
    const key = deriveKey(passphrase, salt);

    const cipher = crypto.createCipheriv('aes-256-gcm', key, iv, { authTagLength: TAG_BYTES });

    if (aad) {
        cipher.setAAD(Buffer.from(aad, 'utf8'));
    }

    const encrypted = Buffer.concat([cipher.update(plaintext, 'utf8'), cipher.final()]);
    const authTag = cipher.getAuthTag();

    // Structure: salt | iv | tag | ciphertext
    const out = Buffer.concat([salt, iv, authTag, encrypted]);
    return out.toString('base64');
}

/**
 * decrypt
 * - payloadB64: base64 string produced by encrypt(...)
 * - passphrase: same passphrase used for encryption
 * - aad: must match the aad used during encryption (if any), or auth will fail
 *
 * Returns: decrypted plaintext string
 */
export function decrypt(payloadB64: string, passphrase: string, aad?: string): string {
    if (!passphrase || passphrase.length < 16) {
        throw new Error(
            'Passphrase must be provided and be sufficiently long (>=16 chars recommended).'
        );
    }

    const payload = Buffer.from(payloadB64, 'base64');

    if (payload.length < SALT_BYTES + IV_BYTES + TAG_BYTES + 1) {
        throw new Error('Invalid payload length.');
    }

    const salt = payload.slice(0, SALT_BYTES);
    const iv = payload.slice(SALT_BYTES, SALT_BYTES + IV_BYTES);
    const tag = payload.slice(SALT_BYTES + IV_BYTES, SALT_BYTES + IV_BYTES + TAG_BYTES);
    const ciphertext = payload.slice(SALT_BYTES + IV_BYTES + TAG_BYTES);

    const key = deriveKey(passphrase, salt);

    const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv, { authTagLength: TAG_BYTES });

    if (aad) {
        decipher.setAAD(Buffer.from(aad, 'utf8'));
    }

    decipher.setAuthTag(tag);

    const decrypted = Buffer.concat([decipher.update(ciphertext), decipher.final()]);

    return decrypted.toString('utf8');
}
