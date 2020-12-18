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
