<?php
  //data/data.json파일 안에 저장되어 있는 정보들을 읽어오는 파일
  header("Content-Type: application/json");
  $url = "./data/data.json";
  $json_string = "";
  $R = array();
  if(file_exists($url)) {
    $json_string = file_get_contents($url);
    $R = json_decode($json_string, true);
  }
  $data = array();
  //반복문을 이용하여 추후에 split 하기 편하도록 ,과 개행문자를 이용하여 각각의 정보를 구분한다.
  for ($i=0; $i < count($R); $i++) {
    echo($R[$i]["name"].",".$R[$i]["sumscore"].",".$R[$i]["fifteensec"].",".$R[$i]["memtest"].",".$R[$i]["heart"].",".$R[$i]["area"].",".$R[$i]["date"]);
    echo "\n";
  }
?>
