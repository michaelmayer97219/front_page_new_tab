//list of scrapers
scrapers = {
	"news.ycombinator.com": 
		{'callback': hackerNewsResponse,
		'class': 'hackerNews'},
	"blazersedge.com":
		{'callback': blazersEdge,
		'class': 'blazersEdge'},
	"twitter.com": 
		{'callback': twitter,
		'class': 'twitter'},
	"fivethirtyeight.com":
		{'callback': fiveThirtyEight,
		'class': 'fiveThirtyEight'},
	"theatlantic.com":
		{'callback': theAtlantic,
		'class': 'theAtlantic'},
	"reddit.com": 
		{'callback': reddit,
		'class': 'reddit'},
	"qz.com": 
		{'callback': quartz,
		'class': 'qz'},
	"nytimes.com": 
		{'callback': nytimes,
		'class': 'nytimes'},
	"espn.go.com": 
		{'callback': espn,
		'class': 'espn'},
	"huffingtonpost.com": 
		{'callback': huffpo,
		'class': 'huffpo'},
	"cnn.com":
		{'callback': cnn,
		'class': 'cnn'},
	"buzzfeed.com":
		{'callback':buzzfeed,
		'class': 'buzzfeed'},
	"news.google.com":
		{'callback':googleNews,
		'class': 'googleNews'},
	"foxnews.com":
		{'callback':foxnews,
		'class': 'foxnews'},
	"washingtonpost.com":
		{'callback':wapo,
		'class': 'wapo'},
	"theguardian.com":
		{'callback':theguardian,
		'class': 'theguardian'},
	"bbc.com":
		{'callback':bbc,
		'class': 'bbc'},
	"time.com":
		{'callback': time,
		'class': 'time'},
	"bloomberg.com":
		{'callback': bloomberg,
		'class': 'bloomberg'},
	"wsj.com":
		{'callback': wsj,
		'class': 'wsj'},
	"cnbc.com":
		{'callback': cnbc,
		'class': 'cnbc'},
	"businessweek.com":
		{'callback': businessweek,
		'class': 'businessweek'},
	"hollywoodreporter.com":
		{'callback': hreporter,
		'class': 'hreporter'},
	"usatoday.com":
		{'callback': usatoday,
		'class': 'usatoday'},
	"gizmodo.com":
		{'callback': gizmodo,
		'class': 'gizmodo'},
	"bleacherreport.com":
		{'callback': bleacher,
		'class': 'bleacher'},
	"ign.com":
		{'callback': ign,
		'class': 'ign'},
	"cbssports.com":
		{'callback': cbssports,
		'class': 'cbssports'},
	"engadget.com":
		{'callback': engadget,
		'class': 'engadget'},
	"tmz.com":
		{'callback': tmz,
		'class': 'tmz'},
	"mashable.com":
		{'callback': mashable,
		'class': 'mashable'},
	"npr.org":
		{'callback': npr,
		'class': 'npr'},
	"theverge.com":
		{'callback':verge,
		'class': 'verge'},
	"drudgereport.com":
		{'callback': drudge,
		'class': 'drudge'},
	"slate.com":
		{'callback': slate,
		'class': 'slate'},
	"deadspin.com":
		{'callback': deadspin,
		'class': 'deadspin'},
	"techcrunch.com":
		{'callback': tcrunch,
		'class': 'tcrunch'},
	"vice.com":
		{'callback': vice,
		'class': 'vice'},
	"arstechnica.com":
		{'callback': arstech,
		'class': 'arstech'},
	"medium.com":
		{'callback': medium,
		'class': 'medium'},
	"businessinsider.com":
		{'callback': bizinsider,
		'class': 'bizinsider'},
	"aeon.co":
		{'callback': aeon,
		'class': 'aeon'},
	"variety.com":
		{'callback': variety,
		'class': 'variety'},
	"economist.com":
		{'callback': economist,
		'class': 'economist'},
	"nymag.com":
		{'callback': nymag,
		'class': 'nymag'},
	"rollingstone.com":
		{'callback': rstone,
		'class': 'rstone'},
	"technologyreview.com":
		{'callback': techreview,
		'class': 'techreview'},
	"sfgate.com":
		{'callback': sfgate,
		'class': 'sfgate'},
	"ft.com":
		{'callback': ft,
		'class': 'ft'},
	"latimes.com":
		{'callback': latimes,
		'class': 'latimes'},
	"nypost.com":
		{'callback': nypost,
		'class': 'nypost'},
	"newyorker.com":
		{'callback': newyorker,
		'class': 'newyorker'},
	"newsweek.com":
		{'callback': newsweek,
		'class': 'newsweek'},
	"thedailybeast.com":
		{'callback':dailybeast,
		'class': 'dailybeast'}
}

