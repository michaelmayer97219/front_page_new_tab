

var storage = chrome.storage.local;
var noshow = false
var alreadyScraped = []

$( document ).ready(function() {

	extraSites = {'add': [], 'sub': [], 'sortOrder': [], 'prodMode': null}//[{'title': 'blah', 'url': 'http://foxnews.com'}]
	var $body = $('#main')
	leftOutLinks = []
	//stretch main to window height at a minimum

	var windowHeight = $(window).height()
	$body.css('min-height', windowHeight)

	storage.get('selectedScrapes', function(result) {
		console.log(result)
		if (result['selectedScrapes']) {
			processInitiatorResult(result, extraSites)
   			if (result['selectedScrapes']['prodMode']) {
   				extraSites['prodMode'] = true
   				$('.menuOption').show()
				$('#prodMode i').css('color', 'rgba(230, 0, 0, 0.8);')
			} else {
				//top_sites_callback(test_sites)
				chrome.topSites.get(top_sites_callback)
				//extraSites['prodMode'] = false
			}
		} else {
			chrome.topSites.get(top_sites_callback)
		}

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
		var store = {}
		if (mode == true) {
			extraSites['prodMode'] = false
			store['selectedScrapes'] = extraSites
			storage.set(store, function() {

			})
		} else if (mode==null || mode ==false) {
			extraSites['prodMode'] = true
			store['selectedScrapes'] = extraSites
			storage.set(store, function() {

			})
		}
		location.reload()
	})



});






