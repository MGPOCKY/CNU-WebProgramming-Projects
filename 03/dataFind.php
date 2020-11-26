<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <ul>
  <?php
  $name = $_POST['name'];
  $word = $_POST['word'];
  $order = $_POST['order'];
  trim($name);
  trim($word);

  $file = fopen("data.txt", "r");
  $find = false;
  while(($str = fgets($file))) {
    $desc = fgets($file);
    if (strpos(" ".$str, $name)) {
      trim($str);
      trim($desc);
      $data[$str] = $desc;
      $arr[$index] = $str;
      $count = 0;
      $split = explode(" ", $desc);
      for($i=0;$i<count($split);$i++) {
        if(strcasecmp($split[$i], $word) == 0) {
          $count++;
        }
      }
      if($count > 0) {78
        $find = true;
        $arr_count[$str] = $count;
      }
      $index += 1;
    }
  }
    if($find) {
      if(strcmp($order, "ac"))
      arsort($arr_count);
    else
      asort($arr_count);

    foreach($arr_count as $x => $x_value) {
      echo "<li>";
      echo $x." :".$data[$x];
      echo "</li>";
    }
    }


?>
  </ul>
</body>
</html>


