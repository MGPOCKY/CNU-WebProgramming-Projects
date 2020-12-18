let rank_index = 1;

function see_result() {
  let name = prompt("랭킹에 등록할 이름을 입력하세요");
  if(name == null) {
    let input = confirm("랭킹 등록을 하지 않으시겠습니까?");
    if(input) {
      alert("랭킹 등록을 하지 않았습니다.");
    } else {
      see_result();
    }
  } else if(name == "") {
    see_result();
  } else {
    let input = confirm(name + "으로 랭킹을 등록하시겠습니까?");
    if(input) {
      input_data(name);
      //setScoreBoard();
      alert("등록되었습니다!");
      window.location.href = "./scoreboard";
    } else {
      alert("다시 입력해 주세요");
      see_result();
    }
  }
}

function forMoreGame() {
  window.location.href = "http://3.135.209.141:4000/"
}

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
  //console.log(sendData);
  return sendData;
}

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

function setScoreBoard() {
  $.ajax({
    type: "POST",
      url: './readData.php',
      dataType: 'json',
      data: null,
      complete : function(result) {
        let arr = result.responseText.split('\n');
        //console.log(arr);
        sortData(arr);
      }
  });
}

function sortData(data) {
  var objectData = [];
  //console.log(data);
  for(let i=0;i<data.length - 1;i++) {
    let arr = data[i].split(',');
    objectData.push({name: arr[0], sumscore: Number(arr[1]), fifteensec: Number(arr[2]), memtest: Number(arr[3]), heart: Number(arr[4]), area: Number(arr[5]), date: arr[6]});
  }
  objectData.sort(function(a, b) {
    return a.sumscore > b.sumscore ? -1 : a.sumscore < b.sumscore ? 1 : 0;
  });
  //console.log(objectData);
  addScoreBoard(objectData);
}

function addScoreBoard(data) {
  let rank = 1;
  let parent = document.getElementById("ranking_data");
  parent.innerHTML = "";
  for (let index = 0; index < data.length; index++) {
    const element = data[index];
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
