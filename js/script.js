

var url = 'https://api.darksky.net/forecast/8ebd4c4f455e362e0b67d62708dbd947'
var containerNode = document.querySelector('.container')
var inputSearchNode = document.querySelector('.search')
var buttonCurrentNode = document.querySelector('.current')
var buttonHourNode = document.querySelector('.hourly')
var buttonDailyNode = document.querySelector('.daily')
var hourNode = document.querySelector('.hour')
var cityNode = document.querySelector('.cityName')


function handleCoords(coordsObj) {
       var lat = coordsObj.coords.latitude
       var lng = coordsObj.coords.longitude
       var hashString = lat + '/' + lng + '/current'
       location.hash = hashString

}


//++++++++++++++++++++++++++++++++++++++++++++++
//++++++++++    VIEWS   ++++++++++++++++++++++++
//++++++++++++++++++++++++++++++++++++++++++++++
//CURRENT. 

function handleCurrent(current) {
	var html = ''

	html += '<p> Temperature: ' + current.currently.temperature + '</p>'
	html += '<p> Feels like: ' + current.currently.apparentTemperature + '</p>'
	html += '<p> Wind Speed: ' + current.currently.windSpeed + '</p>'

	var currentCurrent = current.currently.summary
   

	containerNode.innerHTML = html

	buttonHourNode.addEventListener('click', function() {
		var hourhtml = ''

	      var myTime = (current.hourly.data)[0].time
	      var date = new Date(myTime * 1000)
	      var hourlyTime = date.toLocaleString()
	      var hour0 = (hourlyTime.split(','))[1]
	      var temp = (current.hourly.data)[0].temperature


	      var myTime1 = (current.hourly.data)[1].time
	      var date1 = new Date(myTime1 * 1000)
	      var hourlyTime1 = date1.toLocaleString()
	      var hour1 = (hourlyTime1.split(','))[1]
	      var temp1 = (current.hourly.data)[1].temperature


	      var myTime2 = (current.hourly.data)[2].time
	      var date2 = new Date(myTime2 * 1000)
	      var hourlyTime2 = date2.toLocaleString()
	      var hour2 = (hourlyTime2.split(','))[1]
	      var temp2 = (current.hourly.data)[2].temperature

	      hourhtml += '<div class="oneDiv">' 
	      hourhtml += '<p>' + hour0 + '</p>'
	      hourhtml += '<p> Temperature: ' + temp + '</p>'
	      hourhtml += '</div>'

	      hourhtml += '<div class="twoDiv">'
	      hourhtml += '<p>' + hour1 + '</p>'
	      hourhtml += '<p> Temperature: ' + temp1 + '</p>'
	      hourhtml += '</div>'

	      hourhtml += '<div class="treDiv">'
	      hourhtml += '<p>' + hour2 + '</p>'
	      hourhtml += '<p> Temperature: ' + temp2 + '</p>'
	      hourhtml += '</div>'

	      hourNode.innerHTML = hourhtml

})

	buttonDailyNode.addEventListener('click', function() {
		var dailyhtml = ''

		var myDay = (current.daily.data)[0].time
		var day = new Date(myDay * 1000)
		var dailyTime = day.toLocaleString()
		var day1 = (dailyTime.split(','))[0]
		var tempDay1 = (current.daily.data)[0].summary

		var myDay = (current.daily.data)[1].time
		var day1 = new Date(myDay * 1000)
		var dailyTime1 = day1.toLocaleString()
		var day2 = (dailyTime1.split(','))[0]
		var tempDay2 = (current.daily.data)[1].summary

		var myDay = (current.daily.data)[2].time
		var day2 = new Date(myDay * 1000)
		var dailyTime2 = day2.toLocaleString()
		var day3 = (dailyTime2.split(','))[0]
		var tempDay3 = (current.daily.data)[2].summary

		dailyhtml += '<div class="oneDiv">'
		dailyhtml += '<p>' + day1 + '</p>'
		dailyhtml += '<p>' + tempDay1 + '</p>'
		dailyhtml += '</div>'

		dailyhtml += '<div class="twoDiv">'
		dailyhtml += '<p>' + day2 + '</p>'
		dailyhtml += '<p>' + tempDay2 + '</p>'
		dailyhtml += '</div>'
		
		dailyhtml += '<div class="treDiv">'
		dailyhtml += '<p>' + day3 + '</p>'
		dailyhtml += '<p>' + tempDay3 + '</p>'
		dailyhtml += '</div>'


		hourNode.innerHTML = dailyhtml

	})

	buttonCurrentNode.addEventListener('click', function() {
		hourNode.innerHTML =  currentCurrent

	})
}


//++++++++++++++++++++++++++++++++++++++++++++++
//++++++        SEARCH        ++++++++++++++++++
//++++++++++++++++++++++++++++++++++++++++++++++


inputSearchNode.addEventListener('keydown', function(event) {
	if(event.keyCode === 13) {
		var inputSearch = event.target.value

		cityNode.innerHTML = inputSearch

		var searchCityPromise = $.getJSON('https://maps.googleapis.com/maps/api/geocode/json?address=' + inputSearch)
		searchCityPromise.then(handleCity)
		event.target.value = ''

	}
})

function handleCity(apiRes) {
	var newlat = apiRes.results[0].geometry.location.lat
	var newlng = apiRes.results[0].geometry.location.lng

	location.hash = newlat + '/' + newlng + '/current'
}




//++++++++++++++++++++++++++++++++++++++++++++++
//+++++++++   CONTROLLER   +++++++++++++++++++++
//++++++++++++++++++++++++++++++++++++++++++++++
//++++++++++++++++++++++++++++++++++++++++++++++




var WeatherRouter = Backbone.Router.extend({
	routes: {
		":lat/:lng/current": "currentPage",
		":lat/:lng/hourly": "hourlyPage"
	},

	currentPage: function(lat, lng) {
		var promise = $.getJSON(url + '/' + lat + ',' + lng + '?callback=?')
		promise.then(handleCurrent) 
	},

	hourlyPage: function() {
		handleHourly()
	}
})


var instance = new WeatherRouter()
Backbone.history.start()


