const datasave = []
function savecitysearch (city){
datasave.push(city)
localStorage.setItem("cities",JSON.stringify(datasave))
}
function fetchData() {

    //const apiUrl = apiUrlInput.value;
    var cityname = document.getElementById("cityname").value;
    const apiKey = '97b579a182b5b0305a5f49ce2eede4f0';
    var queryURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityname + '&appid=' + apiKey + "&units=imperial";
    savecitysearch(cityname)//
    // Fetching the data from the API URL
    fetch(queryURL)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            var lat = data.coord.lat
            var lon = data.coord.lon
            var apiUrlForecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`
            // Display the retrieved weather data
            var dataContainer = document.getElementById('data-container');
            dataContainer.innerHTML = `<h2>Weather Forecast for ${cityname}</h2>
                                        <p>Weather: ${data.weather[0].description}</p>`;
            fetch(apiUrlForecast)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    renderforcast(data.list)
                })
        })
}
function renderforcast(list){
    for (var i= 6;i < list.length; i+= 8 ){
        var dayDiv = document.createElement("div")
        var dateEl = document.createElement("h2")
        var icon = document.createElement("img")
        var tempEl = document.createElement("p")
        var HumEl = document.createElement("p")
        var wind = document.createElement("p")
        icon.src =`https://openweathermap.org/img/w/${list[i].weather[0].icon}.png`
        dateEl.textContent=dayjs.unix(list[i].dt).format("MM/DD/YYYY")
        tempEl.textContent=list[i].main.temp
        HumEl.textContent=list[i].main.humidity
        wind.textContent=list[i].wind.speed
        dayDiv.append(dateEl,icon,tempEl,HumEl,wind)
        document.getElementById("forcast").append(dayDiv)
    }
}
document.getElementById('fetch-button').addEventListener('click', fetchData);