non_scrapers =  {
	"weather.com":
		{'callback':weather,
		'class': 'weather'},
}

function dailybeast(response, targetClass) {
	basicScrape(response, targetClass, '.cheats .cheat', 20)
	unlinkStyle(targetClass)
	unHeaderStyle(targetClass)
	fixRelativeLinks(targetClass, 'http://dailybeast.com', 'a')
	
}

function newsweek(response, targetClass) {
	basicScrape(response, targetClass, '.hf-info', 20)
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
	basicScrape($html, targetClass, '.article', 25)
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
	basicScrape(response, targetClass, '.trb_outfit_relatedListTitle', 15)
	unlinkStyle(targetClass)
}
function nypost(response, targetClass) {
	basicScrape(response, targetClass, 'article > h3 > a', 30)
	unlinkStyle(targetClass)
}

function techreview(response, targetClass) {
	basicScrape(response, targetClass, '.top-stories-list a', 10)
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
	basicScrape(response, targetClass, 'article .ledeLink', 10)
	basicScrape(response, targetClass, '.feedLink', 10)
	unlinkStyle(targetClass)
}

function economist(response, targetClass) {
	basicScrape(response, targetClass, '.hero-tab', 10)
	basicScrape(response, targetClass, 'article', 10)
	unlinkStyle(targetClass)
	universalLinkFix(targetClass, 'http://economist.com')
}

function variety(response, targetClass) {
	basicScrape(response, targetClass, '.slide a', 10)
	basicScrape(response, targetClass, '.story a', 50)
	unlinkStyle(targetClass)
}

function aeon(response, targetClass) {
	basicScrape(response, targetClass, '.panel', 15)
	unlinkStyle(targetClass)
}

function bizinsider(response, targetClass) {
	basicScrape(response, targetClass, '.title', 20)
	unlinkStyle(targetClass)
	colorate(targetClass, '#2E5262', true)
}

function medium(response, targetClass) {
	basicScrape(response, targetClass, '.block-title a', 20)
	universalLinkFix(targetClass, 'http://medium.com')
	unlinkStyle(targetClass)
}

function arstech(response, targetClass) {
	basicScrape(response, targetClass, '.top-stories li a', 10)
	unlinkStyle(targetClass)
	//colorate(targetClass, '#242424', true)
}

function vice(response, targetClass) {
	var $html = $.parseHTML(response)
	basicScrape($html, targetClass, '.item-title a', 15)
	unlinkStyle(targetClass)
	universalLinkFix(targetClass, 'http://vice.com')
}

function tcrunch(response, targetClass) {
	basicScrape(response, targetClass, '.plain-feature a', 1)
	basicScrape(response, targetClass, '.plain-item a', 5)
	basicScrape(response, targetClass, '.post-title a', 10)
	unlinkStyle(targetClass)
}

function deadspin(response, targetClass) {
		var $html = $.parseHTML(response)
	basicScrape($html, targetClass, '.entry-title a', 20)
	unlinkStyle(targetClass)
}

function slate(response, targetClass) {
	var $html = $.parseHTML(response)
	basicScrape($html, targetClass, '.popular li a', 10)
	basicScrape($html, targetClass, '.mostshared li a', 10)
	removeDupeLinks(targetClass)
	unlinkStyle(targetClass)
	colorate(targetClass, '#670032', true)
}

function drudge(response, targetClass) {
	basicScrape(response, targetClass, '#drudgeTopHeadlines a', 20)
	basicScrape(response, targetClass, 'b a', 10)
	unlinkStyle(targetClass)
}

function verge(response, targetClass) {
	basicScrape(response, targetClass, '.m-hero__slot-link', 10)
	unlinkStyle(targetClass)
}

function npr(response, targetClass) {
	basicScrape(response, targetClass, '.story-text > a', 10)
	unlinkStyle(targetClass)
}

function mashable(response, targetClass) {
	var $html = $.parseHTML(response)
	basicScrape($html, targetClass, '.big-stories h1 a', 10)
	basicScrape($html, targetClass, '.hot-stories h1 a', 10)
	unlinkStyle(targetClass)
	colorate(targetClass, '#00AEEF', true)
}

