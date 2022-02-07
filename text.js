var config = {
    apiKey: "AIzaSyD0_lM4i9Vu51KbQQOUEt00M0mxArOU1cU",
    authDomain: "myapplication-885a4.firebaseapp.com",
    databaseURL: "https://myapplication-885a4.firebaseio.com",
    projectId: "myapplication-885a4",
    storageBucket: "myapplication-885a4.appspot.com",
    messagingSenderId: "315024999053",
    appId: "1:315024999053:web:f33aa706fa9f18533598c4",
    measurementId: "G-PKB1T4ZYBZ"
  };
firebase.initializeApp(config);
  
var count = 0
var sensorList = []
var sensorListBU = []
var sensors = firebase.database().ref('sensors');
let xValues = [50,60,70,80,90,100,110,120,130,140,150];
sensors.once("value", function(snapshot) {
  let sensor = snapshot.val()
  for (let i = 0; i < sensor.length; i++) {
    document.getElementById("row").innerHTML += '<div class="card col-md-6 text-center" ><div class="card-body"><h5 class="card-title">'+sensor[i].name+'</h5><canvas id="'+sensor[i].name+'" style="width:100%;max-width:700px"></canvas></div></div>';
    sensorList.push(sensor[i])
    sensorListBU.push(sensor[i])
  }
});

// <p>Soil moisture: <input value="0" type="checkbox" id="soil" checked="true" onChange="graphUpdate('+i+', this)">Temperature: <input type="checkbox" id="temp" checked="true">Wind speed: <input type="checkbox" id="wind" checked="true">Daylight: <input type="checkbox" id="dayl" checked="true">Humidity: <input type="checkbox" id="humi" checked="true"></p>
setTimeout(function() {
  for (let i = 0; i < sensorList.length; i++) {
    new Chart(document.getElementById(sensorList[i].name).getContext('2d'), {
      type: "line",
      data: {
        labels: xValues,
        datasets: [{
          label: "soil",
          fill: false,
          lineTension: 0,
          color: "red",
          backgroundColor: "red",
          borderColor: "rgba(0,0,255,0.1)",
          data: sensorList[i].soil
        },
        {
          label: "temp",
          fill: false,
          lineTension: 0,
          color: "blue",
          backgroundColor: "blue",
          borderColor: "rgba(0,0,255,0.1)",
          data: sensorList[i].temp
        },
        {
          label: "humi",
          fill: false,
          lineTension: 0,
          color: "yellow",
          backgroundColor: "yellow",
          borderColor: "rgba(0,0,255,0.1)",
          data: sensorList[i].humi
        },
        {
          label: "daylight",
          fill: false,
          lineTension: 0,
          color: "green",
          backgroundColor: "green",
          borderColor: "rgba(0,0,255,0.1)",
          data: sensorList[i].dayl
        },
        {
          label: "wind",
          fill: false,
          lineTension: 0,
          color: "purple",
          backgroundColor: "purple",
          borderColor: "rgba(0,0,255,0.1)",
          data: sensorList[i].wind
        }]
      },
      
      options: {
        plugins: {
          legend: {display: true, labels: {
            color: 'red',
            color: 'blue',
            color: 'yellow',
            color: 'green',
            color: 'purple',
        }, title: {
          color: 'red',
          color: 'blue',
          color: 'yellow',
          color: 'green',
          color: 'purple',
      }}},        
        scales: {
          yAxes: [{ticks: {min: 0, max:200}}],
        },
        responsive: false,
      }
    });
  }
}, 300);


