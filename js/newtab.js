
//function for generic scrapers
var storage = chrome.storage.local;

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
		console.log('clean '+clean+'rURL '+cleanRespUrl)
		if (cleanRespUrl == clean) {
			
			if (target.readyState === 4) {

		    	if (target.status === 200) {
		    		var response = target.response
			    	var store = {}
			    	store[targetClass] = {'response': response,
											'time': now,
											'maxCache': maxCache
											}
			    	storage.set(store, function() {})
			  		responseFunction(response, targetClass)

		    	} else {

		    		responseFunction(cacheResponse, targetClass)
		    		
		    	}
		    	
		    } else {
		    	alert('fail')
		  	  return 'fail'
		    }
		}
	    

	});
	client.send();
}

function scrape(url, responseFunction, targetClass, maxCache) {

	var time = new Date()
	var now = Date.now(time)
	var prevResponse = storage.get(targetClass, function(result) {
		var isCached = result.hasOwnProperty(targetClass)
		
		if(isCached) {

			var prevTime = result[targetClass]['time']
			var cacheResponse = result[targetClass]['response']
			
			var diff = now - prevTime
			var overCache = diff < maxCache
			if (overCache) {
				responseFunction(cacheResponse, targetClass)
				
			} else {
				ajaxCall(url, responseFunction, targetClass, maxCache, now)
			}
			
		} else {
			ajaxCall(url, responseFunction, targetClass, maxCache)
			
		}

		
	})

	

	
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
		var maxCache = scrapers[pretty]['maxCache']
		scrape(url, blah, newClass, maxCache)
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
		var $smallCon = $(this).siblings('.smallContainer')
		console.log($smallCon.attr('class'))
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

function centerLinkBox(linkHolder, innerClass) {
	var $linkbox = linkHolder.find(innerClass)
	var linkBoxHeight = $linkbox.height()
	var outerBoxHeight = linkHolder.height()
	var topMargin = (outerBoxHeight - linkBoxHeight)/100
	$linkbox.css('margin-top', topMargin)
}


function top_sites_callback(obj) {
	var newObj = obj.concat(extraSites['add'])
	var main_contain = $('#main')
	//create empty box for most visted links
	var linkHolder = newContainer('', 'Most Visited Links', 'mostVisitedLinks')
	main_contain.prepend(linkHolder)
	$('.mostVisitedLinks .smallContainer').append("<div class='linkBox'></div>")
	//loop through each topsite and build container
	$.each(newObj, function(key, val) {

		
		var url = val.url
		var title = val.title

		var isSub = extraSites['sub'].indexOf(url)
		if (isSub != -1) {
			return
		}
		var assClass = handle_url(url) //should execute scrape as well
		
		//append url into content if there's no scraper 
		if (assClass == null) {
			var cleanURL = prettyURL(url)
			//make sure it's not too long
			var cleanURL = ellipsify(cleanURL, 16)
			$('.mostVisitedLinks .smallContainer .linkBox').append("<a class='bookmarkLink' href='"+url+"'><img src='"+favicon(url)+"'/>"+cleanURL+"</a>")
		} else {
			var newContent = newContainer(url,title,assClass)
			main_contain.append(newContent)
		}
		
	})
	$('.mostVisitedLinks').find('.tttitle').text('Most Visited Links')
	//center linkBox
	//centerLinkBox(linkHolder, '.linkBox')

	var bookMarks = newContainer('', 'Bookmarks', 'bookmarkBox')
	bookMarks.append("<div class='linkBox'></div>")
	bookMarks.find('.tttitle').text('Bookmarks')
	var $bookmarkLinks = bookMarks.find('.linkBox')
	chrome.bookmarks.getTree(function(obj) {
		var used = 0 //iterator to keep track of how many bookmarks displayed
		$.each(obj[0].children, function(ind, val) {
			//$bookmarkLinks.append("<div class='bookmarkCat'>Category: "+val.title+"</div>")
			//check if it's empty
			if (val.children.length > 0) {
				$.each(val.children, function(ind, v) {
					if (used < 17) {
						var title = ellipsify(v.title, 16)
						var url = v.url
						$bookmarkLinks.append("<a class='bookmarkLink' href='"+url+"'><img src='"+favicon(url)+"'/>"+title+"</a>")
						used = used +1
						//alert(used)
					}
				})

			}
			
		})
	})
	main_contain.append(bookMarks)

	var history = newContainer('','', 'historyBox')
	history.append("<div class='linkBox'></div>")
	history.find('.tttitle').text('Recently Visited')
	var $historyLinks = history.find('.linkBox')

	chrome.history.search({text: '', maxResults: 30}, function(data) {
		var i = 0 //iterator for total number of links
	    data.forEach(function(page) {
	    	if (page.title && i < 17) {
	    		$historyLinks.append("<a class='bookmarkLink' href='"+page.url+"'><img src='"+favicon(page.url)+"'/>"+ellipsify(page.title, 16)+"</a>")
	    		i++
	    	}	        
	    });
	    main_contain.append(history)    
	});

	footerfix()

 	//$('#main').sortable()	
}


$( document ).ready(function() {

	extraSites = {'add': [], 'sub': []}//[{'title': 'blah', 'url': 'http://foxnews.com'}]
	var $body = $('body')
	var $options = $('.option')

	//Code for background image
	var defaultBackImage = 'none' //this has to change
	storage.get('backImg', function(result) {
		var backImg = result['backImg']
		defaultBackImage = backImg
		$body.css('background-image', backImg)
	})
	$options.click(function() {
		var $this = $(this)
		var backImg = $this.css('background-image')
		defaultBackImage = backImg
		$body.css('background-image', defaultBackImage)
		var store = {}
		store['backImg'] = backImg
		storage.set(store, function() {

		})
	})
	$options.hover(function() {
    		var backImg = $(this).css('background-image')
    		$body.css('background-image', backImg)
    	}, function() {
    		$body.css('background-image', defaultBackImage)
    	})

    $('.bottomButton').hover(function(){
    	$(this).find('.optionBox').show(100)
    }, function() {
    	$(this).find('.optionBox').hide(100)
    }) 

    //footer is dynmically determined when page is not tall enough
   $(window).resize(function() {
   		footerfix()
   })



   //when cursor hovers over add sites button, show an element which
   //will populate with collapsed versions of clients
   var $addBox = $('#addScrapeBox')
   var $addBoxCon = $('#addScrapeSlideable')


   ////Add sites code
   //create options for adding sites by using existing styles for containers
 // var testers = [] //to create array for testing scrapers
   $.each(scrapers, function(ind, val) {
   		var urlll = ind
   		var newBox = displayTTTitle(val.class, urlll)
   		$addBoxCon.append(newBox)

   		//test purposes
   		//testers.push({'title': '','url': 'http://'+urlll})

   	})
  	//console.log(JSON.stringify(testers)) //for testing

   //Sites for adding will already be in extraSites. 
   //Upon click, add new site to storeage of 'selectScraptes'
   $('.psuedoContainer .tttitle').click(function() {
		$this = $(this)
		var newURL = 'http://'+$this.attr('title')
		var oldURLs = []
		$.each(extraSites['add'], function(ind, val) {
			oldURLs.push(val.url)
		})

		$.each(extraSites['sub'], function(ind, val) {
				var site = val
				console.log(val)
				if (site == newURL) {
					extraSites['sub'].splice(ind, 1)
					console.log(extraSites)
					var store = {}
					store['selectedScrapes'] = extraSites
						storage.set(store, function() {

					})
					location.reload()
				}
		})

		if (oldURLs.indexOf(newURL) == -1) {
			extraSites['add'].push({'title':newURL, 'url':newURL})
			//check to see if sites is in 'sub' list
			//construct new list each time


			var store = {}
			store['selectedScrapes'] = extraSites
			storage.set(store, function() {

			})
			location.reload()
		} else { //if (selectScrap.indexOf(newURL) == -1) {

			}
   	})


   //button mechanics for optionbox
   $('#addScrapers').hover(function() {
   		$addBox.show()
   }, function() {
   		$addBox.hide()
   })


/////For deleting storage for debugging purposes
	// var store = {}
	// 				store['selectedScrapes'] = {'add':{}, 'sub':[]}
	// 				storage.set(store, function() {
	// 				console.log(store)
	// 			})


	//will grab selected scrapes, when done add them to
	//extrasites which is used in top_sites_callback to 
	//create page containers
	storage.get('selectedScrapes', function(result) {
		console.log(result)

    	var res = result['selectedScrapes']['add']
    	if (extraSites['add'].length > 0) {
    		extraSites['add'] = extraSites['add'].concat(res)
    	} else if (res.length > 0) {
    		extraSites['add'] = res

    	} else {

    	}
    	extraSites['sub'] = result['selectedScrapes']['sub']
    	alreadyScraped = [] //make sure duplicate scrapes don't happen
    	chrome.topSites.get(top_sites_callback)
    	//top_sites_callback(test_sites) //for testing comment out for prod

    })

	
	//remove site code
	var remove = 0 //keep track of toggle action
	var $removeSites = $('#removeSites')
	var origColor = $removeSites.css('color')
	$removeSites.click(function() {
		if (remove == 0) {
			$removeSites.text('Done').css('color', '#f33')
			$removeSites.css('font-weight', 'bold')
			$('.container').each(function(){
				var $this = $(this)
				$this.append("<div class='deleteIcon'>"
					+"<img src='../images/x-mark.png'</img></div>")
			})
			$('.deleteIcon').click(function() {
				var $this = $(this)
				var $con = $this.parents('.container')
				$con.hide()
				var hideURL = $con.children('.tttitleLink').attr('href')
				extraSites['sub'].push(hideURL)

			})
			remove = 1
		} else {
			$removeSites.text('Remove Sites').css('color', origColor)
			$removeSites.css('font-weight', '400')
			$('.deleteIcon').remove()
			var store = {}
			store['selectedScrapes'] = extraSites
			storage.set(store, function() {

			})

			remove  = 0 //reset
		}

		
	})

});