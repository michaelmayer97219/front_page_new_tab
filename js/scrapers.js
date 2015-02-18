var defaultCache = 1200000

//list of scrapers
scrapers = {
	"news.ycombinator.com": 
		{'callback': hackerNewsResponse,
		'class': 'hackerNews',
		'maxCache': defaultCache},

	"twitter.com": 
		{'callback': twitter,
		'class': 'twitter',
		'maxCache': defaultCache},
	"theatlantic.com":
		{'callback': theAtlantic,
		'class': 'theAtlantic',
		'maxCache': defaultCache},
	"reddit.com": 
		{'callback': reddit,
		'class': 'reddit',
		'maxCache': defaultCache},
	"qz.com": 
		{'callback': quartz,
		'class': 'qz',
		'maxCache': defaultCache},
	"nytimes.com": 
		{'callback': nytimes,
		'class': 'nytimes',
		'maxCache': defaultCache},
	"espn.go.com": 
		{'callback': espn,
		'class': 'espn',
		'maxCache': defaultCache},
	"huffingtonpost.com": 
		{'callback': huffpo,
		'class': 'huffpo',
		'maxCache': defaultCache},
	"cnn.com":
		{'callback': cnn,
		'class': 'cnn',
		'maxCache': defaultCache},
	"buzzfeed.com":
		{'callback':buzzfeed,
		'class': 'buzzfeed',
		'maxCache': defaultCache},
	"news.google.com":
		{'callback':googleNews,
		'class': 'googleNews',
		'maxCache': defaultCache},
	"foxnews.com":
		{'callback':foxnews,
		'class': 'foxnews',
		'maxCache': defaultCache},
	"washingtonpost.com":
		{'callback':wapo,
		'class': 'wapo',
		'maxCache': defaultCache},
	"theguardian.com":
		{'callback': guardian,
		'class': 'theguardian',
		'maxCache': defaultCache},
	"bbc.com":
		{'callback':bbc,
		'class': 'bbc',
		'maxCache': defaultCache},
	"time.com":
		{'callback': time,
		'class': 'time',
		'maxCache': defaultCache},
	"producthunt.com":
		{'callback':pHunt,
		'class': 'pHunt',
		'maxCache': defaultCache},
	"bloomberg.com":
		{'callback': bloomberg,
		'class': 'bloomberg',
		'maxCache': defaultCache},
	"wsj.com":
		{'callback': wsj,
		'class': 'wsj',
		'maxCache': defaultCache},
	"online.wsj.com":
		{'callback': wsj,
		'class': 'wsj',
		'maxCache': defaultCache},
	"cnbc.com":
		{'callback': cnbc,
		'class': 'cnbc',
		'maxCache': defaultCache},
	"hollywoodreporter.com":
		{'callback': hreporter,
		'class': 'hreporter',
		'maxCache': defaultCache},
	"usatoday.com":
		{'callback': usatoday,
		'class': 'usatoday',
		'maxCache': defaultCache},
	"gizmodo.com":
		{'callback': gizmodo,
		'class': 'gizmodo',
		'maxCache': defaultCache},
	"bleacherreport.com":
		{'callback': bleacher,
		'class': 'bleacher',
		'maxCache': defaultCache},
	"ign.com":
		{'callback': ign,
		'class': 'ign',
		'maxCache': defaultCache},
	"cbssports.com":
		{'callback': cbssports,
		'class': 'cbssports',
		'maxCache': defaultCache},
	"engadget.com":
		{'callback': engadget,
		'class': 'engadget',
		'maxCache': defaultCache},
	"tmz.com":
		{'callback': tmz,
		'class': 'tmz',
		'maxCache': defaultCache},
	"mashable.com":
		{'callback': mashable,
		'class': 'mashable',
		'maxCache': defaultCache},
	"npr.org":
		{'callback': npr,
		'class': 'npr',
		'maxCache': defaultCache},
	"theverge.com":
		{'callback':verge,
		'class': 'verge',
		'maxCache': defaultCache},
	"drudgereport.com":
		{'callback': drudge,
		'class': 'drudge',
		'maxCache': defaultCache},
	"slate.com":
		{'callback': slate,
		'class': 'slate',
		'maxCache': defaultCache},
	"deadspin.com":
		{'callback': deadspin,
		'class': 'deadspin',
		'maxCache': defaultCache},
	"techcrunch.com":
		{'callback': tcrunch,
		'class': 'tcrunch',
		'maxCache': defaultCache},
	"vice.com":
		{'callback': vice,
		'class': 'vice',
		'maxCache': defaultCache},
	"arstechnica.com":
		{'callback': arstech,
		'class': 'arstech',
		'maxCache': defaultCache},
	"medium.com":
		{'callback': medium,
		'class': 'medium',
		'maxCache': defaultCache},
	"businessinsider.com":
		{'callback': bizinsider,
		'class': 'bizinsider',
		'maxCache': defaultCache},
	"aeon.co":
		{'callback': aeon,
		'class': 'aeon',
		'maxCache': defaultCache},
	"variety.com":
		{'callback': variety,
		'class': 'variety',
		'maxCache': defaultCache},
	"economist.com":
		{'callback': economist,
		'class': 'economist',
		'maxCache': defaultCache},
	"nymag.com":
		{'callback': nymag,
		'class': 'nymag',
		'maxCache': defaultCache},
	"rollingstone.com":
		{'callback': rstone,
		'class': 'rstone',
		'maxCache': defaultCache},
	"technologyreview.com":
		{'callback': techreview,
		'class': 'techreview',
		'maxCache': defaultCache},
	"sfgate.com":
		{'callback': sfgate,
		'class': 'sfgate',
		'maxCache': defaultCache},
	"ft.com":
		{'callback': ft,
		'class': 'ft',
		'maxCache': defaultCache},
	"latimes.com":
		{'callback': latimes,
		'class': 'latimes',
		'maxCache': defaultCache},
	"nypost.com":
		{'callback': nypost,
		'class': 'nypost',
		'maxCache': defaultCache},
	"newyorker.com":
		{'callback': newyorker,
		'class': 'newyorker',
		'maxCache': defaultCache},
	"newsweek.com":
		{'callback': newsweek,
		'class': 'newsweek',
		'maxCache': defaultCache},
	"thedailybeast.com":
		{'callback':dailybeast,
		'class': 'dailybeast',
		'maxCache': defaultCache},
	"wired.com": 
		{'callback': wired,
		'class': 'wired',
		'maxCache': defaultCache},
	"forbes.com":
		{'callback': forbes,
		'class': 'forbes',
		'maxCache': defaultCache},
	"rottentomatoes.com":
		{'callback': rtomatoes,
		'class': 'rtomatoes',
		'maxCache': defaultCache},
	"chicagotribune.com":
		{'callback': ctribune,
		'class': 'ctribune',
		'maxCache': defaultCache},
	"philly.com":
		{'callback': philly,
		'class': 'philly',
		'maxCache': defaultCache},
	"adweek.com":
		{'callback': adweek,
		'class': 'adweek',
		'maxCache': defaultCache},
	"vox.com":
		{'callback': vox,
		'class': 'vox',
		'maxCache': defaultCache},
	"politico.com":
		{'callback': politico,
		'class': 'politico',
		'maxCache': defaultCache},
	"fivethirtyeight.com":
		{'callback': fiveThirtyEight,
		'class': 'fiveThirtyEight',
		'maxCache': defaultCache},
	"reuters.com":
		{'callback': reuters,
		'class': 'reuters',
		'maxCache': defaultCache},
	"abcnews.go.com":
		{'callback': abcnews,
		'class': 'abcnews',
		'maxCache': defaultCache},
	"nbcnews.com":
		{'callback': nbcnews,
		'class': 'nbcnews',
		'maxCache': defaultCache},
	"breitbart.com":
		{'callback': breitbart,
		'class': 'breitbart',
		'maxCache': defaultCache},
	"groupon.com":
		{'callback': groupon,
		'class': 'groupon',
		'maxCache': defaultCache},
	"dailymail.co.uk":
		{'callback': dailymail,
		'class': "dailymail",
		'maxCache': defaultCache},
	"emgn.com":
		{'callback': emgn,
		'class': "emgn",
		'maxCache': defaultCache},
	"sbnation.com":
		{'callback': sbnation,
		'class': "sbnation",
		'maxCache': defaultCache},
	"cracked.com":
		{'callback': cracked,
		'class': "cracked",
		'maxCache': defaultCache},
	"telegraph.co.uk":
		{'callback': telegraph,
		'class': "telegraph",
		'maxCache': defaultCache},
	"marketwatch.com":
		{'callback': marketwatch,
		'class': "marketwatch",
		'maxCache': defaultCache},
	"elitedaily.com":
		{'callback': elitedaily,
		'class': "elitedaily",
		'maxCache': defaultCache},
	"denverpost.com":
		{'callback': denverpost,
		'class': 'denverpost',
		'maxCache': defaultCache},
	"seattletimes.com":
		{'callback': seattletimes,
		'class': 'seattletimes',
		'maxCache': defaultCache},
	"mercurynews.com":
		{'callback': mercurynews,
		'class': 'mercurynews',
		'maxCache': defaultCache},
	"dallasnews.com":
		{'callback': dallasnews,
		'class': 'dallasnews',
		'maxCache': defaultCache},
	"techmeme.com":
		{'callback': techmeme,
		'class': 'techmeme',
		'maxCache': defaultCache},
	"mentalfloss.com":
		{'callback': mentalfloss,
		'class': 'mentalfloss',
		'maxCache': defaultCache},
	"accountingtoday.com":
		{'callback': accountingtoday,
		'class': 'accountingtoday',
		'maxCache': defaultCache},
	"accountingweb.com":
		{'callback': accountingweb,
		'class': 'accountingweb',
		'maxCache': defaultCache*5},
	"blazersedge.com":
		{'callback': blazersEdge,
		'class': 'blazersEdge',
		'maxCache': defaultCache},
	"nj.com":
		{'callback': nj,
		'class': 'nj',
		'maxCache': defaultCache},
	"oregonlive.com":
		{'callback':oLive,
		'class': 'oLive',
		'maxCache': defaultCache},
	"feedly.com":
		{'callback':feedly,
		'class': 'feedly',
		'maxCache': defaultCache}
}

