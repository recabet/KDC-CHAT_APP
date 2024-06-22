// Function to encrypt a string using Caesar Cipher
function cipher(text, shift) {
    let result = '';

    for (let i = 0; i < text.length; i++) {
        let charCode = text.charCodeAt(i);

        if (charCode >= 65 && charCode <= 90) {
            result += String.fromCharCode(((charCode - 65 + shift + 26) % 26) + 65);
        }
        else if (charCode >= 97 && charCode <= 122) {
            result += String.fromCharCode(((charCode - 97 + shift + 26) % 26) + 97);
        }
        else {
            result += text.charAt(i);
        }
    }

    return result;
}

// Function to decrypt a string encrypted with Caesar Cipher
function decipher(text, shift) {
    return cipher(text, 26 - shift);
}

module.exports = {
    cipher : cipher,
    decipher : decipher
};