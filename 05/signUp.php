<?php
  header("Content-Type: application/json");
  echo $data;
  $url = "./data.json";
  $json_string = "";
  $R = array();
  //print_r($_POST);
  if(file_exists($url)) {
    $json_string = file_get_contents($url);
    $R = json_decode($json_string, true);
  }
  $data = array();
  $data["title"] = $_POST["title"];
  $data["content"] = $_POST["content"];
    array_push($R, $data);
    $data = json_encode($R);
    file_put_contents($url, $data);

?>