non_scrapers =  {
	"history_box":
		{'callback':history_box,
		'class': 'historyBox'},
	"most_visited":
		{'class': 'mostVis',
		'callback': mostVis},
	"bookmark_box":
		{'class': 'bookmarkBox',
		'callback': bookmark_box}
}

function bookmark_box(targetClass) {
	var bookMarks = $('.'+targetClass)
	bookMarks.children('.smallContainer').append("<div class='linkBox'></div>")
	var $bookmarkLinks = bookMarks.find('.linkBox')
	chrome.bookmarks.getTree(function(obj) {
		console.log(obj)
		
		function handleFolder (fold) {
			console.log('fold')
			var title = fold.title
			var id = fold.id
			$bookmarkLinks.append("<div class='bookFold book"+id+"'>"+
				"<div class='bookFoldTitle'>"+title+"</div>"+
				"</div>")
			$bookmarkLinks = $('.bookFold').last()
			$.each(fold.children, function(ind, val) {
				console.log('trav from folder')
				traverseBookmarks(val)
			})
		}

		function handleBook (book) {
			console.log('book')
			console.log(book)
			var url = book.url
			var title = book.title
			var parentId = book.parentId
			console.log(parentId)
			var $lastFold = $('.linkBox').find('.book'+parentId)
			$lastFold.append("<a class='bookmarkLink' href='"+url+"'><img src='"+favicon(url)+"'/>"+title+"</a>")

		}

		function traverseBookmarks (thing) {
			//console.log('traverse')
			//console.log(thing)
			var isBook = thing.url
			var isFolder = thing['dateGroupModified'] 
			var isNeither = isBook || isFolder
			if (isBook) {
				handleBook(thing)
			} else if (isFolder) {
				handleFolder(thing)
			} else {
				$.each(thing, function(ind, val) {
					console.log(val)
					traverseBookmarks(val)
				})
			}
		}

		traverseBookmarks(obj[0])

		/*
		var used = 0 //iterator to keep track of how many bookmarks displayed
		$.each(obj[0].children, function(ind, val) {
			if (val.children.length > 0) {
				$.each(val.children, function(ind, v) {
					var title = v.title
					var url = v.url
					
						$bookmarkLinks.append("<a class='bookmarkLink' href='"+url+"'><img src='"+favicon(url)+"'/>"+title+"</a>")
						used = used +1
					
					
				})
			} 
		})

*/
	})

	var bookContent = $bookmarkLinks.val()

	if (bookContent.length == 0) {
		$bookmarkLinks.find('.smallContainer').val('No bookmarks to add.')
		
	}
}

