var main = function() {
  "use strict";
  var $count = 0;
  var todoJSON = [{"todo": "Pick up milk from store"}, {"todo": "Make Dr. Appointment"}, {"todo": "Pay water bill"}];

  var writeStorage = function() {
    var todos = $('#todo-items').html();
    localStorage.setItem('todos', todos);
  };

  var decCount = function() {
    $count--;
    document.getElementById("count").innerHTML = $count;
  }

  var incCount = function() {
    $count++;
    document.getElementById("count").innerHTML = $count;
  };

  if(localStorage.getItem('todos')) {
    $('#todo-items').html(localStorage.getItem('todos'));
    $count = $("#todo-items li").length;
    document.getElementById("count").innerHTML = $count;
  } else {
    // get JSON items
      for(var item in todoJSON) {
        var $todo = $("<li>");
        $todo.text(todoJSON[item].todo);
        $("#todo-items").append($todo);
        incCount();
      };
  }

  var addInputItem = function() {
    var $new_item;
    if ($(".todo-input input").val() !== "") {
      var $str = $(".todo-input input").val();
      $new_item = $("<li>").text($str);
      $("#todo-items").prepend($new_item);
      $(".todo-input input").val("");
      incCount();
      writeStorage();
      //$("#todo-items").load(location.href + " #todo-items");
      location.reload();
      return false;
    }
  }

  $("#clear button").on("click", function(event) {
    window.localStorage.clear();
    location.reload();
    return false;
  });

 $(".todo-input button").on("click", function(event) {
   addInputItem();
 });

 $(".todo-input input").on("keypress", function(event) {
   if (event.keyCode === 13) {
     addInputItem();
   }
 });

 $(".todo-list li").on("dblclick", function(event) {
   console.log("Double click");
   $(this).remove();
   decCount();
   writeStorage();
 });
};

$(document).ready(main);
