import data from '../../data/challenge02/data.js';
import { randomInt } from 'd3-random';
import { path } from 'd3-path';

export function getPointsData(type, xScale, yScale) {
	let pointsData = [];
	for (let i = 0; i < data.length - 1; i++) {
		const current = data[i];
		let next = data[i + 1];

		// adjust shown data to better fit the original chart with cutoff at 3%
		// remove the following if statement to see the correct data presentation
		if (i === 7) {
			next = { Year: 1870, Slave: 92, Free: 8 };
		}

		if (type === 'free') {
			pointsData.push({
				topRight: {
					x: xScale(0),
					y: yScale(current.Year)
				},
				topLeft: {
					x: xScale(current.Free),
					y: yScale(current.Year)
				},
				bottomLeft: {
					x: xScale(next.Free),
					y: yScale(next.Year)
				},
				bottomRight: {
					x: xScale(0),
					y: yScale(next.Year)
				}
			});
		} else {
			pointsData.push({
				topRight: {
					x: xScale(current.Free),
					y: yScale(current.Year)
				},
				topLeft: {
					x: xScale(current.Slave),
					y: yScale(current.Year)
				},
				bottomLeft: {
					x: xScale(next.Slave),
					y: yScale(next.Year)
				},
				bottomRight: {
					x: xScale(next.Free),
					y: yScale(next.Year)
				}
			});
		}
	}
	return pointsData;
}

export function drawWobblyLineArea(xScale, yScale) {
	let randomSet = [];
	for (let i = 1; 1790 + i <= 1870; i += 1) {
		randomSet.push({ x: xScale(3) + randomInt(-4, 5)(), y: yScale(1790 + i) });
	}

	// area
	const area = path();
	area.moveTo(xScale(3), yScale(1790));
	for (let j = 0; j < randomSet.length; j++) {
		const el = randomSet[j];
		area.lineTo(el.x, el.y);
	}

	area.lineTo(xScale(3), yScale(1870 + 5)); // add extra space at the bottom to avoid overlap
	area.lineTo(xScale(6), yScale(1870 + 5));
	area.lineTo(xScale(6), yScale(1790 - 5)); // avoid overlap by using minus 5
	area.closePath();

	// line
	const line = path();
	line.moveTo(xScale(3), yScale(1790));
	for (let k = 0; k < randomSet.length; k++) {
		const el = randomSet[k];
		line.lineTo(el.x, el.y);
	}

	return {
		line: line.toString(),
		area: area.toString()
	};
}
