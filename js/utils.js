function ellipsify(stringg, maxLength) {
	if (stringg.length > maxLength) {
		var stringg = stringg.slice(0,maxLength)
		var stringg = stringg + '...'
	}
	return stringg
}

function prettyURL(url) {
	var url = url.split('//')[1] //remove 'http'
	var hasWWW = url.indexOf('www.')
	if (hasWWW != -1) {
		var url = url.split('www.')[1] //remove 'www.'
	}
	var lastChar = url.charAt(url.length-1)
	if (lastChar == '/') {
		var url = url.slice(0, length-1)
	}
	return url
}