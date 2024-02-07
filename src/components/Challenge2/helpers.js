import data from '../../data/challenge02/data.js';

export function getPointsData(type, xScale, yScale) {
	let pointsData = [];
	for (let i = 0; i < data.length - 1; i++) {
		const current = data[i];
		const next = data[i + 1];
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
