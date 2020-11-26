var w;
var index = 0;

function startWorker() {
  document.getElementById("button").disabled = true;
  document.getElementById("add_image").removeAttribute("disabled");
  sessionStorage.setItem("div2", 0);
  sessionStorage.setItem("div3", 0);
  if(typeof(w) == "undefined") {
    w = new Worker("timer.js");
  }
  w.onmessage = function(event) {
    document.getElementById("time_result").innerHTML = event.data;
    if(event.data >= 40) {
      stopWorker();
      alert("A 장바구니 :"+sessionStorage.getItem("div2") + " B 장바구니 :"+sessionStorage.getItem("div3"));
    }
  };
}

function stopWorker() {
  document.getElementById("button").removeAttribute("disabled");
  document.getElementById("add_image").disabled = true;
  w.terminate();
  w = undefined;
}


function addImage() {
  const image = document.getElementById("image").value.split("\\");
  var str = `<img id="`+index+`" src="`+image[2]+`" draggable="true" ondragstart="drag(event)">`;
  var storage = document.getElementById("image_storage");
  storage.innerHTML += str;
  index += 1;
}

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev, id) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  var before = document.getElementById(data).parentNode.id;
  if(before == "div2")
    sessionStorage.setItem("div2", parseInt(sessionStorage.getItem("div2")) - 1);
  if(before == "div3")
    sessionStorage.setItem("div3", parseInt(sessionStorage.getItem("div3")) - 1);
  ev.target.appendChild(document.getElementById(data));
  if(id == 1)
    sessionStorage.setItem("div2", parseInt(sessionStorage.getItem("div2")) + 1);
  if(id == 2)
    sessionStorage.setItem("div3", parseInt(sessionStorage.getItem("div3")) + 1);
  //console.log("one" + sessionStorage.getItem("div2") + "two" + sessionStorage.getItem("div3"));
}
