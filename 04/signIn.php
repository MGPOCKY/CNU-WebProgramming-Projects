<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
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


  $login_success = false;
  foreach ($R as $temp) {
    if ($temp["id"] == $id && $temp["pw"] == $pw)
      $login_success = true;
  }
  if($login_success) {
    echo $id."님 로그인이 되었습니다.";
  ?>
  <br />
  <form method="POST">
    <input type="hidden" name="id" id="id" value=<?=$id?>>
    <input type="submit" value="비밀번호 변경" formaction="./change_pw.php">
  </form>
  <?php
  } else {
    echo "입력하신 id가 존재하지 않거나 패스워드가 틀립니다.";
  }


?>

</body>
</html>

