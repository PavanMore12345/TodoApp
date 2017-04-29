$(document).ready(function() {
        getData();
    $("#menu-toggle").click(function(e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
    });
    $("#body").hide();
    // $("#myModel").hide();

    $("#title").click(function(e) {
        $("#body").show();
    });
    $("#done").click(function(e) {
        $("#body").hide();
        var title = $("#title").html();
        var bodydata = $("#body11").html();
        var data = {};
        //console.log(c);
        // $("#container").append('<div class="col-sm-4 col-md-4"><div class="w3-panel w3-card" id="card"><b>'+title+'</b> <br>'+bodydata+'</div></div>');
        data["title"] = title;
        data["bodyContent"] = bodydata;
        addCard(data);
        $('#title').html("");
        $("#body11").html("");
    });

    function addCard(data1) {
        $.ajax({
            type: "POST",
            data: data1,
            dataType: "json",
            //headers:{"Content-Type":"application/json"},
            url: "http://localhost:8095/addcard",
            success: function(response) {
                console.log('page was not loaded', response);
                //$('body').html(response);
                $("#container").html("");
                    getData();
            },
            error: function(error) {
                console.log('page was not loaded', error);
            },
            complete: function(xhr, status) {
                console.log('request is completed');
            }
        });
    }
    $("#title").keypress(function(e) {
        if (e.which == 13) {
            $("#body11").focus();
        }
    });
    $("#btn1").click(function(e)
  {
    var title = $("#modeltitle").val();
    var modelbody=$("#modelbody").html();
console.log(title);
console.log(modelboy);
      // $("#myModel").show();
});
    // $("#list").click(function(e) {
    //     if ($("#grid").hasClass("col-sm-4 col-md-4")) {
    //         $("#container #grid").removeClass("col-sm-4 col-md-4").addClass("col-lg-12");
    //     } else {
    //         $("#container #grid").removeClass("col-lg-12").addClass("col-sm-4 col-md-4");
    //     }
    // });

});
var getData=function(){
  $.ajax({
      url: "http://localhost:8095/getData",
      type: "POST",
      dataType: 'JSON',
      //data:note,
      success: function(response) {
          console.log(response);
          for (var i = 0; i < response.msg.length; i++) {
              //  var note1="<h4>"+response.msg[i].title+"</h4><br>"+response.msg[i].content+"<br>";
              //  var newDiv = $('<div class="notesDiv col-md-3" style="border:1px solid black;margin:8px;font-weight:bold;">'+note1+'</div>');
              //  $('#content').prepend(newDiv);
              $("#container").prepend('<div class="w3-panel w3-card" id="card" data-toggle="modal" data-target="#myModal"><b>' + response.msg[i].title + '</b> <br>' + response.msg[i].bodyContent + '</div>');
              var elem = document.querySelector('#container');
              var pckry = new Packery(elem, {
                  // options
                  itemSelector: '#card',
                  gutter: 10
              });
          }
      },
      error: function(error) {
          console.log("some error occured");
      },
      complete: function(xhr, status) {
          console.log("request is completed");
      }
  });
}