function history_box(targetClass) {
	var	history = $('.'+targetClass)
	history.children('.smallContainer').append("<div class='linkBox'></div>")
	var $historyLinks = history.find('.linkBox')

	chrome.history.search({text: '', maxResults: 30}, function(data) {
		var i = 0 //iterator for total number of links
	    data.forEach(function(page) {
	    	if (page.title && i < 17) {
	    		$historyLinks.append("<a class='bookmarkLink' href='"+page.url+"'><img src='"+favicon(page.url)+"'/>"+page.title+"</a>")
	    		i++
	    	}	        
	    });
	   // main_contain.append(history) 
	});
}

function mostVis(targetClass) {
	var $box = $('.'+targetClass)
	$box.children('.smallContainer').append("<div class='linkBox'></div>")
	var $linkBox = $box.find('.linkBox')
	$.each(leftOutLinks, function(ind, val) {
		if (val) {
			$linkBox.append("<a class='bookmarkLink' href='"+val+"'><img src='"+favicon(val)+"'/>"+val+"</a>")
		}
	})

}

function feedly(response, targetClass) {
	console.log(response)
	basicScrape(resonse, targetClass, 'a', 10)
}

function oLive(response, targetClass) {
	basicScrape(response, targetClass, '.tcp-item h2 a', 30)
	basicScrape(response, targetClass, '.tcp-item h3 a', 20)
	basicScrape(response, targetClass, '.item-text .h2 a', 20)

}

