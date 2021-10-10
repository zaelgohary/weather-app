/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();

const generate = document.getElementById('generate');
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const key = '&appid=5b5806790411b528983be1ddd61d63e9';
const tempMetric = '&units=metric' //converting celsius to fehrenheit


// Event listener to add function to existing HTML DOM element
generate.onclick = function performAction(){
    let zipCode = document.getElementById('zip').value;
    let feeling = document.getElementById('feelings').value;

    if(zipCode == ''){
        alert('Please enter a valid zip code!')
    }else{
        /* Function to GET Web API Data*/
        const getWeatherData = async () =>{
            await fetch(baseURL+zipCode+key+tempMetric)
            .then(response => {
                return response.json();
            })
            .then(response =>{
                const temp = response.main.temp;
                return temp;
            })
            // Function to POST data to server
            .then(async response => {
                await fetch( '/addData',{
                    method: 'POST', 
                    credentials: 'same-origin', 
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        date: newDate,
                        temp: response,
                        feeling: feeling
                    })
                });
            })
            // Function to GET data from server
            .then( response => {
                const allData = sendData();
                return allData; 
            })
            // Function to update UI
            .then(response =>{
                document.getElementById('date').innerHTML = `Date is: is ${response.date}`
                document.getElementById('temp').innerHTML = `Temp is: ${response.temp}`
                document.getElementById('content').innerHTML = `Content is: ${response.feeling}`
            })
            .catch(err => console.log(err));
        }
        getWeatherData()
    }
};

/* Function to GET Project Data */
async function sendData(){
    const finalResponse = await fetch('/all');
    const finalResponseJSON = await finalResponse.json();
    return finalResponseJSON;
}




