<?php
  $name = $_POST['name'];
  $desc = $_POST['desc'];

  $file = fopen("data.txt", "a+");

  $name = preg_replace("/\s+/", "", $name);
  $index = 0;
  while(($str = fgets($file))) {
    $str = preg_replace("/\s+/", "", $str);
    $titles[$index] = $str;
    $str = fgets($file);
    $index += 1;
  }
  $find = false;
  if($titles) {
    for($i=0;$i<count($titles);$i++) {
      if(!strcmp($name, $titles[$i])) {
        $find = true;
        break;
      }
    }
  }
?>

<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <?php
    if(!$find):
      fwrite($file, $name."\n");
      fwrite($file, $desc."\n");
      fclose($file);
  ?>
  <p>저장되었습니다.</p>
  <?php
    else:
  ?>
  <p>저장되지 않았습니다. </br>
  이전에 같은 화일 이름으로 저장된 정보가 있습니다.</p>
  <?php
    endif;
  ?>
</body>
</html>