function pHunt(response, targetClass) {
	basicScrape(response, targetClass, '.day:nth-child(1) .post--content', 40)
	universalLinkFix(targetClass, 'http://www.producthunt.com')
}

function nj(response, targetClass) {
	basicScrape(response, targetClass, '.tcp-item h2 a', 30)
	basicScrape(response, targetClass, '.tcp-item h3 a', 20)
	basicScrape(response, targetClass, '.item-text .h2 a', 10)
	unlinkStyle(targetClass)
}

function accountingweb(response, targetClass) {
	basicScrape(response, targetClass, '.views-row', 20)
}

function accountingtoday(response, targetClass) {
	basicScrape(response, targetClass, '.tabcontent', 20)
	basicScrape(response, targetClass, '.hentry', 20)
	universalLinkFix(targetClass, 'http://www.accountingtoday.com')
}

function mentalfloss(response, targetClass) {
	basicScrape(response, targetClass, '.views-content-field-rich-title a', 5)
	basicScrape(response, targetClass, '.views-row h3 a', 20)
	basicScrape(response, targetClass, '.views-field h1 > a', 20)
	removeDupeLinks(targetClass)

	unlinkStyle(targetClass)
	universalLinkFix(targetClass, 'http://mentalfloss.com')
}

function techmeme(response, targetClass) {
	basicScrape(response, targetClass, '.item', 30)
	$('.ii').each(function(ind, val) {
		$(this).hide()
		var hLink = $(val).find('a')
		$(this).parent().append(hLink)
	})
}

function dallasnews(response, targetClass) {
	basicScrape(response, targetClass, '.article a', 30)
	unlinkStyle(targetClass)
}

function mercurynews(response, targetClass) {
	basicScrape(response, targetClass, '.layout5FeatureItemBox a', 20)
	basicScrape(response, targetClass, '.complexListingBox a', 20)
	unlinkStyle(targetClass)
}

function seattletimes(response, targetClass) {
	basicScrape(response, targetClass, '.hed5 a', 10)
	basicScrape(response, targetClass, '.hed4 a', 10)
	basicScrape(response, targetClass, '.hed3 a', 10)
	basicScrape(response, targetClass, '.hed2 a', 10)
	basicScrape(response, targetClass, '.hed1 a', 10)
	unlinkStyle(targetClass)
	universalLinkFix(targetClass, 'http://seattletimes.com')
}

function denverpost(response, targetClass) {
	basicScrape(response, targetClass, '.listingItemTitle', 30),
	unlinkStyle(targetClass)
}

function elitedaily(response, targetClass) {
	$content = $.parseHTML(response)
	basicScrape($content, targetClass, '.post-header a', 30)
	unlinkStyle(targetClass)
}

function marketwatch(response, targetClass) {
	$content = $.parseHTML(response)
	basicScrape($content, targetClass, '.Headline5', 20)
	basicScrape($content, targetClass, '.Headline4', 20)
	basicScrape($content, targetClass, '.Headline3', 20)
	unlinkStyle(targetClass)
	universalLinkFix(targetClass, 'http://marketwatch.com')
}

function telegraph(response, targetClass) {
	basicScrape(response, targetClass, '.summary h3 a', 30)
	unlinkStyle(targetClass)
}

function cracked(response, targetClass) {
	basicScrape(response, targetClass, '.metaInfo h3 a', 30)
	basicScrape(response, targetClass, '.meta h3 a', 30)
	unlinkStyle(targetClass)
}

function sbnation(response, targetClass) {
	basicScrape(response, targetClass, 'header h2 a', 40)
	basicScrape(response, targetClass, 'header h3 a', 40)
	removeDupeLinks(targetClass)
	unlinkStyle(targetClass)

}

function emgn(response, targetClass) {
	basicScrape(response, targetClass, '.panel-inner h2 a', 30)
	unlinkStyle(targetClass)
}


function dailymail(response, targetClass) {
	basicScrape(response, targetClass, '.linkro-darkred a', 30)
	unlinkStyle(targetClass)
	universalLinkFix(targetClass, 'http://dailymail.co.uk')
}

function groupon(response, targetClass) {
	basicScrape(response, targetClass, '.deal-card', 30)
	//universalLinkFix(targetClass, 'http://groupon.com/')
	unlinkStyle(targetClass)
}

function breitbart(response, targetClass) {

	$content = $.parseHTML(response)
	basicScrape($content, targetClass, '.title a', 30)
	unlinkStyle(targetClass)
	universalLinkFix(targetClass, 'http://www.breitbart.com')
}

function nbcnews(response, targetClass) {
	basicScrape(response, targetClass, '.panel-txt a', 1)
	basicScrape(response, targetClass, '.media-body > a', 30)
	unlinkStyle(targetClass)
	unHeaderStyle(targetClass)

}

