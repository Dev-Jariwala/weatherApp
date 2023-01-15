const submitBtn = document.getElementById('submitBtn');
const cityName = document.getElementById('cityName');
const city_name = document.getElementById('city_name');
const temp_status = document.getElementById('temp_status');
const temp = document.getElementById('temp');
const datahide = document.querySelector('.middle_layer');

const day = document.getElementById('day');
const today_date = document.getElementById('today_date');

const d = new Date();
const currDay = d.getDay();
const arrDay = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const arrMonth = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
day.innerHTML = arrDay[currDay];
const currDate = d.getDate();
const currMonth = d.getMonth();
today_date.innerHTML = `${currDate} ${arrMonth[currMonth]}`;

const getInfo = async (event) => {
    event.preventDefault();
    let cityVal = cityName.value;
    if (cityVal === "") {
        city_name.innerHTML = `Plz write the name of city before search`;
        datahide.classList.add('data_hide');
    } else {
        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=7c0d94c2bb47b0c5fad03bb576cdd28e`;
            const response = await fetch(url);
            const data = await response.json();
            const arrData = [data];
            // console.log(data);
            datahide.classList.remove('data_hide');
            city_name.innerHTML = `${arrData[0].name}, ${arrData[0].sys.country}`;
            temp.innerHTML = `${arrData[0].main.temp} °C`;
            const tempMood = arrData[0].weather[0].main;

            if (tempMood == "Clouds") {
                temp_status.innerHTML = `<i class="fa-solid fa-cloud fa" style="color: #8DCBE6"></i>`;
            } else if (tempMood == "Rainy") {
                temp_status.innerHTML = `<i class="fa-solid fa-cloud-rain" style="color: #00337C"></i>`;
            } else if (tempMood == "Sunny") {
                temp_status.innerHTML = `<i class="fa-solid fa-sun" style="color: #FFEA20"></i>`;
            } else if (tempMood == "Clear") {
                temp_status.innerHTML = `<i class="fa-solid fa-cloud-sun"></i>`;
            } else {
                temp_status.innerHTML = tempMood;
            }
        } catch {
            city_name.innerHTML = `Plz write the name of city properly`;
            datahide.classList.add('data_hide');
        }

    }

};

submitBtn.addEventListener('click', getInfo);