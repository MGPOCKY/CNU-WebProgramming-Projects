function CartIn() {
  var str = `
  <div class="cart">
  <label class="register">상품 장바구니 등록</label> <br />
  <br />
  상품 이미지 :
  <input type="file" id="image" />
  <br />
  상품 이름 : <input type="text" id="name" /><br />
  상품 가격 : <input type="text" id="price" style="width: 80px" /><br />
  상품 개수 : <input type="text" id="count" style="width: 50px" /> 최대
  50개 이하까지 선택 가능<br />
  배송 방법 : <input type="radio" name="chk_delever" value="normal" />일반
  배송 <input type="radio" name="chk_delever" value="dawn" />새벽 배송<br />
  <br />
  <input type="button" value="장바구니 담기" onclick="Validater()" />
  <input type="button" value="취소" onclick="CartOut()" />
  </div>
  `;
  document.getElementById("Cart").innerHTML = str;
}
function CartOut() {
  var str = ``;
  document.getElementById("Cart").innerHTML = str;
}

function SelectedDelete(type) {
  var parent = document.getElementById(type + "-cart");
  var cart = document.getElementById(type + "-cart");
  if (parent.hasChildNodes()) {
    var children = parent.childNodes;
    for (var i = 0; i < children.length; i++) {
      if (children[i].getElementsByTagName("input")[0].checked) {
        cart.removeChild(children[i]);
        i--;
        continue;
      }
    }
  }
  CalculatePrice();
  CheckAllSelected();
}

function SelectedMove(from, to) {
  var parent = document.getElementById(from + "-cart");
  var fromcart = document.getElementById(from + "-cart");
  var tocart = document.getElementById(to + "-cart");
  if (parent.hasChildNodes()) {
    var children = parent.childNodes;
    for (var i = 0; i < children.length; i++) {
      if (children[i].getElementsByTagName("input")[0].checked) {
        children[i].getElementsByTagName("input")[0].checked = false;
        var temp = children[i];
        fromcart.removeChild(temp);
        tocart.appendChild(temp);
        i--;
        continue;
      }
    }
  }
  CalculatePrice();
  CheckAllSelected();
}

function All(type) {
  var parent = document.getElementById(type + "-check");
  if (parent.checked) {
    CheckAll(type + "-cart");
  } else if (!parent.checked) {
    UnCheckAll(type + "-cart");
  }
}

function CheckAll(type) {
  var parent = document.getElementById(type);
  if (parent.hasChildNodes()) {
    var children = parent.childNodes;
    for (var i = 0; i < children.length; i++) {
      children[i].getElementsByTagName("input")[0].checked = true;
    }
  }
  CalculatePrice();
}

function UnCheckAll(type) {
  var parent = document.getElementById(type);
  if (parent.hasChildNodes()) {
    var children = parent.childNodes;
    for (var i = 0; i < children.length; i++) {
      children[i].getElementsByTagName("input")[0].checked = false;
    }
  }
  CalculatePrice();
}

function FindAll() {
  var name = document.getElementById("Object_name").value;
  var min = document.getElementById("Object_price_min").value;
  var max = document.getElementById("Object_price_max").value;
  if (min == "") min = Number.MIN_SAFE_INTEGER;
  if (max == "") max = Number.MAX_SAFE_INTEGER;
  var normal = document.getElementById("normal-cart");
  var dawn = document.getElementById("dawn-cart");
  if (normal.hasChildNodes()) {
    var children = normal.childNodes;
    for (var i = 0; i < children.length; i++) {
      if (
        String(
          children[i].getElementsByClassName("name")[0].innerText
        ).includes(name)
      ) {
        if (
          parseInt(min) <=
            parseInt(
              children[i].getElementsByClassName("range")[0].innerText
            ) &&
          parseInt(children[i].getElementsByClassName("range")[0].innerText) <=
            parseInt(max)
        ) {
          children[i].id = "find";
        }
      }
    }
  }
  if (dawn.hasChildNodes()) {
    var children = dawn.childNodes;
    for (var i = 0; i < children.length; i++) {
      if (
        String(
          children[i].getElementsByClassName("name")[0].innerText
        ).includes(name)
      ) {
        if (
          parseInt(min) <=
            parseInt(
              children[i].getElementsByClassName("range")[0].innerText
            ) &&
          parseInt(children[i].getElementsByClassName("range")[0].innerText) <=
            parseInt(max)
        ) {
          children[i].id = "find";
        }
      }
    }
  }
}

function RecoverAll() {
  var normal = document.getElementById("normal-cart");
  var dawn = document.getElementById("dawn-cart");
  if (normal.hasChildNodes()) {
    var children = normal.childNodes;
    for (var i = 0; i < children.length; i++) {
      if (children[i].id == "find") children[i].id = "";
    }
  }
  if (dawn.hasChildNodes()) {
    var children = dawn.childNodes;
    for (var i = 0; i < children.length; i++) {
      if (children[i].id == "find") children[i].id = "";
    }
  }
}

