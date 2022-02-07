// Initialize Firebase(2)
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

//Reference for form collection(3)
let formMessage = firebase.database().ref('sensors');

// //listen for submit event//(1)
// document
//   .getElementById('loginform')
//   .addEventListener('submit', formSubmit);

// //Submit form(1.2)
// function formSubmit(e) {
//   e.preventDefault();
//   // Get Values from the DOM
//   let email = document.querySelector('#email').value;
//   let password = document.querySelector('#password').value;

//   //send message values
//   sendMessage(email, password);
// }

// function openWin() {
//   window.open("map.html", "_self");
// }

//Send Message to Firebase(4)

// function sendMessage(email, password, paid) {
  var sensors = firebase.database().ref('sensors');
  var count = 0;
  sensors.on("child_added", function(snapshot) {
    var sensor = snapshot.val();
    

    document.getElementById('bod').innerHTML += '<div class="modal fade" id="'+sensor.name+'Modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="exampleModalLabel">'+sensor.name+'</h5><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="modal-body"><canvas id="'+sensor.name+'" style="width:100%;max-width:600px;height:100%;"></canvas></div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button><button type="button" class="btn btn-primary">Save changes</button></div></div></div></div>'
    document.getElementById("row").innerHTML += '<div class="col-sm-4 p-2"><div class="card"><img class="card-img-top" src="'+sensor.img+'" alt="Card image cap"><div class="card-body"><h5 class="card-title">'+sensor.name+'</h5><p class="card-text">View the data of your sensor.</p><a href="#" class="btn btn-primary btn-block" data-toggle="modal" data-target="#'+sensor.name+'Modal">View</a></div></div></div>'
    
    var xValues = ["Mon","Tue","Wed","Thu","Fri"];
    var yValues = sensor.soil;

    var ctx = document.getElementById(sensor.name);
    new Chart(ctx, {
      type: "line",
      data: {
        labels: xValues,
        datasets: [{
          fill: false,  
          lineTension: 0,
          backgroundColor: "rgba(0,0,255,1.0)",
          borderColor: "rgba(0,0,255,0.1)",
          data: yValues
        }]
      },
      options: {
        legend: {display: false},
        scales: {
          yAxes: [{ticks: {min: 15, max:100}}],
        }
      }
    });

    // document.getElementById("sendat").innerHTML += '<table><tr>'+'<td>'+sensor.numb+'</td>'+'<td>'+sensor.name+'</td>'+'<td>'+sensor.wind+'</td>'+'<td>'+sensor.soil+'</td>'+'<td>'+sensor.temp+'</td>'+'<td>'+sensor.humi+'</td>'+'<td>'+sensor.dayl+'</td>'+'</tr></table>';
    // console.log(sensor);
    // if ((email == user.email) && (password == user.password)) {
    //     window.open("map.html", "_self");
    //     document.querySelector('.alert3').style.display = 'block';

    //     //Hide Alert Message After Seven Seconds(6)
    //     setTimeout(function() {
    //       document.querySelector('.alert3').style.display = 'none';
    //     }, 7000);
    //     setTimeout(function(){openWin()}, 2000);
    //   }
    // else {
    //   count++;
    //   };
  });

  // if (count != 0) {
  //   document.querySelector('.alert2').style.display = 'block';
  //   setTimeout(function() {
  //     document.querySelector('.alert2').style.display = 'none';
  //   }, 7000);
  //   document.getElementById('loginform').reset();
  // }


// }

var xyValues = [
  {x:50, y:7},
  {x:60, y:8},
  {x:70, y:8},
  {x:80, y:9},
  {x:90, y:9},
  {x:100, y:9},
  {x:110, y:10},
  {x:120, y:11},
  {x:130, y:14},
  {x:140, y:14},
  {x:150, y:15}
];

new Chart("myChart", {
  type: "scatter",
  data: {
    datasets: [{
      pointRadius: 4,
      pointBackgroundColor: "rgb(0,0,255)",
      data: xyValues
    }]
  },
  options: {
    legend: {display: false},
    scales: {
      xAxes: [{ticks: {min: 40, max:160}}],
      yAxes: [{ticks: {min: 6, max:16}}],
    }
  }
});

  // document.getElementById('bod').innerHTML += '<div><canvas id="Cropsandsoil" style="width:100%;max-width:600px;height:100%;"></canvas></div>'

// var xValues = ["Mon","Tue","Wed","Thu","Fri"];
// var yValues = [1,4,32,65,34];

// var ctx = document.getElementById("myChart");
// new Chart(ctx, {
//   type: "line",
//   data: {
//     labels: xValues,
//     datasets: [{
//       fill: false,  
//       lineTension: 0,
//       backgroundColor: "rgba(0,0,255,1.0)",
//       borderColor: "rgba(0,0,255,0.1)",
//       data: yValues
//     }]
//   },
//   options: {
//     legend: {display: false},
//     scales: {
//       yAxes: [{ticks: {min: 15, max:100}}],
//     }
//   }
// });