const form = document.querySelector("form.input");
 const menu_btn = document.querySelector('.menu_btn');
 const menu_list = document.querySelector('.menu_list');
 const data_container = document.querySelector('.data');
 menu_btn.addEventListener('click', () => {
   menu_list.classList.toggle('active');
 });
 let lat, long, month, day, time;
  
 const mainFunction = () => {
   'use strick';
   form.querySelector('#city').focus();
   form.querySelector('#city').select();
   const cityName = form.querySelector('#city').value;
   const map = document.querySelector('#map');
   const apiKey = '4d8fb5b93d4af21d66a2948710284366'
   fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`)
     .then((response) => response.json())
     .then((data) => {
       const description = data.weather[0].description;
       const country = data.sys.country;
       const city = data.name;
       lat = data.coord.lat;
       long = data.coord.lon;
       const temp = Math.round(data.main.temp);
       const feels_like = Math.round(data.main.feels_like);
       const humidity = Math.round(data.main.humidity);
       map.innerHTML = `<iframe width="100%" height="200px" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/?ie=UTF8&t=m&ll=${lat}, ${long}&spn=0.003381,0.017231&z=10&output=embed"></iframe>`;
       const url = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${data.weather[0].icon}.svg`;
       //console.log(data);
       let now_date = new Date();
       let m_arr = ["January", 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
       month = m_arr[now_date.getMonth()];
       day = now_date.getDate();
       time = now_date.getHours();
       let mins = String(now_date.getMinutes());
       if(mins.length == 1) {
         mins = `0${mins}`;
       } else {
         mins = String(now_date.getMinutes());
       }
       let type = ' AM';
       if(time >= 12) {
         type = ' PM';
         switch(time) {
           case 13:
             time = 1;
             break;
           case 14:
             time = 2;
             break;
           case 15:
             time = 3;
             break;
           case 16:
             time = 4;
             break;
           case 17:
             time = 5;
             break;
           case 18:
             time = 6;
             break;
           case 19:
           time = 7;
           break;
           case 20:
           time = 8;
           break;
           case 21:
           time = 9;
           break;
           case 22:
           time = 10;
           break;
           case 23:
           time = 11;
           break;
           case 24:
             time = 12;
            break;
            default:
            time = now_date.getHours();
         }
       } else {
         type = ' AM';
       }
       let year = now_date.getFullYear();
       time = `${time}:${mins}`;
       data_container.innerHTML = `
     <div class="ar">
     <p id="date_time">${month} ${day}, ${year}<br> ${time}${type}</p>
       <h3 class="city">${city}</h3>
       <small>${country}</small>
       <p id="feels_like">Feels like ${feels_like}°C</p>
       <p id="cast">${description}</p>
       <p>Humidity: ${humidity}%</p>
       </div>
         <div class="icon_container">
           <img src='${url}' width="50%" id="icon" alt="icon"> 
           <h1>${temp}°C</h1>
         </div>
     `;
   
     })
     .catch((err) => {
       alert(err);
     });
 }
 
 form.addEventListener('submit', () => {
   mainFunction();
 });
 
   mainFunction();
