function randomTuring() {
	const states = [
		'1010',
		'101',
		'101',

	]

	const machines = [
		[
			['Scan', '0', '0', 'R', 'Scan'],
			['Scan', '1', '1', 'R', 'Scan'],
			['Scan', '#', '0', 'R', 'Adding'],
			['Adding', '#', '0', 'R', 'Halt'],
		],
		[
			['S', '0', '0', 'R', 'S'],
			['S', '1', '1', 'R', 'S'],
			['S', '#', '#', 'L', 'End'],
			['End', '0', '0', 'R', 'Accept'],
			['End', '1', '1', 'R', 'Reject'],
			['End', '#', '#', 'R', 'Reject'],
		],
		[
			['S', '0', '0', 'R', 'S'],
			['S', '1', '1', 'R', 'S'],
			['S', '#', '#', 'L', 'B'],
			['B', '1', '0', 'L', 'B'],
			['B', '0', '1', 'L', 'H'],
			['B', '#', '#', 'L', 'H'],
		]
	]

	const index = Math.floor(Math.random() * states.length)

	return ([states[index], machines[index]])
}

export default randomTuring