function tmz(response, targetClass) {
	basicScrape(response, targetClass, '.headline ', 10)
	unlinkStyle(targetClass)
	colorate(targetClass, '#464646', true)
}

function engadget(response, targetClass) {

	var $html = $.parseHTML(response)
	basicScrape($html, targetClass, '.headline a', 20)
	unlinkStyle(targetClass)
	colorate(targetClass, '#444444', true)
}

function cbssports(response, targetClass) {
	basicScrape(response, targetClass, '.topStories li > a', 20)
	unlinkStyle(targetClass)
}

function ign(response, targetClass) {
	basicScrape(response, targetClass, '.listElmnt-storyHeadline', 30)
	unlinkStyle(targetClass)
}

function bleacher(response, targetClass) {
	basicScrape(response, targetClass, '#headlines li a', 5)
	basicScrape(response, targetClass, '#bleacher-buzz-module li > a', 5)
	basicScrape(response, targetClass, '.line-up-title a', 10)
	unlinkStyle(targetClass)
	colorate(targetClass, '#5A5A5A', true)
	universalLinkFix(targetClass, 'http://bleacherreport.com')

}

function gizmodo(response, targetClass) {
	var $html = $.parseHTML(response)
	basicScrape($html, targetClass, '.entry-title a', 10)
}

function usatoday(response, targetClass) {
	basicScrape(response, targetClass, '.mpsm-item a', 5)
	basicScrape(response, targetClass, '.hfwmm-item a', 10)
	universalLinkFix(targetClass, 'http://usatoday.com')
}

function hreporter(response, targetClass) {
	basicScrape(response, targetClass, '.panel a', 5)
	basicScrape(response, targetClass, '.title a', 10)
	universalLinkFix(targetClass, 'http://hollywoodreporter.com')
}

function businessweek(response, targetClass) {
	var $html = $.parseHTML(response)
	basicScrape($html, targetClass, '.tab_panel li a', 20)
}

function cnbc(response, targetClass) {
	var $html = $.parseHTML(response)
	basicScrape($html, targetClass, '#tab_contents_tab_1 .headline a', 10)
	basicScrape($html, targetClass, '#tab_contents_tab_1 .headline a', 10)
	removeDupeLinks(targetClass)
	universalLinkFix(targetClass, 'http://cnbc.com')
}

function wsj(response, targetClass) {
	basicScrape(response, targetClass, '.tipTarget a', 5)
	basicScrape(response, targetClass, '.trendingNow li h2 a', 30)
}

function bloomberg(response, targetClass) {
	basicScrape(response, targetClass, '.icon-article-headline', 10)
	basicScrape(response, targetClass, '.most_popular_block li', 10)
	universalLinkFix(targetClass, 'http://www.bloomberg.com')
	removeDupeLinks(targetClass)
}

function time(response, targetClass) {
	basicScrape(response, targetClass, '.home-icons-article', 5)
	basicScrape(response, targetClass, '.home-popular-title', 10)
}

function bbc(response, targetClass) {
	var $html = $.parseHTML(response)
	basicScrape($html, targetClass, '#most_popular_tabs_read', 1)
	basicScrape($html, targetClass, '#most_popular_tabs_shared', 1)
	basicScrape($html, targetClass, '.media_link', 10)
	removeDupeLinks(targetClass)
}

function theguardian(response, targetClass) {
	$html = $.parseHTML(response)
	basicScrape($html, targetClass, '.headline-list__link', 10)
}

function wapo(response, targetClass) {
		basicScrape(response, targetClass, '.headline', 2)
		basicScrape(response, targetClass, '.no-left', 2)
		basicScrape(response, targetClass, '#post_most', 1)
		universalLinkFix(targetClass, 'http://washingtonpost.com')
}

function weather(response, targetClass) {
	$('.'+targetClass).hide()
}

function foxnews(response, targetClass) {
	$html = $.parseHTML(response)
	basicScrape($html, targetClass, '.section-first', 1)
	basicScrape($html, targetClass, '.dv-item', 5)
	
}

function googleNews(response, targetClass) {
	basicScrape(response, targetClass, '.esc-lead-article-title', 30)
}

function buzzfeed(response, targetClass) {
	$html = $.parseHTML(response)
	basicScrape($html, targetClass, '.hot_list', 1)
	//fixRelativeLinks(targetClass, 'http://www.buzzfeed.com', 'a')
	universalLinkFix(targetClass, 'http://buzzfeed.com')
}

