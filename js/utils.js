function processInitiatorResult(result, initiator) {
			if (result['selectedScrapes'] != undefined) {
		    	var res = result['selectedScrapes']['add']
		    	
		    	if (initiator['add'].length > 0) {
		    		initiator['add'] = initiator['add'].concat(res)
		    	} else if (res.length > 0) {
		    		initiator['add'] = res

		    	} else {

		    	}
		    	initiator['sub'] = result['selectedScrapes']['sub']
		    	initiator['sortOrder'] = result['selectedScrapes']['sortOrder']
	   		}
	   		console.log(initiator)
	   		return initiator
		}


//actual ajax code
function ajaxCall(url, responseFunction, targetClass, maxCache, now) {

	var client = new XMLHttpRequest();
	client.open("GET", url, true);
	client.onload = (function(response) {
		var target = response.currentTarget
		var responseURL = prettyURL(target.responseURL)

		var clean = prettyURL(url).split('.')
		clean = clean[clean.length-2]
		var cleanRespUrl = responseURL.split('/')[0] //redirect bug hack

		cleanRespUrl = cleanRespUrl.split('.')
		cleanRespUrl = cleanRespUrl[cleanRespUrl.length-2]
		if (cleanRespUrl == clean) {
			if (target.readyState === 4) {
		    	if (target.status === 200) {

		    		var response = target.response
			    	var store = {}
			    	store[targetClass] = {'response': response,
											'time': now,
											'maxCache': maxCache
											}
			    	storage.set(store, function() {
			    	})
			  		responseFunction(response, targetClass)
		    	} else {
		    		responseFunction(cacheResponse, targetClass)
		    	}
		    } else {
		    }
		}
	    

	});
	client.send();
}

function scrape(url, responseFunction, targetClass, maxCache, noshow) {
	var time = new Date()
	var now = Date.now(time)
	var prevResponse = storage.get(targetClass, function(result) {
		var isCached = result.hasOwnProperty(targetClass)
		if(isCached && noshow==false) {
			var prevTime = result[targetClass]['time']
			var cacheResponse = result[targetClass]['response']
			var diff = now - prevTime
			var overCache = diff < maxCache
			if (overCache) {
				//alert('response from cache '+ url)
				responseFunction(cacheResponse, targetClass)

			} else {
				//alert('response not from cache '+ url)
				ajaxCall(url, responseFunction, targetClass, maxCache, now)
			}
		} else {
			
			ajaxCall(url, responseFunction, targetClass, maxCache, now)	
		}		
	})
}

//function for filling container
function handle_url(url, noshow) {
	var pretty = prettyURL(url)
	var scraped = alreadyScraped.indexOf(pretty)
	alreadyScraped.push(pretty)
	if (scraped != -1) {
		return null
	} else if (scrapers.hasOwnProperty(pretty)) {

		var newClass = scrapers[pretty]['class']
		var blah = scrapers[pretty]['callback']
		var maxCache = scrapers[pretty]['maxCache']
		scrape(url, blah, newClass, maxCache, noshow)
		return newClass

	} else if (non_scrapers.hasOwnProperty(pretty)) { 
		var newClass = non_scrapers[pretty]['class']
		var blah = non_scrapers[pretty]['callback']
		setTimeout(function(){ //timout because container isn't created
								//yet. 
			blah(newClass)},150)
		return newClass
	} else {
		return null
	}
	
}

function newContainer (url, title, conClass) {
	var content = "<div title='"+url+"' class='container "+conClass+"'><a class='tttitleLink' href='"+ url + "'><div class='tttitle'><i class='fa fa-external-link linkIcon'></i></div></a>"  //will be appended each loop into main container
	//var content = content "//close title div
	var content = content + "<div class='smallContainer'>"
	var content = content + "</div>" //close small container
	var content = content + "<div class='smallFoot'></div>"
	var content = content + "</div>" //close container div
	var $content = $(content)
	

	$content.children('.smallFoot').click(function() {
		var $smallCon = $(this).siblings('.smallContainer')
		$smallCon.toggleClass('slideCon')
		$(this).toggleClass('rotated')
	})
	return $content
}

//function for displaying just .tttitle for clients

function displayTTTitle(conClass, urlll) {
		var content = "<div  class='psuedoContainer "+conClass+"'>"
		var content = content + "<div title="+urlll+" class='tttitle'></div>"
		var content = content + "</div>" //close psuedocontainer
		return(content)
}


function sortArray(order, origArray) {
	var nnn = []
	$.each(order, function(ind, val) {
		var shifted = 0
		$.each(origArray, function(i,v) {
			var url = v.url

			if (url == val && shifted==0) {
				nnn.unshift(v)
				shifted = 1
			}
		})
	})
	nnn = nnn.reverse()
	var newArray = nnn.concat(origArray)
	return newArray
}

function top_sites_callback(obj) {
	var newObj = obj.concat(extraSites['add'])
	var sOrder = extraSites['sortOrder']
	sortedObj = sortArray(sOrder, newObj)
	var main_contain = $('#main')
	$.each(sortedObj, function(key, val) {
		var url = val.url
		if (val.url) {
			var title = val.title
			var isSub = extraSites['sub'].indexOf(url)
			if (isSub != -1) {
				return
			}
			var assClass = handle_url(url, noshow) //should execute scrape as well
			//append url into content if there's no scraper 
			if (assClass == null) {
				var cleanURL = prettyURL(url)
				//make sure it's not too long
				leftOutLinks.push(cleanURL)
				//$('.mostVis .smallContainer .linkBox').append("<a class='bookmarkLink' href='"+url+"'><img src='"+favicon(url)+"'/>"+cleanURL+"</a>")
			} else {
				var newContent = newContainer(url,title,assClass)
				main_contain.append(newContent)
			}
		}
	})

}

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
	targetContainer.empty()
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






