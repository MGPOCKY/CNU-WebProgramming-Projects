//점수를 의미하는 mem_count변수
var mem_count = 1;
//눌러야 하는 버튼의 정보를 기억하는 문자열 변수
var lists = "";
//게임이 끝났는지 여부를 저장하는 변수
//해당 변수가 없으면 flow가 이상하게 흘러갈 수 있다(ex:제한시간은 끝났는데, 틀렸을 떄 X초 후에 게임을 재시작하기 떄문에)
//예를 들어 게임시간이 5초이고 틀렸을 때 6초 뒤에 게임을 실행하는 함수가 있을 때 게임이 끝났는데도, 게임이 실행된다.
var mem_done = false;

//기억력 테스트 함수를 실행시켰을 때 실행되는 함수
function mem_test() {
  var list = "";
  document.getElementById("game_process").style.visibility="hidden";
  init_mem(1, list);
  //60초 후에 다음 게임으로 넘어갈 수 있게 한다
  setTimeout(function() {
    mem_done = true;
    document.getElementById("game_process").style.visibility="visible";
    //기억력 테스트 점수를 점수판에 추가한다
    document.getElementById("score_board").innerHTML += `<h4>기억력 테스트 : `+mem_count+`점</h4>`;
    document.getElementById("game").innerHTML = `<h4>`+mem_count+`점 입니다!!</h4>`;
    document.getElementById("game_process").setAttribute('onclick', 'find_heart()');
    document.getElementById("game_process").setAttribute('value', '하트를 찾아라');
  }, 60000)
}

//눌러야 하는 버튼을 초기화 하는 함수
function init_mem(mem_count, list) {
  //5*5 배열의 형태로 보드를 짠다
  //편의성을 위해 mem_m번째 행_n번째 열로 id값을 할당한다
  var str = `
  <table id="mem">
    <tr>
      <td id="mem_0_0"></td>
      <td id="mem_0_1"></td>
      <td id="mem_0_2"></td>
      <td id="mem_0_3"></td>
      <td id="mem_0_4"></td>
    </tr>
    <tr>
      <td id="mem_1_0"></td>
      <td id="mem_1_1"></td>
      <td id="mem_1_2"></td>
      <td id="mem_1_3"></td>
      <td id="mem_1_4"></td>
    </tr>
    <tr>
      <td id="mem_2_0"></td>
      <td id="mem_2_1"></td>
      <td id="mem_2_2"></td>
      <td id="mem_2_3"></td>
      <td id="mem_2_4"></td>
    </tr>
    <tr>
      <td id="mem_3_0"></td>
      <td id="mem_3_1"></td>
      <td id="mem_3_2"></td>
      <td id="mem_3_3"></td>
      <td id="mem_3_4"></td>
    </tr>
    <tr>
      <td id="mem_4_0"></td>
      <td id="mem_4_1"></td>
      <td id="mem_4_2"></td>
      <td id="mem_4_3"></td>
      <td id="mem_4_4"></td>
    </tr>
  </table>
  `;
  document.getElementById("game").innerHTML = str;
  //mem_count가 0보다 크다면 눌려야 하는 버튼을 만들어서 list 변수 안에 추가한다
  if (mem_count > 0) {
    //Math.random함수를 이용하여 0부터 4까지의 값중 랜덤한 값을 각각 x, y에 저장한다
    var x = Math.floor(Math.random() * 5);
    var y = Math.floor(Math.random() * 5);
    var str = "mem_"+x + "_" + y;
    //해당 값의 id를 가진 태그의 스타일을 바꾼다
    document.getElementById(str).style.backgroundColor = "red";
    //리스트에 행열의 인덱스 + 공백의 형태로 저장한다.
    list += x + "" + y + " ";
    //0.6초동안 눌러야 하는 버튼을 빨간색으로 보여준 뒤, 0.6초 뒤에 다시 처음 색으로 초기화한다
    setTimeout(function() {
      document.getElementById(str).style.backgroundColor = "wheat";
      //재귀함수를 이용하여 mem_count가 0이 될떄 까지 해당 작업을 반복한다
      init_mem(mem_count - 1, list);
    }, 600);
  }
  //만일 mem_count가 0보다 크지 않다면 사용자의 입력을 받아들이는 함수인 input_press를 list를 매개변수로 하여 실행한다
  else {
    input_press(list);
  }
}

