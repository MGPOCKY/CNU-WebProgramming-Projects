function add() {
  var list = document.getElementById("list");
  var node = document.createElement("LI");
  node.innerHTML += document.getElementById("text").value;
  node.addEventListener("click", function (e) {
    modifylist(e, node);
  });
  list.appendChild(node);
}

function modifylist(e, node) {
  var input = window.prompt("삭제는 1, 수정은 2를 입력하세요.");
  if (input == null) {
    alert("취소되었습니다.");
  } else if (input == "") {
    alert("번호를 입력하지 않으셨습니다.");
  } else if (input == "1") {
    deleteObject(node);
  } else if (input == "2") {
    modifyObject(node);
  } else {
    alert("번호를 잘못 입력하셨습니다.");
  }
}

function modifyObject(node) {
  var change = window.prompt("변경할 내용을 입력하세요");
  node.innerHTML = change;
}

function deleteObject(node) {
  var list = document.getElementById("list");
  list.removeChild(node);
}
