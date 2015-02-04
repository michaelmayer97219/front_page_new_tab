

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
	console.log(extraSites)
	var sOrder = extraSites['sortOrder']
	sortedObj = sortArray(sOrder, newObj)
	var main_contain = $('#main')
	$.each(sortedObj, function(key, val) {
		var url = val.url
		if (val.url) {
			var title = val.title
			var isSub = extraSites['sub'].indexOf(url)
			console.log(url+' '+isSub)
			if (isSub != -1) {
				return
			}
			var assClass = handle_url(url) //should execute scrape as well
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


$( document ).ready(function() {

	extraSites = {'add': [], 'sub': [], 'sortOrder': [], 'prodMode': null}//[{'title': 'blah', 'url': 'http://foxnews.com'}]
	var $body = $('#main')
	leftOutLinks = []
	//stretch main to window height at a minimum

	var windowHeight = $(window).height()
	$body.css('min-height', windowHeight)

	storage.get('selectedScrapes', function(result) {
		if (result['selectedScrapes'] != undefined) {
			console.log(result)

	    	var res = result['selectedScrapes']['add']
	    	if (extraSites['add'].length > 0) {
	    		extraSites['add'] = extraSites['add'].concat(res)
	    	} else if (res.length > 0) {
	    		extraSites['add'] = res

	    	} else {

	    	}
	    	extraSites['sub'] = result['selectedScrapes']['sub']
	    	extraSites['sortOrder'] = result['selectedScrapes']['sortOrder']
   		}

	alreadyScraped = []

   		if (result['selectedScrapes']['prodMode']) {
   			extraSites['prodMode'] = true
   				$('.menuOption').show()
				$('#prodMode i').css('color', 'rgba(230, 0, 0, 0.8);')
			} else {
				chrome.topSites.get(top_sites_callback)
				extraSites['prodMode'] = false
			}
     //make sure duplicate scrapes don't happen
    	
    	//top_sites_callback(test_sites) //for testing comment out for prod

    })

   //when cursor hovers over add sites button, show an element which
   //will populate with collapsed versions of clients
   var $addBox = $('#addScrapeBox')
   var $addBoxCon = $('#addScrapeSlideable')
   ////Add sites code
   //create options for adding sites by using existing styles for containers

   $.each(non_scrapers, function(ind, val) {
   		var urlll = ind
   		var newBox = displayTTTitle(val.class, urlll)
   		$addBoxCon.append(newBox)
   	})

   $.each(scrapers, function(ind, val) {

   		var urlll = ind
   		var newBox = displayTTTitle(val.class, urlll)
   		$addBoxCon.append(newBox)
   	})




   //Sites for adding will already be in extraSites. 
   //Upon click, add new site to storeage of 'selectScraptes'
   
   //fix for bug breaking 'add sites' where 'title' disapearred 
   var activeContainer
   $('.psuedoContainer .tttitle').hover(function() {
   		activeContainer = $(this).attr('title')
   		//$(this).tooltip({content:activeContainer,tooltipClass: "custom-tooltip-styling"})
   })
   $('.psuedoContainer .tttitle').click(function() {
		//$this = $(this)
		
		var newURL = 'http://'+ activeContainer
		var oldURLs = []
		$.each(extraSites['add'], function(ind, val) {
			oldURLs.push(val.url)
		})

		$.each(extraSites['sub'], function(ind, val) {
				var site = val

				if (site == newURL) {
					extraSites['sub'].splice(ind, 1)
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

   	var highlightColor = 'rgba(230,0,0,0.8)'
	var origColor = $('.menuOption i').css('color')


   //button mechanics for optionbox
   var addInt  = 0 
   $addButton = $('#settingBox #add')
   $addButton.click(function() {
   		if (addInt == 0) {
   			$addBox.show()
   			$addButton.children('i').css('color', highlightColor)
   			addInt = 1
   		} else {
   			$addBox.hide()
   			$addButton.children('i').css('color', origColor)
   			addInt = 0
   		}
   })


	//For deleting storage for debugging purposes
	//	 var store = {}
	//	 				store['selectedScrapes'] = {'add':{}, 'sub':[], 'sortOrder':[]}
	//	 				storage.set(store, function() {
	//	 				console.log(store)
	//	 			})


		//will grab selected scrapes, when done add them to
		//extrasites which is used in top_sites_callback to 
		//create page containers



		//remove site code
	var remove = 0 //keep track of toggle action
	var $removeSites = $('#remove')
	var origCont = $removeSites.html()
	$removeSites.click(function() {
		console.log(extraSites)
		if (remove == 0) {
			$removeSites.attr('title', 'Done')
			$(".container").each(function(){
				var $this = $(this)
				$this.append("<div class='deleteIcon'><i class='fa fa-remove fa-2x'></div>")
			})
			$('.deleteIcon').click(function() {
				var $this = $(this)
				var $con = $this.parents('.container')
				$con.hide()
				var hideURL = $con.attr('title')
				extraSites['sub'].push(hideURL)

			})
			$removeSites.children('i').css('color', highlightColor)
			remove = 1
		} else {
			$removeSites.html(origCont)
			$removeSites.attr('title', 'Remove Sites')
			$('.deleteIcon').remove()
			var store = {}
			store['selectedScrapes'] = extraSites
			storage.set(store, function() {

			})
			$removeSites.children('i').css('color', origColor)
			remove  = 0 //reset
		}

		
	})


	//menu code
	$('.menuOption').tooltip({
		position: { my: "left+15 center", at: "right center" },
		show: { effect: "blind", duration: 50 }
	})



	$menu = $('#settingBox #menu')
	var menuIt = 0 //track clicks

	$menu.click(function() {
		if (menuIt == 0) {
			$menu.attr('title', 'Hide Options')
			$menu.siblings().show(100)	
			$menu.children('i').css('color', highlightColor)
			menuIt = 1
		} else {
			$menu.attr('title', 'Show Options')
			$menu.siblings().hide(100)
			$menu.children('i').css('color', origColor)
			menuIt = 0
		}
		
	})

	var $back = $('#settingBox #background')
	var $optbox = $('#settingBox .optionBox')
	var backIt = 0 //keep track of if it's been clicked
	$back.click(function() {
		if (backIt ==0) {
			$optbox.show(100)
			$back.children('i').css('color', highlightColor)
			backIt = 1
		} else {
			$optbox.hide(100)
			$back.attr('title', 'Change Background')
			$back.children('i').css('color', origColor)
			backIt = 0
		}
	})
	$('#main').click(function() {
		if (backIt == 1) {
			$optbox.hide(100)
			
			backIt = 0
		}

		if (addInt == 1) {
			$addBox.hide(100)
			addInt = 0
		}

	})

	var $options = $('#background .option')

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
	

	var $order = $('#settingBox #sort')
	var orderClick = 0 //keep track of toggle action
	$order.click(function() {
		if (orderClick == 0) {
			$('#main').sortable()
			$order.attr('title', 'Done')
			$order.children('i').css('color', highlightColor)
			orderClick = 1
			$('#main .container').hover(function() {

				$(this).css('cursor', 'move')
				$(this).children().css('cursor', 'move')
				$(this).children().children().css('cursor', 'move')
			})
		} else {

			$('#main .container').hover(function() {

				$(this).css('cursor', 'initial')
				$(this).children().css('cursor', 'initial')
				$(this).children().children().css('cursor', 'initial')
			})
			$('#main').sortable('disable')
			$order.attr('title', 'Change Order')
			$order.children('i').css('color', origColor)
			orderClick = 0
			sortArray = $('#main').sortable('toArray', {attribute: 'title'})
			var store = {}
			
			extraSites['sortOrder'] = sortArray
			store['selectedScrapes'] = extraSites
			storage.set(store, function() {

			})
		}
	})

	$prodMode = $('#prodMode').click(function() {
		var mode = extraSites['prodMode']
		console.log(extraSites)
		var store = {}
		if (mode == true) {
			extraSites['prodMode'] = false
			store['selectedScrapes'] = extraSites
			storage.set(store, function() {

			})
		} else if (mode==null || mode ==false) {
			extraSites['prodMode'] = true
			console.log(extraSites)
			store['selectedScrapes'] = extraSites
			storage.set(store, function() {

			})
		}
		location.reload()
	})

});






