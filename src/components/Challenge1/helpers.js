import dataCounties from '../../data/challenge01/counties_cleaned';
import data1870 from '../../data/challenge01/data-1870_converted_corrected';
import data1880 from '../../data/challenge01/data-1880_converted_corrected';

export function extractCountyName(nameWithNumber) {
	return nameWithNumber.substring(0, nameWithNumber.length - 2);
}

function toTitleCase(str) {
	return str.replace(/\w\S*/g, (txt) => {
		return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
	});
}

export function getCountyNameFromIndex(index) {
	if (index && dataCounties.features[index]) {
		return toTitleCase(extractCountyName(dataCounties.features[index].properties.county));
	}
	return '';
}

export function getPopulationSizeFromIndex(index, year) {
	if (!index) {
		return '';
	}
	const countyNameWithNumber = dataCounties.features[index].properties.county;
	const countyName = extractCountyName(countyNameWithNumber);
	let populationSize = 0;
	if (year === '1870') {
		populationSize = data1870[countyName].Population;
	} else {
		populationSize = data1880[countyName].Population;
	}
	return populationSize;
}