function abcnews(response, targetClass) {
	basicScrape(response, targetClass, '.carousel-content .hero_item_meta a', 30)
	basicScrape(response, targetClass, '.ffl_obj div:nth-child(2) a', 60)
	unHeaderStyle(targetClass)
	unlinkStyle(targetClass)
	universalLinkFix(targetClass, 'http://abcnews.com')
}

function reuters(response, targetClass) {
	basicScrape(response, targetClass, '.module h2 a', 20)
	basicScrape(response, targetClass, '.module li a', 20)
	unlinkStyle(targetClass)
	universalLinkFix(targetClass, 'http://reuters.com')
}

function politico(response, targetClass) {
	basicScrape(response, targetClass, '.story-frag .summary header', 30)
	unHeaderStyle(targetClass)
	unlinkStyle(targetClass)
}

function vox(response, targetClass) {

	basicScrape(response, targetClass, '.article a', 30)
	//basicScrape(response, targetClass, '.m-hp-latest__list-container', 20)
	//basicScrape(response, targetClass, '.m-hp-beat__first-entry', 20)
	unlinkStyle(targetClass)
}

function adweek(response, targetClass) {
	basicScrape(response, targetClass, '.story-header', 30)
	universalLinkFix(targetClass, 'http://adweek.com')
}

function philly(response, targetClass) {
	var $content = $.parseHTML(response)
	basicScrape($content, targetClass, '.headlineWrap a', 30)
	unlinkStyle(targetClass)
}

function ctribune(response, targetClass) {
	basicScrape(response, targetClass, '.trb_outfit_primaryItem_article_title a', 10)
	basicScrape(response, targetClass, '.trb_outfit_relatedListTitle a', 20)
	unlinkStyle(targetClass)
	universalLinkFix(targetClass, 'http://chicagotribune.com')
}

function rtomatoes(response, targetClass) {
	var content = $.parseHTML(response)
	basicScrape(content, targetClass, '#homepage-opening-this-week', 1)
	basicScrape(content, targetClass, '#homepage-top-box-office', 1)
	basicScrape(content, targetClass, '#homepage-top-coming-soon', 1)
	unHeaderStyle(targetClass)
	unlinkStyle(targetClass)
	universalLinkFix(targetClass, 'http://rottentomatoes.com')
}

function forbes(response, targetClass) {
	var content = $.parseHTML(response)
	basicScrape(content, targetClass, '.editable a', 30)
	unlinkStyle(targetClass)
}

function wired(response, targetClass) {
	basicScrape(response, targetClass, '.headline', 30)
	unHeaderStyle(targetClass)
	unlinkStyle(targetClass)
	$('.'+targetClass).find('h5').each(function(ind) {
		var $this = $(this)
		var text = $this.text()
		$this.text(text.toUpperCase())
		$this.css('font-size', '0.8em')
	})
}

function dailybeast(response, targetClass) {
	basicScrape(response, targetClass, '.cheats .cheat', 30)
	unlinkStyle(targetClass)
	unHeaderStyle(targetClass)
	fixRelativeLinks(targetClass, 'http://dailybeast.com', 'a')
	
}

function newsweek(response, targetClass) {
	basicScrape(response, targetClass, '.hf-info', 30)
	unHeaderStyle(targetClass)
	unlinkStyle(targetClass)
	universalLinkFix(targetClass, 'http://newsweek.com')
}

function newyorker(response, targetClass) {
	basicScrape(response, targetClass, 'section section', 30)
	unlinkStyle(targetClass)
	//allcap headers
	$('.'+targetClass).find('.smallContainer a').each(function(ind) {
		var $this = $(this)
		var $text = $this.text()
		var NEWTEXT = $text.toUpperCase($text)
		$this.text(NEWTEXT)
	})
	unHeaderStyle(targetClass)
}

function ft(response, targetClass) {
	var $html = $.parseHTML(response)
	basicScrape($html, targetClass, '.article', 30)
	unlinkStyle(targetClass)
	unHeaderStyle(targetClass)
	colorate(targetClass, '#F6E9D8', false)
}

function sfgate(response, targetClass) {
	var $html = $.parseHTML(response)
	basicScrape($html, targetClass, '.caption a', 25)
	unlinkStyle(targetClass)
}
function latimes(response, targetClass) {
	basicScrape(response, targetClass, '.trb_outfit_featuredArticleTitle', 1)
	basicScrape(response, targetClass, '.trb_outfit_list_headline_a', 5)
	basicScrape(response, targetClass, '.trb_outfit_relatedListTitle', 20)
	universalLinkFix(targetClass, 'http://latimes.com')
	unlinkStyle(targetClass)
}
function nypost(response, targetClass) {
	basicScrape(response, targetClass, 'article > h3 > a', 30)
	unlinkStyle(targetClass)
}

