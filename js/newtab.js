
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

function centerLinkBox(linkHolder, innerClass) {
	var $linkbox = linkHolder.find(innerClass)
	var linkBoxHeight = $linkbox.height()
	var outerBoxHeight = linkHolder.height()
	var topMargin = (outerBoxHeight - linkBoxHeight)/3
	$linkbox.css('margin-top', topMargin)
}


function top_sites_callback(obj) {
	var main_contain = $('#main')
	//create empty box for most visted links
	var linkHolder = newContainer('', 'Most Visited Links', 'mostVisitedLinks')
	main_contain.prepend(linkHolder)
	$('.mostVisitedLinks .smallContainer').append("<div class='linkBox'></div>")
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
			$('.mostVisitedLinks .smallContainer .linkBox').append("<div class='linkHolderLink'><a href='"+url+"'>"+cleanURL+"</a></div>")
		} else {
			var newContent = newContainer(url,title,assClass)
			main_contain.append(newContent)
		}
		
	})
	$('.mostVisitedLinks').find('.tttitle').text('Most Visited Links')
	//center linkBox
	centerLinkBox(linkHolder, '.linkBox')
	var bookMarks = newContainer('', 'Bookmarks', 'bookmarkBox')
	bookMarks.append("<div class='linkBox'></div>")
	bookMarks.find('.tttitle').text('Bookmarks')
	var $bookmarkLinks = bookMarks.find('.linkBox')
	
	chrome.bookmarks.getTree(function(obj) {
		$.each(obj[0].children, function(ind, val) {
			$bookmarkLinks.append("<div class='bookmarkCat'>Category: "+val.title+"</div>")
			//check if it's empty
			if (val.children.length > 0) {
				$.each(val.children, function(ind, v) {
					var title = ellipsify(v.title, 25)
					var url = v.url
				$bookmarkLinks.append("<a class='bookmarkLink' href='"+url+"'>"+title+"</a>")
				})

			}
			
		})
	})
	main_contain.append(bookMarks)

	var history = newContainer('','', 'historyBox')
	history.append("<div class='linkBox'></div>")
	history.find('.tttitle').text('Recently Visited')
	var $historyLinks = history.find('.linkBox')

	chrome.history.search({text: '', maxResults: 20}, function(data) {
    data.forEach(function(page) {
        $historyLinks.append("<a class='bookmarkLink' href='"+page.url+"'>"+ellipsify(page.title, 20)+"</a>")
    });
    main_contain.append(history)
    centerLinkBox(history, '.linkbox')
});
}

function onClickCallback() {
	var links = $('#main .smallContainer').find('a')
	var linkLength = links.length
	var randomNumber = Math.floor(Math.random()*linkLength)
	window.location.href = links[randomNumber]
}


$( document ).ready(function() {
	alreadyScraped = [] //make sure duplicate scrapes don't happen
   // chrome.topSites.get(top_sites_callback)
     top_sites_callback(test_sites)

    chrome.browserAction.onClicked.addListener(onClickCallback)
});