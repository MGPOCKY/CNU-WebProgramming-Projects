//점수를 저장하는 heart_score변수
var heart_score = 0;
//해당 변수가 없으면 flow가 이상하게 흘러갈 수 있다(ex:제한시간은 끝났는데, 틀렸을 떄 X초 후에 게임을 재시작하기 떄문에)
//예를 들어 게임시간이 5초이고 틀렸을 때 6초 뒤에 게임을 실행하는 함수가 있을 때 게임이 끝났는데도, 게임이 실행된다.
var heart_done = false;

//하트를 찾아라를 실행시켰을 때 처음 실행되는 함수
function find_heart() {
  //game_process태그를 안보이도록 설정한 뒤 게임을 시작한다
  document.getElementById("game_process").style.visibility="hidden";
  heart_game_start();
  //30초 뒤 게임이 종료되고 점수를 출력한다
  //game_process태그를 게임이 종료된 후에 보이도록 한다
  setTimeout(function() {
    heart_done = true;
    document.getElementById("game_process").style.visibility="visible";
    //하트를 찾아라 점수를 추가함
    document.getElementById("score_board").innerHTML += `<h4>하트를 찾아라 : `+heart_score+`점</h4>`;
    document.getElementById("game").innerHTML = `<h4>`+heart_score+`점 입니다!!</h4>`;
    document.getElementById("game_process").setAttribute('onclick', 'largest_area()');
    document.getElementById("game_process").setAttribute('value', '어느곳이 넓을까?');
  }, 30000);
}

//게임의 내용을 초기화 하고 보여주는 함수
function heart_game_start() {
  //배열을 이용하여 여러가지 아이콘들을 저장한다
  var icon = ["fas fa-heart", "far fa-grin-tongue", "fas fa-star", "fas fa-egg", "fas fa-hat-cowboy", "fas fa-female", "fas fa-carrot"];
  //배열을 이용하여 여러가지 색상들을 저장한다
  var color = ["red", "cyan", "darkgreen", "deeppink", "hotpink", "lightskyblue", "lightsteelblue", "maroon", "navy", "olive", "purple", "salmon", "seagreen", "plum", "magenta", "firebrick", "black"];
  //각 배열의 길이만큼 random한 값을 할당받아서 랜덤한 아이콘과 랜덤한 색상을 상, 하, 좌, 우에 배치시킨다
  //중앙에는 X표시를 넣어 만일 상, 하, 좌, 우 모두에 하트가 존재하지 않을 경우 X버튼을 눌러 정답을 확인한다
  //getRandomInt함수를 이용하여 정해진 범위 내에서 무작위의 정수를 리턴받는다
  //id가 game인 태그 안에 집어넣는다
  //상, 하, 좌, 우, X를 담고 있는 버튼을 클릭했을 때 해당 id를 매개변수로 하여 해당 버튼이 올바른 입력인지 판단하는 validate함수로 넘어간다
  var str = `
  <table id="heart">
  <caption>Score : `+heart_score+`</caption>
    <tr>
      <td class="blank"></td>
      <td onclick="heart_validate(up)"><i id="up" class="`+icon[getRandomInt(0, icon.length)]+`" style="color:`+color[getRandomInt(0, color.length)]+`;font-size:50px"></i></td>
      <td class="blank"></td>
    </tr>
    <tr>
    <td onclick="heart_validate(left)"><i id="left" class="`+icon[getRandomInt(0, icon.length)]+`" style="color:`+color[getRandomInt(0, color.length)]+`;font-size:50px"></i></td>
    <td class="blank"  onclick="heart_validate(X)"><i id="X" class="fas fa-times" style="color:red;font-size:70px"></i></td>
    <td onclick="heart_validate(right)"><i id="right" class="`+icon[getRandomInt(0, icon.length)]+`" style="color:`+color[getRandomInt(0, color.length)]+`;font-size:50px"></i></td>

      </td>
    </tr>
    <tr>
      <td class="blank"></td>
      <td onclick="heart_validate(down)"><i id="down" class="`+icon[getRandomInt(0, icon.length)]+`" style="color:`+color[getRandomInt(0, color.length)]+`;font-size:50px"></i></td>
      <td class="blank"></td>
    </tr>
  </table>
  `;
  document.getElementById("game").innerHTML = str;
}

