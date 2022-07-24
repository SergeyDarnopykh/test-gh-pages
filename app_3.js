const columnType = {
    city_ascii: 'city_ascii',
    lat: 'lat',
    lng: 'lng',
    country: 'country',
    iso2: 'iso2',
    iso3: 'iso3',
    population: 'population'
}
const OUTPUT_DIR = 'output';

const { countWords, countVowels } = require('./models/core/text');
const { readFile, writeFile} = require('./models/core/fs');
const { getColumnFromLine, splitData, buildOutputLine, buildHeading } = require('./models/core/csv');

const getCommandParam = require('./models/core/get-command-param');
const fileName = getCommandParam('file');

if (!fileName) {
    console.log('You need to provide filename like this: --file=fileName');
    // or throw new Error(...);
    return;
}

const inputData = readFile(fileName);
const { heading, data } = splitData(inputData);



// TASK 1

function getOneWordedVowelCities(data, heading) {
    return data.filter(line => {
        const city = getColumnFromLine(line, columnType.city_ascii, heading);

        return countWords(city) === 1 && (countVowels(city) >= 3);
    });
}

const oneWordedVowelCities = getOneWordedVowelCities(data, heading);

writeFile(oneWordedVowelCities, 'task_1.csv', OUTPUT_DIR);



// TASK 2

const topCountriesColumns = {
    country: columnType.country,
    mostPopulatedCity: 'most_populated_city',
    countryPopulation: 'country_population'
}

function groupByCountry(data, heading) {
    return data.reduce((dataByCountry, line) => {
        const country = getColumnFromLine(line, columnType.country, heading);

        if (!dataByCountry[country]) {
            dataByCountry[country] = []
        }

        dataByCountry[country].push(line);

        return dataByCountry;
    }, {});
}

function getCountriesPopulation(dataByCountry, heading) {
    return Object.entries(dataByCountry)
        .reduce((countriesPopulationInfo, [country, data]) => {
            let mostPopulatedCity;
            let mostPopulatedCityPopulation = 0;

            const countryPopulation = data.reduce((countryPopulationAcc, line) => {
                const city = getColumnFromLine(line, columnType.city_ascii, heading);
                const cityPopulation = +getColumnFromLine(line, columnType.population, heading);

                if (cityPopulation > mostPopulatedCityPopulation) {
                    mostPopulatedCityPopulation = cityPopulation;
                    mostPopulatedCity = city;
                }

                return countryPopulationAcc + cityPopulation;
            }, 0);
            const countryPopulationInfo = {
                country: country,
                population: countryPopulation,
                mostPopulatedCity
            };

            return [...countriesPopulationInfo, countryPopulationInfo];
        }, []);
}

function getMostPopulatedCountries(countriesPopulationInfo, count = 10) {
    const topCountriesByPopulation = countriesPopulationInfo.slice().sort((countryA, countryB) => {
        return countryB.population - countryA.population;
    });

    return topCountriesByPopulation.slice(0, count);
}

function prepareCountriesPopulationInfo(countriesPopulationInfo) {
    return countriesPopulationInfo.map(({ country, mostPopulatedCity, population }) => {
        return buildOutputLine([country, mostPopulatedCity, population]);
    });
}


const dataByCountry = groupByCountry(data, heading);
const countriesPopulationInfo = getCountriesPopulation(dataByCountry, heading);
const mostPopulatedCountries = getMostPopulatedCountries(countriesPopulationInfo);

const topCountriesHeading = buildHeading(topCountriesColumns);
const preparedCountriesPopulationInfo = prepareCountriesPopulationInfo(mostPopulatedCountries);


const topCountriesInfo = [topCountriesHeading].concat(preparedCountriesPopulationInfo);

writeFile(topCountriesInfo, 'task_2.csv', OUTPUT_DIR);


// Task 3

const extendedColumnType = {
    ...columnType,
    latFromTgn: 'lat_from_tgn',
    lngFromTg: 'lng_from_tgn'
}
const LACHESTRY_LAT = 47.206619;
const LACHESTRY_LNG = 38.933523;

function getLachestryLatDifference(lat) {
    return +lat - +LACHESTRY_LAT;
}

function getLachestryLngDifference(lng) {
    return +lng - +LACHESTRY_LNG;
}

function addLachestryPositionDifference(data, heading) {
    return data.map(line => {
        const lat = +getColumnFromLine(line, extendedColumnType.lat, heading);
        const lng = +getColumnFromLine(line, extendedColumnType.lng, heading);
        const lachestryLatDifference = getLachestryLatDifference(lat);
        const lachestryLngDifference = getLachestryLngDifference(lng);
        const lineExtension = buildOutputLine([lachestryLatDifference, lachestryLngDifference]);

        return line.concat(',', lineExtension);
    });
}

const headingWithLachestryInfo = buildHeading(extendedColumnType);
const dataWithLachestryInfo = addLachestryPositionDifference(data, heading);

const lachestryInfo = [headingWithLachestryInfo].concat(dataWithLachestryInfo);

writeFile(lachestryInfo, 'task_3.csv', OUTPUT_DIR);

