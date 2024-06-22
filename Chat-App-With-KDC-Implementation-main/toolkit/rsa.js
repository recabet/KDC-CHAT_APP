
function randPrime()
{
    let prime = Math.floor(Math.random() * 90) + 10;
    while (!isPrime(prime))
    {
        prime = Math.floor(Math.random() * 90) + 10;
    }
    return prime;
}


function isPrime(num)
{
    for (let i = 2, sqrt = Math.sqrt(num); i <= sqrt; i++)
    {
        if (num % i === 0)
        {
            return false;
        }
    }
    return num > 1;
}


function gcd(a, b)
{
    while (b !== 0)
    {
        const temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}


function modInverse(a, m)
{
    for (let i = 1; i < m; i++)
    {
        if ((a * i) % m === 1) return i;
    }
    return null;
}


function generateKeyPair()
{
    let p = randPrime();
    let q = randPrime();
    while (p === q)
    {
        q = randPrime();
    }
    const n = p * q;
    const phi = (p - 1) * (q - 1);
    let e = Math.floor(Math.random() * (phi - 2)) + 1;
    while (gcd(e, phi) !== 1)
    {
        e = Math.floor(Math.random() * (phi - 2)) + 1;
    }
    const d = modInverse(e, phi);
    return [{ e, n }, { d, n }];
}

function encrypt(public_key, plaintext)
{
    const { e, n } = public_key;
    const cipher = [];
    for (let char of plaintext)
    {
        let charCode = BigInt(char.charCodeAt(0));
        let result = BigInt(1);
        for (let i = 0; i < e; i++)
        {
            result = (result * charCode) % BigInt(n);
        }
        cipher.push(result.toString());
    }
    return cipher;
}

function decrypt(private_key, ciphertext)
{
    const { d, n } = private_key;
    const plaintextInt = [];
    for (let char of ciphertext)
    {
        let charCode = BigInt(char);
        let result = BigInt(1);
        for (let i = 0; i < d; i++)
        {
            result = (result * charCode) % BigInt(n);
        }
        plaintextInt.push(String(result));
    }
    const plaintext = plaintextInt.map(char2 => String.fromCharCode(parseInt(char2))).join('');
    return plaintext;
}

module.exports = {
    generateKeyPair : generateKeyPair,
    encrypt : encrypt,
    decrypt : decrypt 
}; 