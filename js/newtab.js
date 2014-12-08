
//function for generic scrapers

function scrape(url, responseFunction, targetClass) {
	var client = new XMLHttpRequest();
	client.open("GET", url, true);
	client.onload = (function(response) {
		var target = response.currentTarget
	    if (target.readyState === 4) {
	    	response = target.response
	  		responseFunction(response, targetClass)
	    } else {
	  	  return 'fail'
	    }

	});
	client.send();
}




//function for filling container
function handle_url(url) {
	var pretty = prettyURL(url)
	var scraped = alreadyScraped.indexOf(pretty)
	alreadyScraped.push(pretty)
	if (scraped != -1) {
		return null
	} else if (scrapers.hasOwnProperty(pretty)) {
		var newClass = scrapers[pretty]['class']
		var blah = scrapers[pretty]['callback']
		scrape(url, blah, newClass)
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
	var content = "<div class='container "+conClass+"'><a class='tttitleLink' href='"+ url + "'><div class='tttitle'></div></a>"  //will be appended each loop into main container
	//var content = content "//close title div
	var content = content + "<div class='smallContainer'>"
	var content = content + "</div>" //close small container
	var content = content + "<div class='smallFoot'><span>&#8964;</span></div>"
	var content = content + "</div>" //close container div
	var $content = $(content)
	

	$content.children('.smallFoot').click(function() {
		var $parent = $(this).parents()

		$parent.toggleClass('tallContainer')
		$parent.children('.smallFoot').toggleClass('rotated')
	})
	return $content
}


function top_sites_callback(obj) {
	var main_contain = $('#main')
	//create empty box for most visted links
	var linkHolder = newContainer('', 'Most Visited Links', 'mostVisitedLinks')
	main_contain.prepend(linkHolder)
	$('.mostVisitedLinks .smallContainer').append("<div id='linkBox'></div>")
	//loop through each topsite and build container
	$.each(obj, function(key, val) {
		var url = val.url
		var title = val.title
		var assClass = handle_url(url) //should execute scrape as well

		//append url into content if there's no scraper 
		if (assClass == null) {
			var cleanURL = prettyURL(url)
			//make sure it's not too long
			var cleanURL = ellipsify(cleanURL, 20)
			$('.mostVisitedLinks .smallContainer #linkBox').append("<div class='linkHolderLink'><a href='"+url+"'>"+cleanURL+"</a></div>")
		} else {
			var newContent = newContainer(url,title,assClass)
			main_contain.append(newContent)
		}
		
	})
	$('.mostVisitedLinks').find('.tttitle').text('Most Visited Links')
	//center linkBox
	var $linkbox = linkHolder.find('#linkBox')
	var linkBoxHeight = $linkbox.height()
	var outerBoxHeight = linkHolder.height()
	var topMargin = (outerBoxHeight - linkBoxHeight)/4
	$linkbox.css('margin-top', topMargin)
}

function onClickCallback() {
	var links = $('#main .smallContainer').find('a')
	var linkLength = links.length
	var randomNumber = Math.floor(Math.random()*linkLength)
	window.location.href = links[randomNumber]
}


$( document ).ready(function() {
	alreadyScraped = [] //make sure duplicate scrapes don't happen
    chrome.topSites.get(top_sites_callback)
   // top_sites_callback(test_sites)

    chrome.browserAction.onClicked.addListener(onClickCallback)
});