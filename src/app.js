import axios from 'axios';

const errorMessage = document.getElementById('error');

async function fetchCountries() {

    try {
        const result = await axios.get('https://restcountries.com/v2/all');
        console.log(result.data);

        const countries = result.data;

        countries.sort((a, b) => {
            return a.population - b.population;
        });

        countriesAll(countries);



    } catch (e) {
        console.error(e);
        if (e.response.status === 500) {
            errorMessage.textContent = "Er ging iets mis in de server";
        } else if (e.response.status === 404) {
            errorMessage.textContent = "Het verzoek is mislukt";
        }
    }
}

fetchCountries();

function countriesAll(countries) {
    const allCountries = document.getElementById('allCountries');
    allCountries.innerHTML = countries.map((country) => {
        return `<li>
                <img class="flag" src="${country.flag}" alt="countryflag">
                <span class="${regionNameAndColour(country.region)}">${country.name}</span>
                <p>Has a population of ${country.population} people</p>
                </li>`
    }).join('');
}

function regionNameAndColour(currentRegion) {

    switch (currentRegion) {
        case 'Africa':
            return 'blue';
        case 'Americas':
            return 'green';
        case 'Asia':
            return 'red';
        case 'Europe':
            return 'yellow';
        case 'Oceana':
            return 'purple';
        default:
            return 'white';
    }
}

