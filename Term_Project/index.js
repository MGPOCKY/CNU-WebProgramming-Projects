
//현재 진행중인 함수에 따라 게임별 게임 규칙 및 방법을 설명해주는 함수
function show_rule() {
  let parent = document.getElementById("instruction");
  let game_process = String(document.getElementById("game_process").onclick).split('\n')[1];
  let result = select_show_rule(game_process);
  parent.innerHTML = result;
}

//현재 실행중인 함수에 따라서 return 해주는 것들이 각각 다르다.
function select_show_rule(game) {
  //15초 세기 게임에 대한 설명
  if(game == "fifteensec()") {
    return `
    <div class="row">
      <div id="text" class="col-4">
        <br/>
        <h3>15초 세기</h3>
        <br/>
        <h5>start 버튼을 누른 후 속으로 15초 후에 end 버튼을 누르는 게임입니다.</h5>
        <h5>실제 시간과 오차가 적을 수록 높은 점수를 획득합니다.</h5>
      </div>
      <div id="image" class="col-8">
        <br/>
        <h3>상세 설명</h3>
        <img src="./image/01/start.png"> =>
        <img src="./image/01/end.png"> =>
        <img src="./image/01/result.png">
      </div>
    </div>`;
  }
  //기억력 테스트 게임에 대한 설명
  else if(game == "mem_test()") {
    return `
    <div class="row">
      <div id="text" class="col-4">
        <br/>
        <h3>기억력 테스트</h3>
        <br/>
        <h5>빨간 색으로 표시되는 타일의 순서를 기억한 후 순서대로 타일을 누르는 게임입니다.</h5>
        <h5>틀렸을 시 X표시가 됩니다.</h5>
        <h5>최대한 많이 기억 할 수록 높은 점수를 획득합니다.</h5>
      </div>
      <div id="image" class="col-8">
        <br/>
        <h3>상세 설명</h3>
        <img src="./image/02/start.png"> =>
        <img src="./image/02/end.png"> =>
        <img src="./image/02/result.png">
      </div>
    </div>`;
  }
  //하트를 찾아라 게임에 대한 설명
  else if(game == "find_heart()") {
    return `
    <div class="row">
      <div id="text" class="col-4">
        <br/>
        <h3>하트를 찾아라</h3>
        <br/>
        <h5>타일에서 하트가 표시된 타일을 찾는 게임입니다.</h5>
        <h5>만일 하트가 없다면 중앙에 있는 X타일을 누르면 됩니다.</h5>
        <h5>틀렸을 시 X표시가 됩니다.</h5>
        <h5>최대한 많이 찾을 수록 높은 점수를 획득합니다.</h5>
      </div>
      <div id="image" class="col-8">
        <br/>
        <h3>상세 설명</h3>
        <img src="./image/03/heart_exist.png"> or
        <img src="./image/03/heart_not_exist.png"> =>
        <img src="./image/03/correct.png"> or
        <img src="./image/03/fail.png">
      </div>
    </div>
    `;
  }
  //어느곳이 가장 넓을까 게임에 대한 설명
  else if(game == "largest_area()") {
    return `
    <div class="row">
      <div id="text" class="col-4">
        <br/>
        <h3>어느곳이 가장 넓을까?</h3>
        <br/>
        <h5>타일에서 가장 넓은 색상의 타일 색을 고르는 게임입니다.</h5>
        <h5>가장 넓은 타일이 두 가지 이상 존재하는 경우는 없습니다.</h5>
        <h5>틀렸을 시 X표시가 됩니다.</h5>
        <h5>최대한 많이 찾을 수록 높은 점수를 획득합니다.</h5>
      </div>
      <div id="image" class="col-8">
        <br/>
        <h3>상세 설명</h3>
        <img src="./image/04/start.png"> =>
        <img src="./image/04/correct.png"> or
        <img src="./image/04/fail.png">
      </div>
    </div>
    `;
  } else {
    return ``;
  }
}