function techreview(response, targetClass) {
	basicScrape(response, targetClass, '.top-stories-list a', 20)
	basicScrape(response, targetClass, '.articles-list li a', 20)
	unlinkStyle(targetClass)
	unHeaderStyle(targetClass)
	universalLinkFix(targetClass, 'http://technologyreview.com')
}

function rstone(response, targetClass) {
	var $html = $.parseHTML(response)
	basicScrape($html, targetClass, '.lead-link', 3)
	basicScrape($html, targetClass, '.rs-picks .rs-pick a', 120)
	unlinkStyle(targetClass)
	unHeaderStyle(targetClass)
	universalLinkFix(targetClass, 'http://rollingstone.com')
}

function nymag(response, targetClass) {
	basicScrape(response, targetClass, 'article .ledeLink', 20)
	basicScrape(response, targetClass, '.feedLink', 20)
	unlinkStyle(targetClass)
}

function economist(response, targetClass) {
	basicScrape(response, targetClass, '.hero-tab', 20)
	basicScrape(response, targetClass, 'article', 20)
	unlinkStyle(targetClass)
	universalLinkFix(targetClass, 'http://economist.com')
}

function variety(response, targetClass) {
	basicScrape(response, targetClass, '.slide a', 10)
	basicScrape(response, targetClass, '.story a', 40)
	unlinkStyle(targetClass)
}

function aeon(response, targetClass) {
	basicScrape(response, targetClass, '.panel', 30)
	unlinkStyle(targetClass)
}

function bizinsider(response, targetClass) {
	basicScrape(response, targetClass, '.title', 30)
	unlinkStyle(targetClass)
	colorate(targetClass, '#2E5262', true)
}

function medium(response, targetClass) {
	basicScrape(response, targetClass, '.block-title a', 30)
	universalLinkFix(targetClass, 'http://medium.com')
	unlinkStyle(targetClass)
}

function arstech(response, targetClass) {
	basicScrape(response, targetClass, 'article .heading a', 20)
	basicScrape(response, targetClass, '.top-stories li a', 30)
	unlinkStyle(targetClass)
}

function vice(response, targetClass) {
	var $html = $.parseHTML(response)
	basicScrape($html, targetClass, '.item-title a', 30)
	unlinkStyle(targetClass)
	universalLinkFix(targetClass, 'http://vice.com')
}

function tcrunch(response, targetClass) {
	basicScrape(response, targetClass, '.plain-feature a', 1)
	basicScrape(response, targetClass, '.plain-item a', 10)
	basicScrape(response, targetClass, '.post-title a', 20)
	unlinkStyle(targetClass)
}

function deadspin(response, targetClass) {
		var $html = $.parseHTML(response)
	basicScrape($html, targetClass, '.entry-title a', 30)
	unlinkStyle(targetClass)
}

function slate(response, targetClass) {
	var $html = $.parseHTML(response)
	basicScrape($html, targetClass, '.popular li a', 10)
	basicScrape($html, targetClass, '.mostshared li a', 10)
	basicScrape($html, targetClass, '.the-slatest-list li a', 10)
	removeDupeLinks(targetClass)
	unlinkStyle(targetClass)
	colorate(targetClass, '#670032', true)
}

function drudge(response, targetClass) {
	basicScrape(response, targetClass, '#drudgeTopHeadlines a', 30)
	basicScrape(response, targetClass, 'b a', 20)
	unlinkStyle(targetClass)
}

function verge(response, targetClass) {
	basicScrape(response, targetClass, '.m-hero__slot-link', 30)
	unlinkStyle(targetClass)
}

function npr(response, targetClass) {
	basicScrape(response, targetClass, '.story-text > a', 30)
	unlinkStyle(targetClass)
}

function mashable(response, targetClass) {
	var $html = $.parseHTML(response)
	basicScrape($html, targetClass, '.headline a', 10)
	basicScrape($html, targetClass, '.big-stories h1 a', 10)
	basicScrape($html, targetClass, '.hot-stories h1 a', 10)
	unlinkStyle(targetClass)
	colorate(targetClass, '#00AEEF', true)
}

function tmz(response, targetClass) {
	basicScrape(response, targetClass, '.headline', 30)
	unlinkStyle(targetClass)
	unHeaderStyle(targetClass)
}

function engadget(response, targetClass) {

	var $html = $.parseHTML(response)
	basicScrape($html, targetClass, '#carousel a', 30)
	basicScrape($html, targetClass, '.headline a', 30)

	unlinkStyle(targetClass)
	colorate(targetClass, '#444444', true)
}

function cbssports(response, targetClass) {
	basicScrape(response, targetClass, '.topStories li > a', 30)
	unlinkStyle(targetClass)
}

