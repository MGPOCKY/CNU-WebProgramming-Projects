//어느곳이 가장 넓을까 점수를 저장하는 변수
var area_score = 0;

var color_one;
var color_two;
var color_three;
//해당 변수가 없으면 flow가 이상하게 흘러갈 수 있다(ex:제한시간은 끝났는데, 틀렸을 떄 X초 후에 게임을 재시작하기 떄문에)
//예를 들어 게임시간이 5초이고 틀렸을 때 6초 뒤에 게임을 실행하는 함수가 있을 때 게임이 끝났는데도, 게임이 실행된다.
var area_done = false;
function largest_area() {
  document.getElementById("game_process").style.visibility="hidden";
  area_game_start();
  setTimeout(function() {
    area_done = true;
    document.getElementById("game_process").style.visibility="visible";
    //점수판에 어느곳이 가장 넓을까 점수를 추가한다
    document.getElementById("score_board").innerHTML += `<h4>어느곳이 가장 넓을까 : `+area_score+`점</h4>`;
    document.getElementById("game").innerHTML = `<h4>`+area_score+`점 입니다!!</h4>`;
    document.getElementById("game_process").setAttribute('onclick', 'see_result()');
    document.getElementById("game_process").setAttribute('value', '랭킹 등록');
    document.getElementById("rule").style.display = "none";
  }, 30000)
}

//게임 실행 함수
function area_game_start() {
  //5*6형태로 보드를 초기화한다
  var str = `
  <table id="area">
    <tr>
      <td id="0_0"></td>
      <td id="0_1"></td>
      <td id="0_2"></td>
      <td id="0_3"></td>
      <td id="0_4"></td>
      <td id="0_5"></td>
    </tr>
    <tr>
      <td id="1_0"></td>
      <td id="1_1"></td>
      <td id="1_2"></td>
      <td id="1_3"></td>
      <td id="1_4"></td>
      <td id="1_5"></td>
    </tr>
    <tr>
      <td id="2_0"></td>
      <td id="2_1"></td>
      <td id="2_2"></td>
      <td id="2_3"></td>
      <td id="2_4"></td>
      <td id="2_5"></td>
    </tr>
    <tr>
      <td id="3_0"></td>
      <td id="3_1"></td>
      <td id="3_2"></td>
      <td id="3_3"></td>
      <td id="3_4"></td>
      <td id="3_5"></td>
    </tr>
    <tr>
      <td id="4_0"></td>
      <td id="4_1"></td>
      <td id="4_2"></td>
      <td id="4_3"></td>
      <td id="4_4"></td>
      <td id="4_5"></td>
    </tr>
  </table>
  `;
  //고를 수 있는 3가지 색상의 버튼을 추가한다
  var select = `
  <pre>            </pre>
  <table id="select">
  <caption>Select One!</caption>
    <tr>
      <td id="1" onclick="area_validate(1)"></td>
    </tr>
    <tr>
      <td id="2" onclick="area_validate(2)"></td>
    </tr>
    <tr>
      <td id="3" onclick="area_validate(3)"></td>
    </tr>
  </table>
  `;
  document.getElementById("game").innerHTML = str;
  document.getElementById("game").innerHTML += select;
  init_color();
  setColor();
  setSelect();
}

//3가지 색상을 중복되지 않게 랜덤하게 선택하는 함수
function init_color() {
  //여러가지 색상을 배열의 형태로 저장한다
  var color = ["red", "cyan", "darkgreen", "deeppink", "hotpink", "lightskyblue", "lightsteelblue", "maroon", "navy", "olive", "purple", "salmon", "seagreen", "plum", "magenta", "firebrick", "black"];
  min = 0;
  max = color.length;
  //0~배열의 크기 만큼 랜덤한 값을 할당받은 뒤 select변수 안에 집어넣는다
  var select = color[Math.floor(Math.random() * (max - min)) + min];
  //color_one에 값을 할당한다
  color_one = select;
  //같은 방식으로 select가 color_one과 중복되지 않을때 까지 반복한다
  while(color_one == select) {
    select = color[Math.floor(Math.random() * (max - min)) + min];
  }
  //color_two에 값을 할당한다
  color_two = select;
  //select가 color_one과 color_two와 중복되지 않을때 까지 반복한다
  while(color_one == select || color_two == select) {
    select = color[Math.floor(Math.random() * (max - min)) + min];
  }
  //color_three에 값을 할당한다
  color_three = select;
}

