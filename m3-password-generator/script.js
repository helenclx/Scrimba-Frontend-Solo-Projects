const characters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9","~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?", "/"];
let passwordLength = 15;

const passwordBtn = document.querySelector(".password-btn");
const passwordOneEl = document.querySelector("#password-1");
const passwordTwoEl = document.querySelector("#password-2");
const clipboardBtns = document.querySelectorAll(".clipboard");

passwordBtn.addEventListener("click", () => {
    passwordOneEl.textContent = getRandomPassword();
    passwordTwoEl.textContent = getRandomPassword();
});

const getRandomPassword = () => {
    let randomPassword= "";
    for (let i = 0; i < passwordLength; i++) {
        randomPassword += getRandomCharacter();
    }
    return randomPassword;
};

const getRandomCharacter = () => {
    let characterStr = characters.join("");
    const randomChar = Math.floor(Math.random() * characterStr.length);

    return characterStr[randomChar];
};

clipboardBtns.forEach((btn, i) => {
    const passwordEl = document.querySelector(`#password-${i + 1}`);

    btn.addEventListener("click", () => {
        navigator.clipboard.writeText(passwordEl.textContent);
        alert("Password copied to clipboard");
    });
});