export function cleanUpInput(inputStr) {
	let str = inputStr
	str = str.trim()
	str = str.replace(/\s\s+/g, ' ')
	str = str.substring(0, 150)
	return str
}

export function replaceSpecialCharacters(inputStr) {
	let str = inputStr
	str = str.replace(/[ÀÁÂÃÄÅ]/, 'A')
	str = str.replace(/[àáâãäå]/, 'a')
	str = str.replace(/[ÈÉÊË]/, 'E')
	str = str.replace(/[èéêë]/, 'e')
	str = str.replace(/[öø]/, 'o')
	str = str.replace(/[ÖØ]/, 'O')
	str = str.replace(/[Ç]/, 'C')
	str = str.replace(/[ç]/, 'c')
	return str
}