function ign(response, targetClass) {
	basicScrape(response, targetClass, '.listElmnt-storyHeadline', 30)
	unlinkStyle(targetClass)
}

function bleacher(response, targetClass) {
	basicScrape(response, targetClass, '#headlines li a', 5)
	basicScrape(response, targetClass, '#bleacher-buzz-module li > a', 5)
	basicScrape(response, targetClass, '.line-up-title a', 20)
	unlinkStyle(targetClass)
	colorate(targetClass, '#5A5A5A', true)
	universalLinkFix(targetClass, 'http://bleacherreport.com')

}

function gizmodo(response, targetClass) {
	var $html = $.parseHTML(response)
	basicScrape($html, targetClass, '.entry-title a', 30)
}

function usatoday(response, targetClass) {
	basicScrape(response, targetClass, '.mpsm-item a', 10)
	basicScrape(response, targetClass, '.hfwmm-item a', 20)
	universalLinkFix(targetClass, 'http://usatoday.com')
}

function hreporter(response, targetClass) {
	basicScrape(response, targetClass, 'article a', 30)
	universalLinkFix(targetClass, 'http://hollywoodreporter.com')
	unHeaderStyle(targetClass)
	unlinkStyle(targetClass)
}

function cnbc(response, targetClass) {
	var $html = $.parseHTML(response)
	basicScrape($html, targetClass, '#tab_contents_tab_1 .headline a', 20)
	basicScrape($html, targetClass, '#tab_contents_tab_1 .headline a', 20)
	removeDupeLinks(targetClass)
	universalLinkFix(targetClass, 'http://cnbc.com')
}

function wsj(response, targetClass) {
	basicScrape(response, targetClass, '.tipTarget a', 10)
	basicScrape(response, targetClass, '.trendingNow li h2 a', 30)
}

function bloomberg(response, targetClass) {
	basicScrape(response, targetClass, 'article', 30)
	universalLinkFix(targetClass, 'http://bloomberg.com')
	removeDupeLinks(targetClass)

}

function time(response, targetClass) {
	basicScrape(response, targetClass, '.home-icons-article', 10)
	basicScrape(response, targetClass, '.home-popular-title', 20)
}

function bbc(response, targetClass) {
	var $html = $.parseHTML(response)
	basicScrape($html, targetClass, '#most_popular_tabs_read', 1)
	basicScrape($html, targetClass, '#most_popular_tabs_shared', 1)
	basicScrape($html, targetClass, '.media_link', 20)
	removeDupeLinks(targetClass)
}

function guardian(response, targetClass) {

	$html = $.parseHTML(response)
	basicScrape(response, targetClass, '.fc-item__content a', 30)
	unlinkStyle(targetClass)
}

function wapo(response, targetClass) {
		
		basicScrape(response, targetClass, '.no-left', 5)
		basicScrape(response, targetClass, '#post_most', 1)
		basicScrape(response, targetClass, '.headline', 20)
		universalLinkFix(targetClass, 'http://washingtonpost.com')
}

function weather(response, targetClass) {
	$('.'+targetClass).hide()
}

function foxnews(response, targetClass) {
	$html = $.parseHTML(response)
	basicScrape($html, targetClass, '.section-first', 1)
	basicScrape($html, targetClass, '.dv-item li a', 5)
	basicScrape($html, targetClass, '.latest-news li a', 20)
	unlinkStyle(targetClass)
	
}

function googleNews(response, targetClass) {
	basicScrape(response, targetClass, '.story', 20)
	universalLinkFix(targetClass, 'http://google.com')
}

function buzzfeed(response, targetClass) {
	$html = $.parseHTML(response)
	basicScrape($html, targetClass, '.hot_list', 1)
	basicScrape($html, targetClass, 'article h2 a', 20)
	unlinkStyle(targetClass)
	//fixRelativeLinks(targetClass, 'http://www.buzzfeed.com', 'a')
	universalLinkFix(targetClass, 'http://buzzfeed.com')
}

function cnn(response, targetClass) {
	$html = $.parseHTML(response)
	basicScrape($html, targetClass, '.cd__content', 20)
	$('.'+'smallContainer a').each(function(ind, val) {
		var $val = $(val)
		var href = $val.attr('href')
		var isVideo = href.indexOf('video') != -1
		if (isVideo) {
			$val.addClass('cnn_vid')
		}
		var isPhotos = href.indexOf('/gallery/') != -1
		if (isPhotos) {
			$val.addClass('cnn_photos')
		}
	})
	universalLinkFix(targetClass, 'http://www.cnn.com')
	unlinkStyle(targetClass)
	unHeaderStyle(targetClass)
}

