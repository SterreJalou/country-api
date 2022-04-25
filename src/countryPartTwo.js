import axios from 'axios';

const searchResult = document.getElementById('search-results');
const searchButton = document.getElementById('search-button');

// Add event listener to 'Zoek' button.
searchButton.addEventListener("click", formInput);

function formInput(e) {
    e.preventDefault();
    const userInput = document.getElementById('country-input').value;
    if(userInput.length === 0) {
        console.log("Er is niets ingevuld");
    } else {
        getCountryDetails(userInput);

        // Reset input field.
        document.getElementById('country-input').value = "";
    }
}

async function getCountryDetails(userInput) {
    try {
        const url = `https://restcountries.com/v2/name/${userInput}`;
        const resultCountries = await axios.get(url);
        const resultData = resultCountries.data;
        console.log(resultData);
        printCountryDetails(resultData);
    } catch (e) {
        console.error(e);
    }
}

function printCountryDetails(resultData) {
    searchResult.innerHTML = resultData.map((searchedCountry) => {
        return `
        <div class="result">
            <div class="title">
                <img src="${searchedCountry.flag}" alt="${searchedCountry.name}'s flag">
                <h2>${searchedCountry.name}</h2>
            </div>
            <hr>
            <p>${searchedCountry.name} is situated in ${searchedCountry.subregion}.</p>
            <p>It has a population of ${searchedCountry.population} people.</p>
            <p>The capital is ${searchedCountry.capital} and you can pay with ${getCurrencies(searchedCountry.currencies)}.</p>
            <p>They speak ${getLanguages(searchedCountry.languages)}.</p>
        </div>`;
    })
}

function getCurrencies(currencyArray) {
    return currencyArray.map((currency) => {
        return currency.name;
    }).join(' and ');
}

function getLanguages(languageArray) {
    return languageArray.map((language) => {
        return language.name;
    }).join(' and ');
}



//Onze applicatie heeft een zoekbalk waar een gebruiker een naam kan invoeren van een land, en vervolgens daar
// informatie over terug ontvangt, zoals de vlag, regio, naam en currency.

// Buiten de functies moeten we de innerHTML referenties maken

//Stap 1: Schrijf een asynchrone functie die data ophaalt en dynamische content plaatst
// 1. Declareer de functie met een goede naam (intentie): getCountryDetails
// 2. Declareer het try/catch blok
// 3. In het try blok: haal data op middels de Countries API
// 4. In het try blok: plaats de data in de innerHTML, met aansluitende values
// 5. In het catch blok: console loggen van de error
// 6. In het catch blok: Gebruiksfeedback teruggeven, een error message als het land niet bestaat

//Stap 2: Schrijf een functie die zoekt binnen de data.
// 1. Declareer synchrone functie met goede naam (intentie)
// 2. Zorg ervoor dat de pagina niet refresht!
// 3. Een referentie maken naar het inputveld (DOM)
// 4. We spreken de asynchrone functie aan en geven hier een parameter aan mee (van input query)
// 5. Het invoerveld wordt geleegd


//Stap 3: Schrijf een functie die de valuta teruggeeft van het land


