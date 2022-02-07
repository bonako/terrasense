var sensorList = [];
var sensorListBU = [];
var history = false;

// const d = new Date();
// var xValues = [];
// for (var i = 7; i >= 0; i--) {
// xValues.push([String(d.getDate()-i) + "/" + String(d.getMonth())])
// }
// var xValues = ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun", "Mon", "Tues", "Wed"]
// listen for auth status changes
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // USER = user
    // console.log('user logged in: ', user)
    // // document.getElementById("ro").innerHTML = user;
    // // get firebase data
    // var sensorListBU = []
    // var sensors = firebase.database().ref(String(user.uid))
    // sensors.once("value", function (snapshot) {
    //   let sensor = snapshot.val()
    //   for (let i = 0; i < sensor.length; i++) {
    //     // document.getElementById("row").innerHTML += '<div class="card col-md-6 text-center" ><div class="card-body"><h5 class="card-title">' + sensor[i].name + '</h5><canvas id="' + sensor[i].name + '" style="width:100%;max-width:700px"></canvas></div></div>';
    //     HTML += '<div class="card col-md-6 text-center" ><div class="card-body"><h5 class="card-title">' + sensor[i].name + '</h5><canvas id="' + sensor[i].name + '" style="width:100%;max-width:700px"></canvas></div></div>';
    //     sensorList.push(sensor[i])
    //     sensorListBU.push(sensor[i])
    //   }
    // });
  } else {
    // console.log('user logged out')
    // document.getElementById("row").innerHTML = ''
  }
});

function getData() {
  var history = false;
  // document.getElementById("row").innerHTML = USER.uid
  document.getElementById("row").innerHTML = "<div col-lg-12><button onclick='ninetyDayHistory()' class='m-2 btn btn-lg'>90 Day History</button><button onclick='sixtyDayHistory()' class='m-2 btn btn-lg'>60 Day History</button><button onclick='thirtyDayHistory()' class='m-2 btn btn-lg'>30 Day History</button><button onclick='thirtyDayPrediction()' class='m-2 btn btn-lg'>30 Day Predictions</button><button onclick='sixtyDayPrediction()' class='m-2 btn btn-lg'>60 Day Predictions</button><button onclick='ninetyDayPrediction()' class='m-2 btn btn-lg'>90 Day Predictions</button></div>"
  var sensors = firebase.database().ref(String(USER.uid));
  sensors.once("value", function (snapshot) {
    let sensor = snapshot.val();
    document.getElementById("row").innerHTML += "";
    for (let i = 0; i < sensor.length; i++) {
      // document.getElementById("row").innerHTML += sensor
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
      new Chart(document.getElementById(sensorList[i].name).getContext("2d"), {
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
      });
    }
  }, 300);
}

// const signupForm = document.querySelector("#sufo")
// signupForm.addEventListener('submit', (e) => {

//   e.preventDefault()

//   // get user info
//   const email = signupForm['suem'].value
//   const password = signupForm['supw'].value

//   console.log(email, password)

//   firebase.auth().createUserWithEmailAndPassword(email, password)
//     .then((cred) => {
//       // Signed in
//       console.log(cred)

//       signupForm.reset()
//       var user = cred.user;
//       // ...
//     })
//     .catch((error) => {
//       var errorCode = error.code;
//       var errorMessage = error.message;
//       // ..
//     });

// })

// const logout = document.querySelector("#logo")
// logout.addEventListener("click", (e) => {
//   e.preventDefault()
//   firebase.auth().signOut().then(() => {
//     console.log("user signed out")
//   })
// })

