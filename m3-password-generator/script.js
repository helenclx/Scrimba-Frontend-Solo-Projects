const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = "~`!@#$%^&*()_-+={[}],|:;<>.?/";

let passwordLength = 15;

const lengthSlider = document.querySelector(".setting__slider");
const passwordLengthEl = document.querySelector("#password-length");
const numberCheckbox = document.querySelector("#password-numbers");
const symbolCheckbox = document.querySelector("#password-symbols");
const passwordBtn = document.querySelector(".password-btn");

const passwordOneEl = document.querySelector("#password-1");
const passwordTwoEl = document.querySelector("#password-2");
const clipboardBtns = document.querySelectorAll(".clipboard");

lengthSlider.addEventListener("input", () => {
    passwordLength = lengthSlider.value;
    passwordLengthEl.textContent = passwordLength;
});

passwordBtn.addEventListener("click", () => {
    let characters = alphabets;
    numberCheckbox.checked ? (characters += numbers) : "";
    symbolCheckbox.checked ? (characters += symbols) : "";
    passwordOneEl.textContent = getRandomPassword(passwordLength, characters);
    passwordTwoEl.textContent = getRandomPassword(passwordLength, characters);
});

const getRandomPassword = (length, characters) => {
    let randomPassword = "";
    for (let i = 0; i < length; i++) {
        randomPassword += characters.charAt(
            Math.floor(Math.random() * characters.length)
        );
    }
    return randomPassword;
};

clipboardBtns.forEach((btn, i) => {
    const passwordEl = document.querySelector(`#password-${i + 1}`);

    btn.addEventListener("click", () => {
        navigator.clipboard.writeText(passwordEl.textContent);
        alert("Password copied to clipboard");
    });
});