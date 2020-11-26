<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <form method="POST">
    <input type="hidden" name="id" id=<?=$_POST["id"];?> value=<?=$_POST["id"];?> >
    <p>비밀번호 : <input type="password" name="pw" id="pw" required="required"></p>
    <input type="submit" value="제출" formaction="./change_pw_result.php">
    <input type="button" value="초기화" onclick="clearPw()">
  </form>
  <script src="./index.js"></script>
</body>
</html>