// account
const account = document.querySelector("#acbt");
account.addEventListener("click", (e) => {
  var name, phone, email, address;
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User logged in already or has just logged in.
      // console.log(user.uid);
      name = user.displayName;
      phone = user.phoneNumber;
      email = user.email;
      address = user.address;
    } else {
      // User not logged in or has just logged out.
    }
  });
  // firebase
  //   .database()
  //   .ref("users/" + USER.uid)
  //   .once("value", (snap) => {
  //     console.log(snap.val());
  //     // phone = snap.val().phoneNumber;
  //   });
  document.getElementById("row").innerHTML =
    '<form id="sufo"><div class="form-group"><label for="displayName">Display name</label><input type="text" class="form-control" id="name" aria-describedby="dispName" value="' +
    USER.displayName +
    '"/></div><div class="form-group"><label for="phoneNumber">Phone number</label><input type="text" id="phone" class="form-control" ara-describedby="phoneNumber" placeholder="Enter phone number" value="' +
    "905-525-9140" +
    '" id="supn"/></div><div class="form-group"><label for="exampleInputEmail1">Email address</label><input type="email" class="form-control" id="email" aria-describedby="emailHelp" value="' +
    USER.email +
    '"/></div><div class="form-group">User ID</label></div><div class="form-group"></label>' +
    USER.uid +
    '</div><button onclick="update()" class="btn bg-warning">Submit</button></form>';

  e.preventDefault();
  // document.getElementById("row").innerHTML +=
  //   "Display Name: " +
  //   "<input id='name' type='text' value='" +
  //   USER.displayName +
  //   "'</input>";
  // document.getElementById("row").innerHTML +=
  //   "Phone Number: " +
  //   "<input type='text' id='phone' value='" +
  //   USER.phoneNumber +
  //   "'</input>";
  // document.getElementById("row").innerHTML +=
  //   "Email: " +
  //   "<input type='text' id='email' value='" +
  //   USER.email +
  //   "'</input>";
  // document.getElementById("row").innerHTML +=
  //   "Address: " +
  //   "<input type='text' id='addr' value='" +
  //   USER.address +
  //   "'</input>";
  // document.getElementById("row").innerHTML += "<br/>";
  // document.getElementById("row").innerHTML += "User ID: " + USER.uid;
  // document.getElementById("row").innerHTML +=
  //   "<button onclick='update()' >Update Profile</button>";
});

