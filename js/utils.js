function footerfix() {
	var $body = $('body')
	var $main = $('#main')
    var wHeight = $(window).height()
    var bHeight = $body.height()
    var mHeight = $main.height()

    if (mHeight < wHeight) {
    	$('body').css('height', wHeight)
    } else {
    	$('body').css('height', mHeight*1.1)
    }
	
}

function unHeaderStyle(targetClass) {
	$('.'+targetClass+' h1').addClass('unHeaderate')
	$('.'+targetClass+' h2').addClass('unHeaderate')
	$('.'+targetClass+' h3').addClass('unHeaderate')
	$('.'+targetClass+' h4').addClass('unHeaderate')
	$('.'+targetClass+' h5').addClass('unHeaderate')
}

//function for the most simple scrapes
function basicScrape(response, targetClass, scrapeClassString ,scrapeLength) {
	var $html = $(response)
	var targetContainer = $('.'+targetClass+' .smallContainer')
	var contentContainers = $html.find(scrapeClassString).slice(0,scrapeLength)
	$.each(contentContainers, function(ind,val) {
		targetContainer.append(val)
	})
}

//basic scrape but using a box instead of whole page
function basicContainerScrape(response, targetClass, containElement, scrapeClassString ,scrapeLength) {
	var content = $.parseHTML(response)
	var $html = $(response)
	var $smallHTML = $html.find(containElement)

	basicScrape($smallHTML, targetClass, scrapeClassString ,scrapeLength)
}

function fixRelativeLinks(targetClass, url, innerClass) {
	var relLinks = $('.'+targetClass+' .smallContainer').find(innerClass)
	relLinks.each(function(ind) {
		$this = $(this)
		var link = $this.attr('href')
		$this.attr('href', url+link)
		//var linkText = $this.text()
		//newHTML = "<a href='"+url+link+"'>"+linkText+"</a>"
		//$this.html(newHTML)
	})
}

function universalLinkFix(targetClass, newURL) {
	var relLinks = $('.'+targetClass+' .smallContainer').find('a')
	relLinks.each(function(ind) {
		var $this = $(this)
		var href = $this.attr('href')
		var isRel = href.split('//')[0][0] == '/'
		if (isRel) {
			$this.attr('href', newURL+href)
		}
	})
}

function replaceTitleWithImage(targetClass, imageLink, url) {
	var $baseClass = $('.'+targetClass).children('.tttitle')
	$baseClass.find('a').text('') //hide link to use image
	//turn tttitle into link
	$baseClass.click(function() {
		$this = $(this)
		$this.wrap("<a href='"+url+"'></a>")
	})
	//styling 
	$baseClass.css({
		'background-image': 'url('+imageLink+')',
		'background-repeat': 'no-repeat',
		'background-position-x': '50%'
	})
}

function removeDupeLinks(targetClass) {
	linkHolder = []
	$('.'+targetClass).find('a').each(function(index) {
		var $this = $(this)
		var url = $this.attr('href')
		alreadyExists = linkHolder.indexOf(url)
		if (alreadyExists != -1) {
			$this.hide()
		}
		linkHolder.push(url)
	})
}

function unlinkStyle(targetClass) {
	var links = $('.'+targetClass+' a').addClass('unlinkify')
}

function colorate(targetClass, color, white) {
	var baseClass = $('.'+targetClass)
	baseClass.find('.tttitle').css('background-color', color)
	baseClass.css('border-color', color)
	baseClass.children('.smallFoot').css('background-color', color)
	if (white == true) {
		baseClass.children('.smallFoot').children('span').css('color', 'white')
	}
}

function ellipsify(stringg, maxLength) {
	if (stringg.length > maxLength) {
		var stringg = stringg.slice(0,maxLength)
		var stringg = stringg + '...'
	}
	return stringg
}

function prettyURL(url) {
	
	if (url.indexOf('//') != -1) {
		var url = url.split('//')[1] //remove 'http'
	}
	
	var hasWWW = url.indexOf('www.')
	if (hasWWW != -1) {
		var url = url.split('www.')[1] //remove 'www.'
	}
	var lastChar = url.charAt(url.length-1)
	if (lastChar == '/') {
		var url = url.slice(0, url.length-1)
	}

	return url
}

function favicon(url) {
	var appendage = "https://s2.googleusercontent.com/s2/favicons?domain_url="
	var encodedURL = encodeURIComponent(url)
	return appendage+encodedURL
}






