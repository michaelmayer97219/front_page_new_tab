var storage = chrome.storage.local;
var extraSites = {'add': [], 'sub': [], 'sortOrder': [], 'prodMode': null}
var noshow = true
var alreadyScraped = []
var leftOutLinks = []

chrome.alarms.create({periodInMinutes: 1.8
});


chrome.alarms.onAlarm.addListener(function() {
	
	storage.get('selectedScrapes', function(result) {
		extraSites = processInitiatorResult(result, extraSites)
		
			chrome.topSites.get(top_sites_callback)
		
    })
	 extraSites = {'add': [], 'sub': [], 'sortOrder': [], 'prodMode': null}
	 noshow = true
	 alreadyScraped = []
	 leftOutLinks = []
});