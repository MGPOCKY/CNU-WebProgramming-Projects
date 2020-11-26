function createData() {
  var sendData = {title:$('#title').val(), content:$('#content').val()};
  return sendData;
}

$(document).ready(function() {


  $("#key").on("input", function(){
    var str = $(this).val().toLowerCase();
    var obj = new Object();
    var text = document.getElementById("find");
    text.innerHTML = "";
    obj.key = str;
    alert(JSON.stringify(obj));
    var result = "";
    if(str != "") {
      $.ajax({
        type:"post",
        url:"./data.json",
        dataType:"text",
        success:function(data) {
          $.each(JSON.parse(data), function(index, entry) {
            //console.log("title : " + entry["title"].charAt(0) + ", content " + entry["content"]);
            var key_find = true;
            var ent = entry["title"].toLowerCase();
            if(str.length > ent.length) {
              key_find = false;
            } else {
              for (let index = 0; index < str.length; index++) {
                if(str.charAt(index) != ent.charAt(index)) {
                  key_find = false;
                }
              }
            }
            if(key_find) {
              //result.concat(entry["title"]);
              //console.log(entry["title"]);
              text.innerHTML += `<li>`+entry["title"]+`</li>`
            }
          });
      }});
    }

});
  $("#save").click(function() {
    var title = document.getElementById("title").value;
    var content = document.getElementById("content").value;
    var obj = new Object();
    obj.title = title;
    obj.content = content;
    alert(JSON.stringify(obj));
    $.ajax({
      type:"POST",
      url:"signUp.php?mode=POST",
      dataType:"json",
      data : createData(),
      success : function(data) {
        console.log(data);
      }
      });
      alert("저장되었습니다.");
    });
  });