function cnn(response, targetClass) {
	$html = $.parseHTML(response)
	basicScrape($html, targetClass, '.cnn_bulletbin', 2)
	universalLinkFix(targetClass, 'http://www.cnn.com')
}

function huffpo(response, targetClass) {
	basicScrape(response, targetClass, '.entry h5', 10)
	basicScrape(response, targetClass, '.entry h4', 10)
	basicScrape(response, targetClass, '.entry h3', 10)
}

function espn(response, targetClass) {
	basicScrape(response, targetClass, '.headlines', 30)
}

function nytimes(response, targetClass) {
	basicScrape(response, targetClass, '.story-heading',   30)
}

function blazersEdge(response, targetClass) {
	basicScrape(response, targetClass, '.article', 50)
}

function theAtlantic(response, targetClass)	{
	basicContainerScrape(response, targetClass, '#module-most-popular', 'dd', 30)
	universalLinkFix(targetClass, 'http://www.theatlantic.com')

}

function fiveThirtyEight(response, targetClass) {
	basicScrape(response, targetClass, '.article-title' , 20)
	var backImage = 'http://s0.wp.com/wp-content/themes/vip/espn-fivethirtyeight/assets/img/logo.png'
	replaceTitleWithImage(targetClass, backImage, 'http://www.fivethirtyeight.com')
	
}

function quartz(response, targetClass) {
	basicScrape(response, targetClass, '.note-summary', 20)
}

function hackerNewsResponse(response, targetClass) {

	var innerContent = '<table><tbody>'
	var $html = $(response)
	var table = $html.find('table')[2] //contains table with all links
	var table = $(table).find('tr').slice(0,70)
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
}



function twitter(response, targetClass) {
	basicScrape(response, targetClass, '.tweet', 15)
	var newTarget = targetClass+' .stream-item-header'
	//fixRelativeLinks(targetClass, 'http://twitter.com', '.stream-item-header a')
	universalLinkFix(targetClass, 'http://twitter.comments')

	//create link to tweet item around tweet text
	var tweets = $('.tweet')
	tweets.each(function(ind) {
		var $this = $(this)
		var tweetHref = $this.find('.tweet-timestamp').attr('href')
		var tweetText = $this.find('.tweet-text')
		tweetText.wrap("<a class='tweet-text-outer' href='"+tweetHref+"'></a>")
	})


	/*
	var $html = $(response)
	var contentContainers = $html.find('.content').slice(1,12) //pick 10 tweets
	var targetContainer = $('.'+targetClass+' .smallContainer')
	$.each(contentContainers, function(ind, val) {
		valQuery = $(val)
		

		if (valQuery.find('.tweet-text')[0]) {
			var text =  valQuery.find('.tweet-text')[0].innerHTML
			var name = valQuery.find('.js-action-profile-name')
			var handle = valQuery.find('.js-action-profile-name')
			var isPromoted = valQuery.find('.Icon--promoted')
			targetContainer.append(name)
			targetContainer.append(handle)
			targetContainer.append("<div class=tweetText>"+text+"</div>")
		}

	})

	var relLinks = $('.'+targetClass+' .smallContainer').find('.pretty-link')
	relLinks.each(function(ind) {
		$this = $(this)
		var link = $this.attr('href')
		var linkText = $this.text()
		newHTML = "<a class='pretty-link' href=https://www.twitter.com"+link+">"+linkText+"</a>"
		$this.html(newHTML)
	})

*/
}

/*
function oLive(response, targetClass) {
	var content = $.parseHTML(response)
	var $html = $(content)
	var targetContainer = $('.'+targetClass+' .smallContainer')
	var mostread = $html.find('#most-popular-read')
	var contentContainers = mostread.find('li').slice(0,40)
		console.log(mostread)
	$.each(contentContainers, function(ind,val) {
		$val = $(val)
		headline = $val.children('h2').children('a')
		targetContainer.append(headline)
	})
}


function gmail(newClass) {
	//will just insert a few links
	var targetContainer = $('.'+newClass).children('.smallContainer')
	var composeLink = 'https://mail.google.com/mail/u/0/#inbox?compose=new'
	targetContainer.append("<a href='"+composeLink+"'>Compose Message</a>")

}
*/
function reddit(response, targetClass) {
	var $html = $(response)
	var mainTable = $html.find('#siteTable')
	var objects = mainTable.find('.entry').slice(0,8) //slice to take just a few items

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
}