function CheckAllSelected() {
  var normal = document.getElementById("normal-cart");
  var dawn = document.getElementById("dawn-cart");
  var pass = true;
  if (normal.hasChildNodes()) {
    var children = normal.childNodes;
    for (var i = 0; i < children.length; i++) {
      if (!children[i].getElementsByTagName("input")[0].checked) pass = false;
    }
  } else {
    pass = false;
  }
  if (pass) {
    document.getElementById("normal-check").checked = true;
  } else {
    document.getElementById("normal-check").checked = false;
  }
  pass = true;
  if (dawn.hasChildNodes()) {
    var children = dawn.childNodes;
    for (var i = 0; i < children.length; i++) {
      if (!children[i].getElementsByTagName("input")[0].checked) pass = false;
    }
  } else {
    pass = false;
  }
  if (pass) {
    document.getElementById("dawn-check").checked = true;
  } else {
    document.getElementById("dawn-check").checked = false;
  }
}

function CalculatePrice() {
  var normal = document.getElementById("normal-cart");
  var dawn = document.getElementById("dawn-cart");
  var sum = 0;
  if (normal.hasChildNodes()) {
    var children = normal.childNodes;
    for (var i = 0; i < children.length; i++) {
      if (children[i].getElementsByTagName("input")[0].checked) {
        sum += parseInt(
          children[i].getElementsByClassName("price")[0].innerText
        );
      }
    }
  }
  document.getElementById("normal-price").innerHTML = sum;
  sum = 0;
  if (dawn.hasChildNodes()) {
    var children = dawn.childNodes;
    for (var i = 0; i < children.length; i++) {
      if (children[i].getElementsByTagName("input")[0].checked) {
        sum += parseInt(
          children[i].getElementsByClassName("price")[0].innerText
        );
      }
    }
  }
  document.getElementById("dawn-price").innerHTML = sum;
}

function addObject() {
  const image = document.getElementById("image").value.split("\\");
  const name = document.getElementById("name").value;
  const price = document.getElementById("price").value;
  const count = document.getElementById("count").value;
  const delevery = document.getElementsByName("chk_delever");

  var cart;
  if (delevery[0].checked) {
    cart = document.getElementById("normal-cart");
  } else if (delevery[1].checked) {
    cart = document.getElementById("dawn-cart");
  }
  var node = document.createElement("TR");
  node.innerHTML += `<td class="check"><input type="checkbox" onClick="CheckAllSelected(), CalculatePrice()" checked></td>`;
  node.innerHTML +=
    `<td><img src="./` + image[2] + `" width="80" height="80"/></td>`;
  node.innerHTML += `<td class="name">` + name + `</td>`;
  node.innerHTML += `<td class="range">` + price + `</td>`;
  node.innerHTML += `<td>` + count + `</td>`;
  node.innerHTML +=
    `<td class="price">` + parseInt(price) * parseInt(count) + `</td>`;

  cart.appendChild(node);
  CalculatePrice();
  CheckAllSelected();
  CartOut();
}

function Validater() {
  const image = document.getElementById("image").value.split(".");
  const name = document.getElementById("name").value;
  const price = document.getElementById("price").value;
  const count = document.getElementById("count").value;
  const delevery = document.getElementsByName("chk_delever");
  var valid = true;
  if (image == "") {
    alert("상품 이미지를 추가하시오.");
    valid = false;
  } else if (image[1] != "jpg" && image[1] != "png" && image[1] != "jpeg") {
    alert(
      `이미지 파일이 아닙니다. 'jpg', 'jpeg' 또는 'png'을 확장자로 가진 파일을 추가하시오.`
    );
    valid = false;
  }
  if (name == "") {
    alert("상품 이름을 입력하시오.");
    valid = false;
  } else if (!isNaN(name)) {
    alert(`문자로된 상품 이름을 입력하시오.`);
    valid = false;
  }
  if (price == "") {
    alert("상품 가격을 입력하시오.");
    valid = false;
  } else if (isNaN(price)) {
    alert(`상품 가격에 숫자를 입력하시오.`);
    valid = false;
  } else if (parseInt(price) < 1000) {
    alert(`상품 가격을 1000원 이상으로 입력하시오.`);
    valid = false;
  }
  if (count == "") {
    alert("상품 개수를 입력하시오.");
    valid = false;
  } else if (isNaN(count)) {
    alert(`상품 가격에 숫자를 입력하시오.`);
    valid = false;
  } else if (!(0 < parseInt(count) && parseInt(count) <= 50)) {
    alert(`최대 50개 이하로 선택하시오.`);
    valid = false;
  }
  if (!delevery[0].checked && !delevery[1].checked) {
    alert("배송 방법을 선택하시오.");
    valid = false;
  }
  if (valid) {
    addObject();
  }
}
