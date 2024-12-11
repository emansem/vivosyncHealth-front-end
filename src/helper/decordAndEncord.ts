import crypto from 'crypto';
const secret = process.env.NEXT_PUBLIC_SECURITY_SIGNATURE;

if (!secret) {
    throw new Error('SECURITY_SIGNATURE is not defined in environment variables');
}
export const encodeValue = (value: string) => {
    // Step 1: Create a Buffer from the email string
    // Buffer.from('hello') creates binary data: <Buffer 68 65 6c 6c 6f>
    const buffer = Buffer.from(value);

    // Step 2: Convert buffer to base64 string
    // toString('base64') converts binary to base64 encoding
    const encoded = buffer.toString('base64');
    // Breaking down HMAC signature:
    const signature = crypto
        .createHmac('sha256', secret)  // 1️⃣ Create HMAC with SHA256
        .update(encoded)                    // 2️⃣ Add our data
        .digest('base64');                 // 3️⃣ Get final signature

    return `${signature}|&*ghagah${encoded}`;
};

// Example 2: Safe Decoding with Error Handling
export const decordValue = (signedToken: string) => {
    try {
        // 1. Split token and signature
        const [signature, encoded] = signedToken.split('|&*ghagah');
        console.log(signature, encoded)

        // 2. Verify signature
        const expectedSignature = crypto
            .createHmac('sha256', secret)
            .update(encoded)
            .digest('base64');

        if (signature !== expectedSignature) {
            return null;
        }

        // 3. Decode if valid
        return Buffer.from(encoded, 'base64').toString('ascii');
    } catch {
        return null;
    }
};