// var but = document.getElementById("update")
function update() {
  // firebase
  //   .auth()
  //   .currentUser.updateUser({
  //     phoneNumber: document.getElementById("phone").value,
  //   })
  //   .then(() => {
  //     //
  //   });
  firebase
    .auth()
    .currentUser.updateProfile({
      phoneNumber: document.getElementById("phone").value,
      displayName: document.getElementById("name").value,
      email: document.getElementById("email").value,
      phoneNumber: document.getElementById("phone").value,
      address: document.getElementById("addr").value,
    })
    .then(() => {
      // Email verification sent!
      // ...
    });

  // e.preventDefault();
  // var user = {
  //   name: document.getElementById("name").value,
  //   phone: document.getElementById("phone").value,
  //   address: document.getElementById("addr").value,
  //   uid: USER.uid,
  //   email: document.getElementById("email").value,
  // };

  const user = firebase.auth().currentUser;

  // user
  //   .updateProfile({
  //     displayName: document.getElementById("name").value,
  //     email: document.getElementById("email").value,
  //     phoneNumber: document.getElementById("phone").value,
  //     address: document.getElementById("addr").value,
  //   })
  //   .then(
  //     function () {
  //       // Update successful.
  //       console.log(document.getElementById("phone").value);
  //       alert("Update successful");
  //     },
  //     function (error) {
  //       // An error happened.
  //     }
  //   );

  // firebase
  //   .database()
  //   .ref("users/" + user.uid)
  //   .set(user)
  //   .catch((error) => {
  //     console.log(error.message);
  //   });
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

// function updateXValues(history, days) {
//   xValues = []
//   if (history) {
//     for (var i = days; i >= 0; i--) {

//       xValues.push([String(d.getDate() - i) + "/" + String(d.getMonth()+1)]);
//     } 
//   }
//   if (!history) {
//     for (var i = 0; i < days; i++) {
//       xValues.push([String(d.getDate() + i) + "/" + String(d.getMonth()+1)]);
//     }
//   }
//   console.log(xValues)
// }

function thirtyDayHistory() {
  days = 30
  var history = true
  updateXValues(history,days)  
  getData()

}

function sixtyDayHistory() {
  days = 60
  var history = true
  updateXValues(history,days)  
  getData()

}
function ninetyDayHistory() {
  days = 90
  var history = true
  updateXValues(history,days)  
  getData()

}
function thirtyDayPrediction() {
  days = 30
  var history = false
  updateXValues(history,days)  
  getData()

}
function sixtyDayPrediction() {
  days = 60
  var history = false
  updateXValues(history,days)  
  getData()

}
function ninetyDayPrediction() {
  var days = 90
  var history = false
  updateXValues(history,days)
  getData()
}

const charts = document.querySelector("#chrt");
charts.addEventListener("click", (e) => {
  e.preventDefault();
  getData();
  // document.getElementById("row").innerHTML = HTML
});

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

const markers = document.querySelector("#mrks");
markers.addEventListener("click", (e) => {
  e.preventDefault();
  // console.log("hello")
  //initMap()
  document.getElementById("row").innerHTML = '<img style="width: 100%; height: 100%;" src="images/map.png"></img><button class="btn btn-secondary">Add sensor</button><button class="btn btn-secondary">Edit sensor</button>'
  //setTimeout(function() {document.getElementById("map").style.display = "block"}, 300)
  // document.getElementById("map").style.display = "block"
  // document.getElementById("row").innerHTML = HTML
});

const hp = document.querySelector("#hpbt");
hp.addEventListener("click", (e) => {
  e.preventDefault();
  document.getElementById("row").innerHTML =
    '<body class="u-body"><header class="u-clearfix u-header u-header" id="sec-779b"></header><section class="u-align-center u-clearfix u-image u-shading u-section-1" src="" data-image-width="1280" data-image-height="853" id="sec-131c"><div class="u-clearfix u-sheet u-sheet-1"><h1 class="u-text u-title u-text-1">TerraSense</h1><p class="u-large-text u-text u-text-default u-text-variant u-text-2">Innovative and simple remote data monitoring systems.</p><a href="Home.html#sec-f9a4" data-page-id="33335930" class="u-btn u-button-style u-palette-2-base u-btn-1">Read More</a></div></section><section class="u-clearfix u-section-2" id="sec-f9a4"><div class="u-clearfix u-sheet u-valign-middle u-sheet-1"><div class="u-clearfix u-expanded-width u-gutter-0 u-layout-spacing-vertical u-layout-wrap u-layout-wrap-1"><div class="u-layout"><div class="u-layout-row"><div class="u-align-left u-container-style u-layout-cell u-left-cell u-size-40 u-layout-cell-1"><div class="u-container-layout u-valign-middle u-container-layout-1"><h2 class="u-text u-text-default u-text-1">About Us</h2><p class="u-text u-text-2">TerraSense produces work of the highest standards, believing in diving deep to find solutions to problems. TerraSense offers monitoring of up to five different sensors with an intuitive user interface and real-time database functionality.&nbsp;</p></div></div><div class="u-container-style u-image u-layout-cell u-right-cell u-size-20 u-image-1" src="" data-image-width="256" data-image-height="256"><div class="u-container-layout u-container-layout-2"></div></div></div></div></div></div></section><section class="u-align-center u-clearfix u-section-3" id="sec-55c7"><div class="u-clearfix u-sheet u-sheet-1"><h2 class="u-text u-text-default u-text-1">What our customers say</h2><p class="u-text u-text-2">Reviews of users of TerraSense applications.</p><div class="u-expanded-width u-list u-list-1"><div class="u-repeater u-repeater-1"><div class="u-align-center u-container-style u-list-item u-repeater-item"><div class="u-container-layout u-similar-container u-container-layout-1"><div alt="" class="u-image u-image-circle u-image-1" src="" data-image-width="256" data-image-height="256"></div><p class="u-text u-text-3">"Great product. Using it for more a while now and have had no difficulties in setting up and monitoring on my property. The battery life is very good, one charge lasts for a long time before I need to go out and recharge the device. Batteries stay safe in all conditions."</p><h5 class="u-text u-text-4">Mattie Smith</h5><h6 class="u-text u-text-5">Manager at MilkyCows Ltd.</h6></div></div><div class="u-align-center u-container-style u-list-item u-repeater-item"><div class="u-container-layout u-similar-container u-container-layout-2"><div alt="" class="u-image u-image-circle u-image-2" src="" data-image-width="256" data-image-height="256"></div><p class="u-text u-text-6">"The user interface of the application is splendid. I have had no problems with setting up my account and managing my sensors from the dashboard. very easy to use, quick response times, and fast performance."</p><h5 class="u-text u-text-7">Bertie Norton</h5><h6 class="u-text u-text-8">Secretary of Residence at KidzEducationFund</h6></div></div><div class="u-align-center u-container-style u-list-item u-repeater-item"><div class="u-container-layout u-similar-container u-container-layout-3"><div alt="" class="u-image u-image-circle u-image-3" src="" data-image-width="256" data-image-height="256"></div><p class="u-text u-text-9">"The variety of data collected is excellent. It is just what I need because I have access to temperature, daylight, humidity, wind speed, and soil moisture. I get alerts whenever they drop too low or too high and get predictions of future data."</p><h5 class="u-text u-text-10">Nat Reynolds</h5><h6 class="u-text u-text-11">Accountant-auditor at GreenGardens</h6></div></div></div></div></div></section><footer class="u-align-center u-clearfix u-footer u-grey-80 u-footer" id="sec-e037"><div class="u-clearfix u-sheet u-sheet-1"><p class="u-small-text u-text u-text-variant u-text-1">Copyright&nbsp;&nbsp;<span class="u-file-icon u-icon u-text-white"><img src="images/2.png" alt=""></span>&nbsp; TerraSense 2021-2022</p></div></footer></body>';

  // '<body class="u-body"><header class="u-clearfix u-header u-header" id="sec-779b"><div class="u-clearfix u-sheet u-sheet-1"><nav class="u-menu u-menu-dropdown u-offcanvas u-menu-1"><div class="menu-collapse" style="font-size: 1rem; letter-spacing: 0px;"><a class="u-button-style u-custom-left-right-menu-spacing u-custom-padding-bottom u-custom-top-bottom-menu-spacing u-nav-link u-text-active-palette-1-base u-text-hover-palette-2-base" href="#"><svg viewBox="0 0 24 24"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#menu-hamburger"></use></svg><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><symbol id="menu-hamburger" viewBox="0 0 16 16" style="width: 16px; height: 16px;"><rect y="1" width="16" height="2"></rect><rect y="7" width="16" height="2"></rect><rect y="13" width="16" height="2"></rect></symbol></defs></svg></a></div><div class="u-nav-container"><ul class="u-nav u-unstyled u-nav-1"><li class="u-nav-item"><a class="u-button-style u-nav-link u-text-active-palette-1-base u-text-hover-palette-2-base" href="Home.html" style="padding: 10px 20px;">Home</a></li><li class="u-nav-item"><a class="u-button-style u-nav-link u-text-active-palette-1-base u-text-hover-palette-2-base" href="About.html" style="padding: 10px 20px;">About</a></li><li class="u-nav-item"><a class="u-button-style u-nav-link u-text-active-palette-1-base u-text-hover-palette-2-base" href="Contact.html" style="padding: 10px 20px;">Contact</a></li></ul></div><div class="u-nav-container-collapse"><div class="u-black u-container-style u-inner-container-layout u-opacity u-opacity-95 u-sidenav"><div class="u-inner-container-layout u-sidenav-overflow"><div class="u-menu-close"></div><ul class="u-align-center u-nav u-popupmenu-items u-unstyled u-nav-2"><li class="u-nav-item"><a class="u-button-style u-nav-link" href="Home.html">Home</a></li><li class="u-nav-item"><a class="u-button-style u-nav-link" href="About.html">About</a></li><li class="u-nav-item"><a class="u-button-style u-nav-link" href="Contact.html">Contact</a></li></ul></div></div><div class="u-black u-menu-overlay u-opacity u-opacity-70"></div></div></nav><a href="https://nicepage.com" class="u-image u-logo u-image-1"><img src="images/default-logo.png" class="u-logo-image u-logo-image-1"></a></div></header><section class="u-align-center u-clearfix u-image u-shading u-section-1" src="" data-image-width="1280" data-image-height="853" id="sec-131c"><div class="u-clearfix u-sheet u-sheet-1"><h1 class="u-text u-title u-text-1">TerraSense</h1><p class="u-large-text u-text u-text-default u-text-variant u-text-2">Innovative and simple remote data monitoring systems.</p><a href="#" class="u-btn u-button-style u-palette-2-base u-btn-1">Read More</a></div></section><section class="u-align-center u-clearfix u-section-2" id="sec-55c7"><div class="u-clearfix u-sheet u-sheet-1"><h2 class="u-text u-text-default u-text-1">What our customers say</h2><p class="u-text u-text-2">Reviews of users of TerraSense applications.</p><div class="u-expanded-width u-list u-list-1"><div class="u-repeater u-repeater-1"><div class="u-align-center u-container-style u-list-item u-repeater-item"><div class="u-container-layout u-similar-container u-container-layout-1"><div alt="" class="u-image u-image-circle u-image-1" src="" data-image-width="256" data-image-height="256"></div><p class="u-text u-text-3">"Great product. Using it for more a while now and have had no difficulties in setting up and monitoring on my property. The battery life is very good, one charge lasts for a long time before I need to go out and recharge the device. Batteries stay safe in all conditions."</p><h5 class="u-text u-text-4">Mattie Smith</h5><h6 class="u-text u-text-5">Manager at MilkyCows Ltd.</h6></div></div><div class="u-align-center u-container-style u-list-item u-repeater-item"><div class="u-container-layout u-similar-container u-container-layout-2"><div alt="" class="u-image u-image-circle u-image-2" src="" data-image-width="256" data-image-height="256"></div><p class="u-text u-text-6">"The user interface of the application is splendid. I have had no problems with setting up my account and managing my sensors from the dashboard. very easy to use, quick response times, and fast performance."</p><h5 class="u-text u-text-7">Bertie Norton</h5><h6 class="u-text u-text-8">Secretary of Residence at KidzEducationFund</h6></div></div><div class="u-align-center u-container-style u-list-item u-repeater-item"><div class="u-container-layout u-similar-container u-container-layout-3"><div alt="" class="u-image u-image-circle u-image-3" src="" data-image-width="256" data-image-height="256"></div><p class="u-text u-text-9">"The variety of data collected is excellent. It is just what I need because I have access to temperature, daylight, humidity, wind speed, and soil moisture. I get alerts whenever they drop too low or too high and get predictions of future data."</p><h5 class="u-text u-text-10">Nat Reynolds</h5><h6 class="u-text u-text-11">Accountant-auditor at GreenGardens</h6></div></div></div></div></div></section><footer class="u-align-center u-clearfix u-footer u-grey-80 u-footer" id="sec-e037"><div class="u-clearfix u-sheet u-sheet-1"><p class="u-small-text u-text u-text-variant u-text-1">Sample text. Click to select the text box. Click again or double click to start editing the text.</p></div></footer><section class="u-backlink u-clearfix u-grey-80"><a class="u-link" href="https://nicepage.com/website-templates" target="_blank"><span>Website Templates</span></a><p class="u-text"><span>created with</span></p><a class="u-link" href="" target="_blank"><span>Website Builder Software</span></a>.</section></body>';
  ('body class="u-body"><header class="u-clearfix u-header u-header" id="sec-779b"><div class="u-clearfix u-sheet u-sheet-1"><a href="https://nicepage.com" class="u-image u-logo u-image-1"><img src="images/default-logo.png" class="u-logo-image u-logo-image-1"></a></div></header><section class="u-align-center u-clearfix u-image u-shading u-section-1" src="" data-image-width="1280" data-image-height="853" id="sec-131c"><div class="u-clearfix u-sheet u-sheet-1"><h1 class="u-text u-title u-text-1">TerraSense</h1><p class="u-large-text u-text u-text-default u-text-variant u-text-2">Innovative and simple remote data monitoring systems.</p><a href="Home.html#sec-f9a4" data-page-id="33335930" class="u-btn u-button-style u-palette-2-base u-btn-1">Read More</a></div></section><section class="u-clearfix u-section-2" id="sec-f9a4"><div class="u-clearfix u-sheet u-valign-middle u-sheet-1"><div class="u-clearfix u-expanded-width u-gutter-0 u-layout-spacing-vertical u-layout-wrap u-layout-wrap-1"><div class="u-layout"><div class="u-layout-row"><div class="u-align-left u-container-style u-layout-cell u-left-cell u-size-40 u-layout-cell-1"><div class="u-container-layout u-valign-middle u-container-layout-1"><h2 class="u-text u-text-default u-text-1">About Us</h2><p class="u-text u-text-2">TerraSense produces work of the highest standards, believing in diving deep to find solutions to problems. TerraSense offers monitoring of up to five different sensors with an intuitive user interface and real-time database functionality.&nbsp;</p></div></div><div class="u-container-style u-image u-layout-cell u-right-cell u-size-20 u-image-1" src="" data-image-width="256" data-image-height="256"><div class="u-container-layout u-container-layout-2"></div></div></div></div></div></div></section><section class="u-align-center u-clearfix u-section-3" id="sec-55c7"><div class="u-clearfix u-sheet u-sheet-1"><h2 class="u-text u-text-default u-text-1">What our customers say</h2><p class="u-text u-text-2">Reviews of users of TerraSense applications.</p><div class="u-expanded-width u-list u-list-1"><div class="u-repeater u-repeater-1"><div class="u-align-center u-container-style u-list-item u-repeater-item"><div class="u-container-layout u-similar-container u-container-layout-1"><div alt="" class="u-image u-image-circle u-image-1" src="" data-image-width="256" data-image-height="256"></div><p class="u-text u-text-3">"Great product. Using it for more a while now and have had no difficulties in setting up and monitoring on my property. The battery life is very good, one charge lasts for a long time before I need to go out and recharge the device. Batteries stay safe in all conditions."</p><h5 class="u-text u-text-4">Mattie Smith</h5><h6 class="u-text u-text-5">Manager at MilkyCows Ltd.</h6></div></div><div class="u-align-center u-container-style u-list-item u-repeater-item"><div class="u-container-layout u-similar-container u-container-layout-2"><div alt="" class="u-image u-image-circle u-image-2" src="" data-image-width="256" data-image-height="256"></div><p class="u-text u-text-6">"The user interface of the application is splendid. I have had no problems with setting up my account and managing my sensors from the dashboard. very easy to use, quick response times, and fast performance."</p><h5 class="u-text u-text-7">Bertie Norton</h5><h6 class="u-text u-text-8">Secretary of Residence at KidzEducationFund</h6></div></div><div class="u-align-center u-container-style u-list-item u-repeater-item"><div class="u-container-layout u-similar-container u-container-layout-3"><div alt="" class="u-image u-image-circle u-image-3" src="" data-image-width="256" data-image-height="256"></div><p class="u-text u-text-9">"The variety of data collected is excellent. It is just what I need because I have access to temperature, daylight, humidity, wind speed, and soil moisture. I get alerts whenever they drop too low or too high and get predictions of future data."</p><h5 class="u-text u-text-10">Nat Reynolds</h5><h6 class="u-text u-text-11">Accountant-auditor at GreenGardens</h6></div></div></div></div></div></section><footer class="u-align-center u-clearfix u-footer u-grey-80 u-footer" id="sec-e037"><div class="u-clearfix u-sheet u-sheet-1"><p class="u-small-text u-text u-text-variant u-text-1">Copyright&nbsp;&nbsp;<span class="u-file-icon u-icon u-text-white"><img src="images/2.png" alt=""></span>&nbsp; TerraSense 2021-2022</p></div></footer><section class="u-backlink u-clearfix u-grey-80"><a class="u-link" href="https://nicepage.com/website-templates" target="_blank"><span>Website Templates</span></a><p class="u-text"><span>created with</span></p><a class="u-link" href="" target="_blank"><span>Website Builder Software</span></a>.</section></body>');

  // document.getElementById("row").innerHTML = HTML
});

async function fetchWeather() {
  const API_KEY = "ba7f70eeb3225dcf3d697a0a16cf476a"
  const country_code = "124"
  const city_name = "Hamilton"
  const response = await fetch('https://pro.openweathermap.org/data/2.5/forecast/climate?q=Hamilton,124&appid=ba7f70eeb3225dcf3d697a0a16cf476a')
  const data = await response.json()
  console.log(data)
}

// fetchWeather()

// login
// const loginForm = document.querySelector("#lifo")
// loginForm.addEventListener("submit", (e) => {
//   e.preventDefault()

//   // get user info

//   const email = loginForm['liem'].value
//   const password = loginForm['lipw'].value

//   firebase.auth().signInWithEmailAndPassword(email, password).then(cred => {
//     console.log(cred.user)

//     // close the login modal and reset the form

//     loginForm.reset()
//   })
// })
