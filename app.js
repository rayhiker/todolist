var main = function() {
  "use strict";
  var $count = 0;
  // default values for list initialization
  var todoJSON = [{"todo": "Pick up milk from store"}, {"todo": "Make Dr. Appointment"}, {"todo": "Pay water bill"}];

  // writeStorage: store list items in html format in localStorage for future use
  var writeStorage = function() {
    var todos = $('#todo-items').html();
    localStorage.setItem('todos', todos);
  };

  // decCount: decrement the number of to do items
  var decCount = function() {
    $count--;
    document.getElementById("count").innerHTML = $count;
  }

  // incCount: increment the number of to do items
  var incCount = function() {
    $count++;
    document.getElementById("count").innerHTML = $count;
  };

  // At session startup time load to-do items if they exist, otherwise use default values
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

  // addInputItem: Add to-do item to the list
  var addInputItem = function() {
    var $new_item;
    if ($(".todo-input input").val() !== "") {
      var $str = $(".todo-input input").val();
      $new_item = $("<li>").text($str);
      $("#todo-items").prepend($new_item);
      $(".todo-input input").val("");
      incCount();
      writeStorage();
      location.reload();
      return false;
    }
  }

  // Clear button: reset the entire list to default values
  $("#clear button").on("click", function(event) {
    window.localStorage.clear();
    location.reload();
    return false;
  });

  // Add button: Add the to-do item from the input box
 $(".todo-input button").on("click", function(event) {
   addInputItem();
 });

 // Enter key: Add the to-do item from the input box
 $(".todo-input input").on("keypress", function(event) {
   if (event.keyCode === 13) {
     addInputItem();
   }
 });

 // Double-click on list item: remove it from to-do list
 $(".todo-list li").on("dblclick", function(event) {
   console.log("Double click");
   $(this).remove();
   decCount();
   writeStorage();
 });
};

$(document).ready(main);
