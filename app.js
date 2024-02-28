const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

// console.log(BASE_URL);

const countryList = { ...country };


const dropdown = document.querySelectorAll(".country-dropdown select");
const btn = document.querySelector("button");
const msg = document.querySelector(".msg");
const amount = document.querySelector("input");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");



for (let select of dropdown) {

    for (let currencyCode in countryList) {

        let newOption = document.createElement("option");

        if (select.name === "from" && currencyCode === "USD") {
            newOption.selected = "selected";
        } 
        else if (select.name === "to" && currencyCode === "INR") {
            newOption.selected = "selected";
        }

        newOption.innerText = currencyCode;
        newOption.value = currencyCode;
        select.append(newOption);
    }

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });

}

const updateFlag = (event) => {

    let currCode = event.value;

    let countryCode = countryList[currCode];

    const newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;

    let img = event.parentElement.querySelector("img");
    img.src = newSrc;

}



btn.addEventListener("click", (event) => {
    event.preventDefault();
    getExchangeRate();
});


const getExchangeRate = async (event) => {

    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;

    const response = await fetch(URL);

    console.log(response);

    let data = await response.json();

    let rate = data[toCurr.value.toLowerCase()];

    let finalAmount = amount.value * rate;

    console.log(finalAmount);

    msg.innerText = `${amount.value} ${fromCurr.value} = ${finalAmount.toFixed(2)} ${toCurr.value}`;

}
