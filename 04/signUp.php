<?php
  $id = $_POST["id"];
  $pw = $_POST["pw"];
  $url = "./data/person.json";
  $json_string = "";
  $R = array();
  if(file_exists($url)) {
    $json_string = file_get_contents($url);
    //echo "Helo";
    //echo $json_string;
    $R = json_decode($json_string, true);
  }


  $duplicate = false;
  foreach ($R as $temp) {
    if ($temp["id"] == $id)
      $duplicate = true;
  }
  if($duplicate) {
    echo "이미 아이디가 존재합니다.";
  } else {
    $newData = array('id' => $id, 'pw' => $pw);
    array_push($R, $newData);
    $data = json_encode($R);
    file_put_contents($url, $data);
    echo "회원 가입이 완료되었습니다.";
  }


?>