function huffpo(response, targetClass) {
	basicScrape(response, targetClass, '.entry h1', 10)
	basicScrape(response, targetClass, '.entry h2', 20)
	basicScrape(response, targetClass, '.entry h3', 20)
	$('.'+'smallContainer a').each(function(ind, val) {
		$(val).attr('style', '')
	})
}


function espn(response, targetClass) {
	basicScrape(response, targetClass, '.headlines', 30)
	basicScrape(response, targetClass, '.bulletlinks', 30)

}

function nytimes(response, targetClass) {
	basicScrape(response, targetClass, 'article',   30)
	unHeaderStyle(targetClass)
}

function blazersEdge(response, targetClass) {
	basicScrape(response, targetClass, '.article', 50)
}

function theAtlantic(response, targetClass)	{
	//basicContainerScrape(response, targetClass, '#module-most-popular', 'dd', 30)
	basicScrape(response, targetClass, 'article', 10)
	basicScrape(response, targetClass, '.headline', 20)
	universalLinkFix(targetClass, 'http://www.theatlantic.com')
	removeDupeLinks(targetClass)
	//unlinkStyle(targetClass)
	unHeaderStyle(targetClass)
}

function fiveThirtyEight(response, targetClass) {
	basicScrape(response, targetClass, '.article-title' , 40)
	basicScrape(response, targetClass, '.fte_datalab h3 ' , 20)

}

function quartz(response, targetClass) {
	basicScrape(response, targetClass, '.note-summary', 20)
}

function hackerNewsResponse(response, targetClass) {

	basicScrape(response, targetClass, '#hnmain table', 2)

	$('.hackerNews').find('table').first().hide()

	$('.hackerNews .smallContainer').find('a').each(function(ind, val) {
		var attr = $(val).attr('href')
		if (attr.slice(-1) != '/') {
			$(val).attr('href', 'https://news.ycombinator.com/'+attr)
		}
	})

	//$('.hackerNews').find('table tr td').first().hide()
/*	var innerContent = '<table><tbody>'
	var $html = $(response)
	var table = $html.find('table')[2] //contains table with all links
	var table = $(table).find('tr').slice(0,-1)
	$.each(table, function(ind, val) {
		var element = val.innerHTML
		var ehtml = $(element)
		innerContent = innerContent + '<tr>' + element +'</tr>'
	})
	var innerContent = innerContent + "</tbody></table>"
	$('.'+targetClass+' .smallContainer').html(innerContent)
	$('.'+targetClass+' .smallContainer').find('td').hide()
	$('.'+targetClass+' .smallContainer').find('.title').show()
	$('.'+targetClass+' .smallContainer').find('.subtext').show()
	$('.'+targetClass+' .smallContainer td:nth-child(5n+1)').hide()
	$('.'+targetClass+' .smallContainer .subtext').hide()
	var comments = $('.'+targetClass+' .smallContainer .subtext').find('a:nth-child(4)')
	$('.'+targetClass+' .smallContainer tr:nth-child(3n-2) td:nth-child(3n)').each(function(ind) {
		var relLink =  $(comments[ind]).attr('href')
		var text = $(comments[ind]).text()
		var newLink = "<a class='hComLink' href=https://news.ycombinator.com/"+relLink+">"+text+"</a>"
		$(this).append(newLink)

	})
*/
}



function twitter(response, targetClass) {
	basicScrape(response, targetClass, '.tweet', 1000)
	var newTarget = targetClass+' .stream-item-header'
	//fixRelativeLinks(targetClass, 'http://twitter.com', '.stream-item-header a')
	universalLinkFix(targetClass, 'http://twitter.com')

	$(".tweet").each(function(i, v) {
		var $this  = $(v)
		var perma = $this.find('.js-permalink')
		var source = perma.attr('href')
		//alert(source)
		$this.find('.content').append("<a href='"+source+"' class='pLink'><i class='fa fa-external-link'></i></a>")
	})

	$('.tweet').hover(function(){
				$(this).find('.pLink').show()
			},function(){
				$(this).find('.pLink').hide()
			})

}

function reddit(response, targetClass) {

	var $html = $(response)
	var mainTable = $html.find('#siteTable')
	var objects = mainTable.find('.entry') //slice to take just a few items

	var targetContainer = $('.'+targetClass+' .smallContainer')
	$.each(objects, function(ind,val) {
		content = "<div class='redditChunk'></div>" //hold content to be appended
		targetContainer.append(content)
		var $val = $(val)
		var chunk = $val
		var title = $val.children('.title').children()
		var comments = $val.children('.flat-list').children('.first').children('a')
		var subreddit = $(val).find('.subreddit')	
		targetContainer.find('.redditChunk').last().append(title).append(subreddit).append(comments)
		targetContainer.find('.linkflairlabel').hide() //cuz they're annoying
	})
	universalLinkFix(targetClass, 'http://reddit.com')
}