//각 보드에 랜덤하게 색을 부여하는 함수
function setColor() {
  //보드의 총 개수가 30개 이므로 랜덤한 위치에 각각 9개, 10개, 11개를 할당한다
  var one_count = 0;
  var two_count = 0;
  var three_count = 0;
  //9번 반복한다
  while(one_count < 9) {
    var id = getRandomInt(0, 5) + "_" + getRandomInt(0, 6);
    //랜덤한 위치의 색상이 정의되지 않은 경우(랜덤한 색상으로 칠해지지 않은경우)가 될떄까지 반복한다
    while(document.getElementById(id).style.backgroundColor == color_one || document.getElementById(id).style.backgroundColor == color_two || document.getElementById(id).style.backgroundColor == color_three) {
      id = getRandomInt(0, 5) + "_" + getRandomInt(0, 6);
    }
    document.getElementById(id).style.backgroundColor = color_one;
    one_count += 1;
  }
  //10번 반복한다
  while(two_count < 10) {
    var id = getRandomInt(0, 5) + "_" + getRandomInt(0, 6);
    //랜덤한 위치의 색상이 정의되지 않은 경우(랜덤한 색상으로 칠해지지 않은경우)가 될떄까지 반복한다
    while(document.getElementById(id).style.backgroundColor == color_one || document.getElementById(id).style.backgroundColor == color_two || document.getElementById(id).style.backgroundColor == color_three) {
      id = getRandomInt(0, 5) + "_" + getRandomInt(0, 6);
    }
    document.getElementById(id).style.backgroundColor = color_two;
    two_count += 1;
  }
  //11번 반복한다
  while(three_count < 11) {
    var id = getRandomInt(0, 5) + "_" + getRandomInt(0, 6);
    //랜덤한 위치의 색상이 정의되지 않은 경우(랜덤한 색상으로 칠해지지 않은경우)가 될떄까지 반복한다
    while(document.getElementById(id).style.backgroundColor == color_one || document.getElementById(id).style.backgroundColor == color_two || document.getElementById(id).style.backgroundColor == color_three) {
      id = getRandomInt(0, 5) + "_" + getRandomInt(0, 6);
    }
    document.getElementById(id).style.backgroundColor = color_three;
    three_count += 1;
  }
}

//고를 수 있는 세가지 색상의 버튼의 색상을 초기화한다
function setSelect() {
  //세가지 색상을 배열에 집어넣는다
  var arr = [color_one, color_two, color_three];
  //해당 색상이 사용되었는지 여부를 저장하는 변수를 할당한다
  var used = [false, false, false];
  //랜덤하게 값을 할당받는다
  var pick = getRandomInt(0, 3);
  document.getElementById("1").style.backgroundColor = arr[pick];
  used[pick] = true;
  //해당 색상이 사용되지 않을때까지 반복한다
  while(used[pick]) {
    pick = getRandomInt(0, 3);
    document.getElementById("2").style.backgroundColor = arr[pick];
  }
  used[pick] = true;
  //해당 색상이 사용되지 않을때까지 반복한다
  while(used[pick]) {
    pick = getRandomInt(0, 3);
    document.getElementById("3").style.backgroundColor = arr[pick];
  }
}

//고른 색상이 가장 넓은지 판단하는 함수
function area_validate(select) {
  //애초에 color_three의 넓이가 가장 넓게 설정했으므로 선택한 색상이 color_three와 같을 경우 성공이고 아닐 경우 실패다
  //console.log(document.getElementById(select).style.backgroundColor);
  if(document.getElementById(select).style.backgroundColor == color_three) {
    area_score += 1;
    area_restart_game("success");
  } else {
    area_restart_game("fail");
  }
}