//버튼을 클릭했을 때 해당 버튼이 올바른 입력인지 판단하는 함수
function heart_validate(select) {
  //누른 버튼이 X일 경우
  if(select.id == "X") {
    //각 버튼의 className을 저장한다
    var up = document.getElementById("up").className;
    var left = document.getElementById("left").className;
    var right = document.getElementById("right").className;
    var down = document.getElementById("down").className;
    //만일 네개의 버튼 모두 하트가 아닐 경우(X가 올바른 입력인 경우)
    if (up != "fas fa-heart" && left != "fas fa-heart" && right != "fas fa-heart" && down != "fas fa-heart") {
      //점수를 1 증가시키고 성공했다는 문자열과 함께 restart_game을 호출한다
      heart_score += 1;
      heart_restart_game("success");
    }
    //만일 네개의 버튼 중 하나라도 하트일 경우(X가 올바른 입력이 아닐 경우)
    else {
      //실패했다는 문자열과 함께 restart_game을 호출한다
      heart_restart_game("fail");
    }
  }
  //누른 버튼이 상, 하, 좌, 우 중 하나일 경우
  else {
    //누른 버튼의 className을 저장한다
    var className = select.className;
    //누른 버튼이 하트일 경우(올바른 입력인 경우)
    if(className == "fas fa-heart") {
      //점수를 1 증가시키고 성공했다는 문자열과 함께 restart_game을 호출한다
      heart_score += 1;
      heart_restart_game("success");
    }
    //누른 버튼이 하트가 아닐 경우(올바른 입력이 아닌 경우)
    else {
      //실패했다는 문자열과 함께 restart_game을 호출한다
      heart_restart_game("fail");
    }
  }
}

//게임을 다시 init하는데 무작위로 연타하는것을 방지하기 위해 일정 시간이 흐른 뒤 다시 init하게 한다
function heart_restart_game(result) {
  //만일 입력이 fail인 경우
  if(result == "fail") {
    //X표시를 빨간색으로 만들어 출력한다(1초동안)
    var str = `
  <table id="heart">
  <caption>Score : `+heart_score+`</caption>
    <tr>
      <td style="background-color:red"></td>
      <td></td>
      <td style="background-color:red"></td>
    </tr>
    <tr>
      <td></td>
      <td style="background-color:red"></td>
      <td></td>
    </tr>
    <tr>
      <td style="background-color:red"></td>
      <td></td>
      <td style="background-color:red"></td>
    </tr>
  </table>
  `;
  document.getElementById("game").innerHTML = str;
  //1초뒤 게임을 다시 init한다
  setTimeout(function() {
    if(!heart_done)
      heart_game_start();
  }, 1000)
  }
  //만일 입력이 success인 경우
  else if(result == "success") {
    //O표시를 빨간색으로 만들어 출력한다(0.5초동안)
    var str = `
  <table id="heart">
  <caption>Score : `+heart_score+`</caption>
    <tr>
      <td style="background-color:red"></td>
      <td style="background-color:red"></td>
      <td style="background-color:red"></td>
    </tr>
    <tr>
      <td style="background-color:red"></td>
      <td></td>
      <td style="background-color:red"></td>
    </tr>
    <tr>
      <td style="background-color:red"></td>
      <td style="background-color:red"></td>
      <td style="background-color:red"></td>
    </tr>
  </table>
  `;
  document.getElementById("game").innerHTML = str;
  //0.5초뒤 게임을 다시 init한다
  setTimeout(function() {
    if(!heart_done)
      heart_game_start();
  }, 500)
  }

}

//범위를 지정하여 min값과 max값의 범위 안에 있는 정수를 return하는 함수
//참조 : https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
