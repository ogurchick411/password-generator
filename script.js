const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');
const clipboardEl = document.getElementById('clipboard');
const strengthMeterEl = document.getElementById('strength-meter');

const getRandomLower = () => String.fromCharCode(Math.floor(Math.random() * 26) + 97);
const getRandomUpper = () => String.fromCharCode(Math.floor(Math.random() * 26) + 65);
const getRandomNumber = () => String.fromCharCode(Math.floor(Math.random() * 10) + 48);
const getRandomSymbol = () => {
    const symbols = '!@#$%^&*(){}[]=<>/,.';
    return symbols[Math.floor(Math.random() * symbols.length)];
};

const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
};

generateEl.addEventListener('click', () => {
    const length = +lengthEl.value;
    const hasLower = lowercaseEl.checked;
    const hasUpper = uppercaseEl.checked;
    const hasNumber = numbersEl.checked;
    const hasSymbol = symbolsEl.checked;

    const password = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
    resultEl.innerText = password;
    updateStrengthMeter(password, length, hasLower, hasUpper, hasNumber, hasSymbol);
});

clipboardEl.addEventListener('click', () => {
    const password = resultEl.innerText;
    if (!password) return;
    navigator.clipboard.writeText(password);
    clipboardEl.innerText = 'Copied!';
    setTimeout(() => {
        clipboardEl.innerText = 'Copy';
    }, 2000);
});

function generatePassword(lower, upper, number, symbol, length) {
    let generatedPassword = '';
    const typesArr = [{lower}, {upper}, {number}, {symbol}].filter(item => Object.values(item)[0]);

    if (typesArr.length === 0) {
        return '';
    }
 
    for (let i = 0; i < length; i++) {
        const randomTypeObj = typesArr[Math.floor(Math.random() * typesArr.length)];
        const funcName = Object.keys(randomTypeObj)[0];
        generatedPassword += randomFunc[funcName]();
    }

    return generatedPassword;
}

function updateStrengthMeter(password, length, hasLower, hasUpper, hasNumber, hasSymbol) {
    let score = 0;
    if (hasLower) score++;
    if (hasUpper) score++;
    if (hasNumber) score++;
    if (hasSymbol) score++;
    if (length >= 12) score++;
    if (length >= 16) score++;

    if (!password) {
        strengthMeterEl.style.width = '0%';
        strengthMeterEl.style.background = '#334155';
        return;
    }

    if (score <= 2) {
        strengthMeterEl.style.width = '33%';
        strengthMeterEl.style.background = '#ef4444';
    } else if (score <= 4) {
        strengthMeterEl.style.width = '66%';
        strengthMeterEl.style.background = '#f59e0b';
    } else {
        strengthMeterEl.style.width = '100%';
        strengthMeterEl.style.background = '#10b981';
    }
}