//정답 여부를 표시하고 게임을 재시작 하는 함수
function area_restart_game(result) {
  //만약 성공일 경우
  if(result == "success") {
    //O표시를 그려준다
    var str = `
    <table id="area">
    <tr>
      <td id="0_0"></td>
      <td id="0_1"></td>
      <td id="0_2" style="background-color:red"></td>
      <td id="0_3" style="background-color:red"></td>
      <td id="0_4"></td>
      <td id="0_5"></td>
    </tr>
    <tr>
      <td id="1_0"></td>
      <td id="1_1" style="background-color:red"></td>
      <td id="1_2"></td>
      <td id="1_3"></td>
      <td id="1_4" style="background-color:red"></td>
      <td id="1_5"></td>
    </tr>
    <tr>
      <td id="2_0" style="background-color:red"></td>
      <td id="2_1"></td>
      <td id="2_2"></td>
      <td id="2_3"></td>
      <td id="2_4"></td>
      <td id="2_5" style="background-color:red"></td>
    </tr>
    <tr>
      <td id="3_0"></td>
      <td id="3_1" style="background-color:red"></td>
      <td id="3_2"></td>
      <td id="3_3"></td>
      <td id="3_4" style="background-color:red"></td>
      <td id="3_5"></td>
    </tr>
    <tr>
      <td id="4_0"></td>
      <td id="4_1"></td>
      <td id="4_2" style="background-color:red"></td>
      <td id="4_3" style="background-color:red"></td>
      <td id="4_4"></td>
      <td id="4_5"></td>
    </tr>
  </table>
  <pre>            </pre>
  <table id="select">
  <caption>Select One!</caption>
    <tr>
      <td id="1"></td>
    </tr>
    <tr>
      <td id="2"></td>
    </tr>
    <tr>
      <td id="3"></td>
    </tr>
  </table>
  `;
  document.getElementById("game").innerHTML = str;
  //문제를 맞혔으므로 0.4초 뒤 게임을 재실헹한다
  setTimeout(function() {
    if(!area_done)
      area_game_start();
  }, 400)
  }
  else if(result == "fail") {
    //X표시를 그려준다
    var str = `
    <table id="area">
    <tr>
      <td id="0_0" style="background-color:red"></td>
      <td id="0_1"></td>
      <td id="0_2"></td>
      <td id="0_3"></td>
      <td id="0_4"></td>
      <td id="0_5" style="background-color:red"></td>
    </tr>
    <tr>
      <td id="1_0"></td>
      <td id="1_1" style="background-color:red"></td>
      <td id="1_2"></td>
      <td id="1_3"></td>
      <td id="1_4" style="background-color:red"></td>
      <td id="1_5"></td>
    </tr>
    <tr>
      <td id="2_0"></td>
      <td id="2_1"></td>
      <td id="2_2" style="background-color:red"></td>
      <td id="2_3" style="background-color:red"></td>
      <td id="2_4"></td>
      <td id="2_5"></td>
    </tr>
    <tr>
      <td id="3_0"></td>
      <td id="3_1" style="background-color:red"></td>
      <td id="3_2"></td>
      <td id="3_3"></td>
      <td id="3_4" style="background-color:red"></td>
      <td id="3_5"></td>
    </tr>
    <tr>
      <td id="4_0" style="background-color:red"></td>
      <td id="4_1"></td>
      <td id="4_2"></td>
      <td id="4_3"></td>
      <td id="4_4"></td>
      <td id="4_5" style="background-color:red"></td>
    </tr>
  </table>
  <pre>            </pre>
  <table id="select">
  <caption>Select One!</caption>
    <tr>
      <td id="1"></td>
    </tr>
    <tr>
      <td id="2"></td>
    </tr>
    <tr>
      <td id="3"></td>
    </tr>
  </table>
  `;
  //문제를 틀렸으므로 1.5초 뒤에 게임을 재실행한다
  document.getElementById("game").innerHTML = str;
  setTimeout(function() {
    if(!area_done)
      area_game_start();
  }, 1500)
  }

}
