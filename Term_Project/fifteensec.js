var fifteen_score = 0;

//15초 세기 함수
function fifteensec() {
  //15초를 세기 전 버튼을 만들어 카운트를 시작한다.
  var str =
  `<div id="fifteensec">
    <input class="btn btn-secondary circle" type="button" onclick="start()" value="start"></input>
  </div>`;
  //game_process를 id로 한 태그의 속성을 hidden으로 바꿔 게임 중 버튼이 눌리지 않도록 한다.
  document.getElementById("game_process").style.visibility="hidden";
  //버튼을 game 태그 안에 넣는다.
  document.getElementById("game").innerHTML = str;
}

//start버튼이 눌렸을 때 실행되는 함수
function start() {
  //시작할 당시 시간을 start_time변수 안에 넣는다
  var start_time = new Date().getTime();
  //end버튼으로 눌렀을 때 end함수를 start_time을 매개변수로 하여 호출한다
  var str = `<input class="btn btn-warning circle" type="button" onclick="end(`+start_time+`)" value="end"></input>`;
  //fifthsec함수에서 집어넣었던 div의 내용을 바꾼다
  document.getElementById("fifteensec").innerHTML = str;
}

//end 버튼이 눌렸을 때 실행되는 함수
function end(start_time) {
  //end 버튼을 눌렀을 당시 시간을 end_time변수 안에 넣는다
  var end_time = new Date().getTime();
  //start_time변수와 end_time변수의 차이를 이용하여 사용자에게 점수를 출력해준다
  var str = `<h4>`+(end_time - start_time)/1000+`초 만에 버튼을 누르셨습니다!</h4>
  <h4>오차는 `+Math.round(Math.abs(15 - (end_time - start_time)/1000)*1000)/1000+`초 입니다!</h4>`
  fifteen_score = Math.round(15000 - Math.round(Math.abs(15 - (end_time - start_time)/1000)*1000))/1000;
  document.getElementById("fifteensec").innerHTML = str;
  //15초 세기 점수를 점수판에 추가한다
  document.getElementById("score_board").innerHTML = `<br/>`
  document.getElementById("score_board").innerHTML += `<h4>15초 세기 : `+fifteen_score+`점</h4>`;
  //다음 게임을 위해 game_process의 속성들을 바꿔준다
  document.getElementById("game_process").style.visibility="visible";
  document.getElementById("game_process").setAttribute('onclick', 'mem_test()');
  document.getElementById("game_process").setAttribute('value', '기억력 테스트');

}

