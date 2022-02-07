var sensorList = [];
const d = new Date();
var xValues = [];
var days = 7;
var history = false;

for (var i = days; i >= 0; i--) {
  var future = new Date()
  future.setDate(future.getDate() - i);
  //String(d.getDate() - i) + "/" + String(d.getMonth()+1)
  xValues.push([String(future.getDate()) + "/" + String(future.getMonth()+1)]);
}

function initMap() {
  const myLatLng = { lat: -25.363, lng: 131.044 };
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4,
    center: myLatLng,
  });

  new google.maps.Marker({
    position: myLatLng,
    map,
    title: "Your sensors!",
  });
}

function updateXValues(history, days) {
  xValues = []
  if (history) {
    for (var i = days; i >= 0; i--) {
      var future = new Date()
      future.setDate(future.getDate() - i);
      //d.getDate() - i) + "/" + String(d.getMonth()+1)
      xValues.push([String(future.getDate()) + "/" + String(future.getMonth()+1)]);
    } 
  } else if (!history) {
    for (var i = 0; i < days; i++) {
      var future = new Date()
      future.setDate(future.getDate() + i);
      //String(d.getDate() + i) + "/" + String(d.getMonth()+1)
      xValues.push([String(future.getDate()) + "/" + String(future.getMonth()+1)]);
    }
  }
}
// Initialize and add the map
function initMap() {
  // The location of Uluru
  const uluru = { lat: -25.344, lng: 131.036 };
  // The map, centered at Uluru
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4,
    center: uluru,
  });
  // The marker, positioned at Uluru
  const marker = new google.maps.Marker({
    position: uluru,
    map: map,
  });
}
// var xValues = ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun", "Mon", "Tues", "Wed"]
// listen for auth status changes
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    USER = user;
    //initMap()
    console.log("user logged in: ", user);
    // get firebase data
    var sensorListBU = [];

    document.getElementById("row").innerHTML = "<div col-lg-12><button onclick='ninetyDayHistory()' class='m-2 btn btn-lg'>90 Day History</button><button onclick='sixtyDayHistory()' class='m-2 btn btn-lg'>60 Day History</button><button onclick='thirtyDayHistory()' class='m-2 btn btn-lg'>30 Day History</button><button onclick='thirtyDayPrediction()' class='m-2 btn btn-lg'>30 Day Predictions</button><button onclick='sixtyDayPrediction()' class='m-2 btn btn-lg'>60 Day Predictions</button><button onclick='ninetyDayPrediction()' class='m-2 btn btn-lg'>90 Day Predictions</button></div>"
    var sensors = firebase.database().ref(String(user.uid));
    sensors.once("value", function (snapshot) {
      let sensor = snapshot.val();
      document.getElementById("row").innerHTML += "";
      for (let i = 0; i < sensor.length; i++) {
        document.getElementById("row").innerHTML +=
          '<div class="card col-md-6 text-center" ><div class="card-body"><h5 class="card-title">' +
          sensor[i].name +
          '</h5><canvas id="' +
          sensor[i].name +
          '" style="width:100%;max-width:700px"></canvas></div></div>';
        // HTML += '<div class="card col-md-6 text-center" ><div class="card-body"><h5 class="card-title">' + sensor[i].name + '</h5><canvas id="' + sensor[i].name + '" style="width:100%;max-width:700px"></canvas></div></div>';
        sensorList.push(sensor[i]);
        sensorListBU.push(sensor[i]);
      }
    });
    Chart.plugins.register({
      beforeDraw: function (c) {
        var legends = c.legend.legendItems;
        legends.forEach(function (e) {
          if (e.text == "soil") {
            e.fillStyle = "red";
          } else if (e.text == "temp") {
            e.fillStyle = "blue";
          } else if (e.text == "humi") {
            e.fillStyle = "yellow";
          } else if (e.text == "daylight") {
            e.fillStyle = "green";
          } else if (e.text == "wind") {
            e.fillStyle = "purple";
          }
        });
      },
    });
    setTimeout(function () {
      for (let i = 0; i < sensorList.length; i++) {
        new Chart(
          document.getElementById(sensorList[i].name).getContext("2d"),
          {
            type: "line",
            data: {
              labels: xValues,
              datasets: [
                {
                  label: "soil",
                  fill: false,
                  lineTension: 0,
                  color: "red",
                  backgroundColor: "red",
                  borderColor: "rgba(0,0,255,0.1)",
                  data: sensorList[i].soil,
                },
                {
                  label: "temp",
                  fill: false,
                  lineTension: 0,
                  color: "blue",
                  backgroundColor: "blue",
                  borderColor: "rgba(0,0,255,0.1)",
                  data: sensorList[i].temp,
                },
                {
                  label: "humi",
                  fill: false,
                  lineTension: 0,
                  color: "yellow",
                  backgroundColor: "yellow",
                  borderColor: "rgba(0,0,255,0.1)",
                  data: sensorList[i].humi,
                },
                {
                  label: "daylight",
                  fill: false,
                  lineTension: 0,
                  color: "green",
                  backgroundColor: "green",
                  borderColor: "rgba(0,0,255,0.1)",
                  data: sensorList[i].dayl,
                },
                {
                  label: "wind",
                  fill: false,
                  lineTension: 0,
                  color: "purple",
                  backgroundColor: "purple",
                  borderColor: "rgba(0,0,255,0.1)",
                  data: sensorList[i].wind,
                },
              ],
            },

            options: {
              plugins: {
                legend: {
                  display: true,
                  labels: {
                    color: "red",
                    color: "blue",
                    color: "yellow",
                    color: "green",
                    color: "purple",
                  },
                  title: {
                    color: "red",
                    color: "blue",
                    color: "yellow",
                    color: "green",
                    color: "purple",
                  },
                },
              },
              scales: {
                yAxes: [{ ticks: { min: 0, max: 200 } }],
              },
              responsive: false,
            },
          }
        );
      }
    }, 300);
  } else {
    console.log("user logged out");
    document.getElementById("row").innerHTML = "";
  }
});

const signupForm = document.querySelector("#sufo");
signupForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // get user info
  const dName = signupForm["sudn"].value;
  const phone = signupForm["supn"].value;

  const email = signupForm["suem"].value;
  const password = signupForm["supw"].value;

  console.log(email, password);

  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((cred) => {
      // Signed in
      console.log(cred);

      signupForm.reset();
      var user = cred.user;

      user
        .updateProfile({
          displayName: dName,
          phoneNumber: phone,
        })
        .then(
          function () {
            // Update successful.
          },
          function (error) {
            // An error happened.
          }
        );

      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      // ..
    });
});

const logout = document.querySelector("#logo");
logout.addEventListener("click", (e) => {
  e.preventDefault();
  firebase
    .auth()
    .signOut()
    .then(() => {
      console.log("user signed out");
    });
});

// login
const loginForm = document.querySelector("#lifo");
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // get user info

  const email = loginForm["liem"].value;
  const password = loginForm["lipw"].value;

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((cred) => {
      console.log(cred.user);

      // close the login modal and reset the form

      loginForm.reset();
    });
});
