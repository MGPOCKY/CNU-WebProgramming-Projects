<?php
  header("Content-Type: application/json");
  $url = "./data/data.json";
  $json_string = "";
  $R = array();
  //print_r($_POST);
  if(file_exists($url)) {
    $json_string = file_get_contents($url);
    $R = json_decode($json_string, true);
  }
  $data = array();
  for ($i=0; $i < count($R); $i++) {
    echo($R[$i]["name"].",".$R[$i]["sumscore"].",".$R[$i]["fifteensec"].",".$R[$i]["memtest"].",".$R[$i]["heart"].",".$R[$i]["area"].",".$R[$i]["date"]);
    echo "\n";
  }
?>
