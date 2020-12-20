//랭킹에 대한 정보를 가져오는 파일

//게임을 마친 후 랭킹 등록 버튼을 눌렀을 때 시행되는 함수
//confirm과 alert등을 이용하여 여러가지 상황에 대한 예외처리를 진행하였다.
function see_result() {
  let name = prompt("랭킹에 등록할 이름을 입력하세요");
  //취소 버튼을 눌렀을 때
  if(name == null) {
    let input = confirm("랭킹 등록을 하지 않으시겠습니까?");
    //랭킹 등록을 취소한다
    if(input) {
      alert("랭킹 등록을 하지 않았습니다.");
    } else {
      see_result();
    }
  }
  //빈 문자열을 입력하였을 때
  else if(name == "") {
    see_result();
  }
  //정상적인 문자열을 입력하였을 때
  else {
    let input = confirm(name + "으로 랭킹을 등록하시겠습니까?");
    if(input) {
      input_data(name);
      alert("등록되었습니다!");
      window.location.href = "./scoreboard";
    }
    //사용자의 이름을 다시 입력 받는다
    else {
      alert("다시 입력해 주세요");
      see_result();
    }
  }
}

//이스터에그로 현재 진행중인 사이드 프로젝트의 주소로 이동시키는 링크
function forMoreGame() {
  window.location.href = "http://3.135.209.141:4000/"
}

//사용자의 정보를 추가할 때 들어가는 정보들을 json파일 형식으로 변환한 후 리턴해주는 함수
function createData(name) {
  let now = new Date();
  let hour = now.getHours();
  if(hour < 10) {
    hour = "0" + hour;
  }
  let minute = now.getMinutes();
  if(minute < 10) {
    minute = "0" + minute;
  }
  const date = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate() + " " + hour + ":" + minute;
  let sumscore = fifteen_score + mem_count + heart_score + area_score;
  sumscore = Math.round(sumscore * 1000) / 1000;
  const sendData = {name: name, sumscore: sumscore, fifteensec: fifteen_score, memtest: mem_count, heart: heart_score, area: area_score, date: date};
  return sendData;
}

//랭킹 등록을 할 때 addData.php파일을 호출하며 ajax를 활용하여 정보를 추가한다.
function input_data(name) {
  $.ajax({
    type: "POST",
      url: './addData.php',
      dataType: 'json',
      data: createData(name),
      complete : function(result) {
        //console.log(result);
      }
  });
}

//랭킹 정보를 읽어올 때 readData.php파일을 호출하며 ajax를 활용하여 정보를 읽어온다.
function setScoreBoard() {
  $.ajax({
    type: "POST",
      url: './readData.php',
      dataType: 'json',
      data: null,
      complete : function(result) {
        //정상적으로 읽어왔을 때 개행 문자를 기준으로 split한 값을 sortData함수 안에 매개변수로 집어넣어 호출한다.
        let arr = result.responseText.split('\n');
        sortData(arr);
      }
  });
}

//각 정보를 랭킹에 맞게 소팅하는 함수
//합계 점수를 기준으로 내림차순으로 정렬한 뒤 addScoreBoard함수를 호출한다.
function sortData(data) {
  var objectData = [];
  for(let i=0;i<data.length - 1;i++) {
    let arr = data[i].split(',');
    objectData.push({name: arr[0], sumscore: Number(arr[1]), fifteensec: Number(arr[2]), memtest: Number(arr[3]), heart: Number(arr[4]), area: Number(arr[5]), date: arr[6]});
  }
  objectData.sort(function(a, b) {
    return a.sumscore > b.sumscore ? -1 : a.sumscore < b.sumscore ? 1 : 0;
  });
  addScoreBoard(objectData);
}

//정렬된 정보를 바탕으로 랭킹 시스템에 보여주는 함수
//반복문을 사용하여 각각의 사용자 랭킹을 추가한다.
function addScoreBoard(data) {
  let rank = 1;
  let parent = document.getElementById("ranking_data");
  parent.innerHTML = "";
  for (let index = 0; index < data.length; index++) {
    const element = data[index];
    if (isNaN(element["sumscore"]))
      continue;
    let tr = document.createElement('tr');
    tr.innerHTML = `
    <tr>
      <th scope="row">` + rank + `</th>
      <td>` + element["name"] + `</td>
      <td>` + element["sumscore"] + `</td>
      <td>` + element["fifteensec"] + `</td>
      <td>` + element["memtest"] + `</td>
      <td>` + element["heart"] + `</td>
      <td>` + element["area"] + `</td>
      <td>` + element["date"] + `</td>
    </tr>`;
    parent.appendChild(tr);
    rank += 1;
  }
}