//사용자의 입력을 받아들이는 input_press함수
function input_press(list) {
  //split을 이용하여 공백으로 list를 split하여 배열에 저장한다
  var arr = list.split(' ');
  //없어도 되지만 직관성을 위해 if문을 추가하였다
  //만일 mem_count가 1인 상태에서 init_mem을 실행한 상태면 list안에는 "xy "이 저장되는데 이를 split하면 arr[] = {"xy", ""}
  //저장되어 arr.length의 값은 2가 된다.
  if(arr.length > 1) {
    //기존 테이블을 입력을 받아들일 준비가 되어있는 테이블로 변경한다
    var str = `
      <table id="mem">
        <tr>
          <td id="mem_0_0" onclick="check_value(00)"></td>
          <td id="mem_0_1" onclick="check_value(01)"></td>
          <td id="mem_0_2" onclick="check_value(02)"></td>
          <td id="mem_0_3" onclick="check_value(03)"></td>
          <td id="mem_0_4" onclick="check_value(04)"></td>
        </tr>
        <tr>
          <td id="mem_1_0" onclick="check_value(10)"></td>
          <td id="mem_1_1" onclick="check_value(11)"></td>
          <td id="mem_1_2" onclick="check_value(12)"></td>
          <td id="mem_1_3" onclick="check_value(13)"></td>
          <td id="mem_1_4" onclick="check_value(14)"></td>
        </tr>
        <tr>
          <td id="mem_2_0" onclick="check_value(20)"></td>
          <td id="mem_2_1" onclick="check_value(21)"></td>
          <td id="mem_2_2" onclick="check_value(22)"></td>
          <td id="mem_2_3" onclick="check_value(23)"></td>
          <td id="mem_2_4" onclick="check_value(24)"></td>
        </tr>
        <tr>
          <td id="mem_3_0" onclick="check_value(30)"></td>
          <td id="mem_3_1" onclick="check_value(31)"></td>
          <td id="mem_3_2" onclick="check_value(32)"></td>
          <td id="mem_3_3" onclick="check_value(33)"></td>
          <td id="mem_3_4" onclick="check_value(34)"></td>
        </tr>
        <tr>
          <td id="mem_4_0" onclick="check_value(40)"></td>
          <td id="mem_4_1" onclick="check_value(41)"></td>
          <td id="mem_4_2" onclick="check_value(42)"></td>
          <td id="mem_4_3" onclick="check_value(43)"></td>
          <td id="mem_4_4" onclick="check_value(44)"></td>
        </tr>
      </table>
      `;
      //전역변수 lists의 값에 list의 값을 집어넣는다
      lists = list;
    document.getElementById("game").innerHTML = str;
  }
}

//input_press함수에서 테이블이 입력을 받아들을 준비가 되었을 때의 입력값과 눌러야 하는 입력값을 비교하는 함수
function check_value(input) {
  //check_value함수를 처리하는 도중 중복 입력을 막기 위해 다시 입력을 받아들일 수 없는 상태로 바꿔놓는다
  //해당 부분이 없을 때에는 같은 버튼을 빨리 연타해서 중복해서 눌렀을 때 함수가 꼬이게 된다
  var str = `
  <table id="mem">
    <tr>
      <td id="mem_0_0"></td>
      <td id="mem_0_1"></td>
      <td id="mem_0_2"></td>
      <td id="mem_0_3"></td>
      <td id="mem_0_4"></td>
    </tr>
    <tr>
      <td id="mem_1_0"></td>
      <td id="mem_1_1"></td>
      <td id="mem_1_2"></td>
      <td id="mem_1_3"></td>
      <td id="mem_1_4"></td>
    </tr>
    <tr>
      <td id="mem_2_0"></td>
      <td id="mem_2_1"></td>
      <td id="mem_2_2"></td>
      <td id="mem_2_3"></td>
      <td id="mem_2_4"></td>
    </tr>
    <tr>
      <td id="mem_3_0"></td>
      <td id="mem_3_1"></td>
      <td id="mem_3_2"></td>
      <td id="mem_3_3"></td>
      <td id="mem_3_4"></td>
    </tr>
    <tr>
      <td id="mem_4_0"></td>
      <td id="mem_4_1"></td>
      <td id="mem_4_2"></td>
      <td id="mem_4_3"></td>
      <td id="mem_4_4"></td>
    </tr>
  </table>
  `;
  document.getElementById("game").innerHTML = str;

  //list의 값에 전역변수 lists의 값을 집어넣는다
  var list = lists;
  var arr = list.split(' ');
  //누른 버튼의 값을 잘 추출하여 해당 버튼의 행과 열을 다시 id의 값으로 바꿔주는 작업이다
  var str = "mem_"+parseInt(input/10)+"_"+input%10;
  //누른 버튼은 파란색으로 0.3초동안 표시되게한다
  document.getElementById(str).style.backgroundColor = "blue";
    setTimeout(function() {
      //0.3초 후 원래의 색으로 돌려놓는다
      document.getElementById(str).style.backgroundColor = "wheat";
      if (arr[0] == input && arr.length != 2) {
        //공백을 포함한 값을 뺀 결과를 다시 list에 저장한다.("01 11 "이 저장되어 있을 경우 "11 "로 바꾸어 다시 집어넣는다)
        lists = lists.substring(3);
        input_press(lists);
      }
      //입력값과 arr[0]의 값이 같고 arr의 길이가 2일 경우(눌러야 할 버튼이 1개밖에 남지 않았을 경우)
      else if(arr[0] == input && arr.length == 2) {
        //스코어를 올리고 다시 init_mem함수를 실행한다.
        mem_count++;
        init_mem(mem_count, "");
      }
      //입력값과 arr[0]의 값이 다를 경우
      else {
        //이중 for문 및 if문을 활용해 테이블에 0.2초동안 빨간색으로 X표시를 그려 틀렸다는 것을 알려준다
        for (let i = 0;i < 5;i++) {
          for (let j = 0;j<5;j++) {
            if(i == j || i == 4 - j) {
              var temp = "mem_" + i + "_" + j;
              document.getElementById(temp).style.backgroundColor = "red";
            }
          }
        }
        //0.2초 뒤 다시 init_mem함수를 실행한다
        setTimeout(function() {
          if(!mem_done)
            init_mem(mem_count, "");
        }, 200)
      }
    }, 300);
}
