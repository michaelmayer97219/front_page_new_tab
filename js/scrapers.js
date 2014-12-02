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
		'class': 'googleNews'}
}

non_scrapers =  {
	/*
	"http://mail.google.com/": 
		{'callback': gmail,
		'class': 'gmail'}
	*/
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
	console.log($smallHTML)
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
		//console.log(isRel)
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
	var backImage = '../images/hacker-news.jpg'
	//replaceTitleWithImage(targetClass, backImage, 'http:/news.ycombinator.com')
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

