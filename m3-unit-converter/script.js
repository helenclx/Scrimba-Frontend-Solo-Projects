/*
1 meter = 3.281 feet
1 liter = 0.264 gallon
1 kilogram = 2.204 pound

1 foot = 0.305 meter
1 gallon = 4.546 liter
1 pound = 0.456 kilogram
*/

const inputEl = document.querySelector("#unit-input");
const convertBtn = document.querySelector(".hero__convert-btn");
const lengthEl = document.querySelector("#converted-length");
const volumeEl = document.querySelector("#converted-volume");
const massEl = document.querySelector("#converted-mass");

const meterToFeet = 3.281;
const feetToMeter = 0.305;
const literToGallon = 0.264;
const gallonToLiter = 4.546;
const kilogramToPound = 2.204;
const poundToKilogram = 0.456;

convertBtn.addEventListener("click", () => {
    let baseValue = inputEl.value;

    lengthEl.textContent = `
        ${baseValue} meters = ${(baseValue * meterToFeet).toFixed(3)} feet | ${baseValue} feet = ${(baseValue * feetToMeter).toFixed(3)} meters
    `;

    volumeEl.textContent = `
        ${baseValue} liters = ${(baseValue * literToGallon).toFixed(3)} gallons | ${baseValue} gallons = ${(baseValue * gallonToLiter).toFixed(3)} liters
    `;

    massEl.textContent = `
        ${baseValue} kilograms = ${(baseValue * kilogramToPound).toFixed(3)} pounds | ${baseValue} pounds = ${(baseValue * poundToKilogram).toFixed(3)} kilograms
    `;
})

window.onload = () => {
    inputEl.onkeydown = inputEl.onblur = inputEl.onkeyup = function()
    {
        inputEl.value = inputEl.value.replace(/[^0-9]+/, "");
    }
}