const alphas = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const symbols = ["~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?", "/"];

const alphasStr = alphas.join("");
const numbersStr = numbers.join("");
const symbolsStr = symbols.join("");

let passwordLength = 15;

const passwordBtn = document.querySelector(".password-btn");
const passwordOneEl = document.querySelector("#password-1");
const passwordTwoEl = document.querySelector("#password-2");
const clipboardBtns = document.querySelectorAll(".clipboard");
const lengthSlider = document.querySelector(".setting__slider");
const passwordLengthEl = document.querySelector("#password-length");
const numberCheckbox = document.querySelector("#password-numbers");
const symbolCheckbox = document.querySelector("#password-symbols");

passwordBtn.addEventListener("click", () => {
    let characters = alphasStr;
    numberCheckbox.checked ? (characters += numbersStr) : "";
    symbolCheckbox.checked ? (characters += symbolsStr) : "";
    passwordOneEl.textContent = getRandomPassword(passwordLength, characters);
    passwordTwoEl.textContent = getRandomPassword(passwordLength, characters);
});

const getRandomPassword = (length, characters) => {
    let randomPassword= "";
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

lengthSlider.addEventListener("input", () => {
    passwordLength = lengthSlider.value;
    passwordLengthEl.textContent = passwordLength;
});