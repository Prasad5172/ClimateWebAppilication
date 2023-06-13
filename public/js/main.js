const day = document.getElementById('day');
        const today_date= document.getElementById("today_date")
        const getCurrentDay = () => {
            var weekday = new Array(7);
            weekday[0]="Sun";
            weekday[1]="Mon";
            weekday[2]="Tue";
            weekday[3]="Wed";
            weekday[4]="Thu";
            weekday[5]="Fri";
            weekday[6]="Sat";
            var currentTime= new Date();
            return `${weekday[currentTime.getDay()]}`;
        };
        const getCurrenttime = () => {
            var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];
            var currentTime= new Date();
            var month = currentTime.getMonth();
            var day = currentTime.getDate();
            var hours= currentTime.getHours();
            var minutes= currentTime.getMinutes();
            let periods = "AM";
            if(hours >= 12){
                periods = "PM";
                if(hours >= 13){
                    hours -=12;
                }
            }
            if(minutes < 10 ){
                minutes="0"+minutes;
            }
            return `${day}  ${months[month]}`;
        }
        day.innerHTML=getCurrentDay();
        today_date.innerHTML=getCurrenttime();

const replaceVal = (tempVal,orgval) => {
    let temprature=tempVal.replace("{%tempval%}",orgval.main.temp);
    return temprature;
}


const submitBtn = document.getElementById("submitBtn")
const cityName = document.getElementById("cityName")
const city_name=document.getElementById("city_name")

const temp_val= document.getElementById("temp_val")
const temp_status = document.getElementById("temp_status")

const datahide = document.querySelector(".middle_layer")

const getInfo = async (event) => {
    event.preventDefault();
    var cityVal=cityName.value;
    if(cityVal===""){
        city_name.innerText="Plz Write The Text Before Search"
        datahide.classList.add('data_hide')
    }else{
        try {
            let url =`https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&appid=b92dc67e6ed5bcf0fcf6a8d69729666e&units=metric`
            const responce = await fetch(url)
            const data= await responce.json()
            const arrData = [data]
            city_name.innerText=`${arrData[0].name},${arrData[0].sys.country}`

            temp_val.innerHTML=`${arrData[0].main.temp}`

            const tempMood= arrData[0].weather[0].main;
            console.log(tempMood)
            if(tempMood =='Clear'){
                temp_status.innerHTML="<i class='fas fa-sun'  style='color:#eccc68'; ></i>"
            }else if(tempMood == "Rain"){
                temp_status.innerHTML = `<i class="fas fa-cloud-rain   style ='color:#a4b0be' "></i>`
            }else{
                temp_status.innerHTML = "<i class='fa fa-cloud' style='color:#f1f2f6';></i>"
            }
            datahide.classList.remove("data_hide")
            
        } catch  {
            city_name.innerText=`Plz Enter A Valid City Name`
            datahide.classList.add("data_hide")
        }
    }

}
submitBtn.addEventListener("click",getInfo)