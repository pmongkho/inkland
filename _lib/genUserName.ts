const adjectives = [
	'Cool',
	'Fast',
	'Smart',
	'Brave',
	'Epic',
	'Mighty',
	'Witty',
	'Silent',
	'Swift',
	'Bold',
]

const nouns = [
	'Tiger',
	'Lion',
	'Eagle',
	'Panther',
	'Wizard',
	'Ninja',
	'Samurai',
	'Ranger',
	'Falcon',
	'Phoenix',
]

export function generateUsername(): string {
	const adjective = adjectives[Math.floor(Math.random() * adjectives.length)]
	const noun = nouns[Math.floor(Math.random() * nouns.length)]
	const number = Math.floor(Math.random() * 1000) // Optionally append a number between 0 and 999
	return `${adjective}${noun}${number}`
}
