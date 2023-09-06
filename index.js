const select = document.getElementById("cities");
const title = document.getElementById("title")
const cards = document.getElementById("cards")
const header = document.getElementById("header")

let city=""

select.addEventListener("change",function(){
    cards.style.visibility="visible";
    header.style.visibility="visible";
    city=this.value;
    let params = {
        "country":"EG",
        "city":city
    }
    console.log(city)
    getData (params , salah => fill(salah));
    switch(city){
        case "EG-C": title.innerHTML = "القاهرة";
        break;
        case "EG-MT":title.innerHTML = "مطروح";
        break;
        default:title.innerHTML = "القاهرة";
    }
})



function getData( params ,callback) {
    axios.get("http://api.aladhan.com/v1/timingsByCity",{
        params: params
    }).then(response=>callback(response.data.data))
  }

  function fill(salah){
    let timings = salah.timings;
    const date = salah.date.readable;
    const weekDay= salah.date.hijri.weekday.ar;
    document.getElementById("Fajr").innerHTML=timings.Fajr;
    document.getElementById("Sunrise").innerHTML=timings.Sunrise;
    document.getElementById("Dhuhr").innerHTML=timings.Dhuhr;
    document.getElementById("Asr").innerHTML=timings.Asr;
    document.getElementById("Sunset").innerHTML=timings.Sunset;
    document.getElementById("Isha").innerHTML=timings.Isha;
    document.getElementById("Date").innerHTML=date+" "+weekDay

}
  
