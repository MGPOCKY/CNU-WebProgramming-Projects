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


  $i = 0;
  foreach ($R as $temp) {
    if ($temp["id"] == $id) {
      ($R[$i])["pw"] = $pw;
      $data = json_encode($R);
      file_put_contents($url, $data);
      echo "비밀번호 변경이 성공적으로 완료되었습니다.";
      break;
    }
    $i += 1;
  }




?>
