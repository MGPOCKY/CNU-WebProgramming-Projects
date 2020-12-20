<?php
  //랭킹에 사용자의 정보를 추가하는 부분
  header("Content-Type: application/json");
  $url = "./data/data.json";
  $json_string = "";
  $R = array();
  if(file_exists($url)) {
    $json_string = file_get_contents($url);
    $R = json_decode($json_string, true);
  }
  //data에 post형식으로 받은 각각의 정보들을 저장한 뒤 json파일에 집어넣는다.
  $data = array();
  $data["name"] = $_POST["name"];
  $data["sumscore"] = $_POST["sumscore"];
  $data["fifteensec"] = $_POST["fifteensec"];
  $data["memtest"] = $_POST["memtest"];
  $data["heart"] = $_POST["heart"];
  $data["area"] = $_POST["area"];
  $data["date"] = $_POST["date"];
  array_push($R, $data);
  $data = json_encode($R);
  file_put_contents($url, $data);
?>
