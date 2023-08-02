$(() => {
  //populates the UI with tasks ordered by date
  $.get("/tasks", function(response) {


    for (let i = 0; i < 3; i++) {
      let currentTask = response[i];
      renderTask(
        createTask(
          currentTask.id,
          currentTask.name_of_todo,
          updateTaskTitle(currentTask.category),
          convertDate(currentTask.date_added)
        )
      );
    }
  });


  //dynamic task creation
  const createTask = function(taskID, task, category, date_added) {
    const newDate = new Date(date_added);
    console.log("category in createTask", category);
    const iconClass = getIcon(category);
    // console.log("get icon(category)", getIcon(category));

    // const newDate = new Date(date_added);
    // console.log(newDate);
    // console.log(date_added);

    const $task = $(`
    <div class="card mx-auto py-1 " style="width:80%; margin-bottom: 15px" id=${taskID}>
      <div class="card-header">
        <i class="${iconClass}"></i>
        ${category}
    </div>
        <p class="p-3 h5 ">${task}</p>
        <div class="d-flex justify-content-between p-3">
          <div class="justify-content-start text-muted" id="footer-date">Date Added: <span title="Source Title">${date_added}</span>
          </div>
          <div id="footer-icons">
            <a><i class="fa-solid fa-trash-can fa-lg px-2 "></i></a>
            <a><i class="fa-solid fa-pen-to-square fa-lg px-2"></i></a>
          </div>
        </div>
    </div>
      `);

    return $task;
  };

  const renderTask = function(task) {
    $("#to-do-container").prepend(task);
  };

  //a non trivial change of task box title
  const updateTaskTitle = function(category) {
    // category = category.toLowerCase();
    switch (category) {
    case "buy":
    case "products":
      return "Products";
    case "eat":
    case "restaurants":
      return "Restaurants";
    case "read":
    case "books":
      return "Books";
    case "watch":
    case "films":
      return "Films";
      //add more cases if needed here
    default:
      return "Other";
    }
  };

  //check category_id
  const checkCategoryID = function(category) {
    category = category.toLowerCase();
    switch (category) {
    case "buy":
    case "products":
      return 4;
    case "eat":
    case "restaurants":
      return 1;
    case "read":
    case "books":
      return 3;
    case "watch":
    case "films":
    case "series":
      return 2;
      //add more cases if needed here
    default:
      return 5;
    }
  };

  $(document).ready(function(){
    $("#utensils-icon").mouseover(function(){
        $(this).css('color', 'red');
    }).mouseout(function(){
        $(this).css('color', ''); // This will reset the color to its original state when the mouse leaves the icon
    });

    $("#tv-icon").mouseover(function(){
        $(this).css('color', 'blue');
    }).mouseout(function(){
        $(this).css('color', '');
    });

    $("#book-icon").mouseover(function(){
        $(this).css('color', 'green');
    }).mouseout(function(){
        $(this).css('color', '');
    });

    $("#shopping-icon").mouseover(function(){
        $(this).css('color', 'orange');
    }).mouseout(function(){
        $(this).css('color', '');
    });

    $("#otter-icon").mouseover(function(){
      $(this).css('color', 'purple'); // change this to whatever color you want
  }).mouseout(function(){
      $(this).css('color', ''); // This will reset the color to its original state when the mouse leaves the icon');
  });
});

  //a non trivial icon for task box
  const getIcon = function(category) {
    switch (category) {
    case "Products":
      return "fa-solid fa-bag-shopping";
    case "Restaurants":
      return "fa-solid fa-utensils";
    case "Books":
      return "fa-solid fa-book-open";
    case "Films":
      return "fa-solid fa-tv";
    default:
      return "fa-solid fa-otter";
    }
  };

  //adds color functionality to the trash button
  $("#to-do-container").on("mouseover", ".fa-trash-can", function() {
    $(this).addClass("text-danger");
  });

  $("#to-do-container").on("mouseout", ".fa-trash-can", function() {
    $(this).removeClass("text-danger");
  });

  //deletes a task via the trash can icon
  $("#to-do-container").on("click", ".fa-trash-can", function() {
    const confirmation = confirm("Are you sure you want to delete this task?");
    const $card = $(this).closest(".card.mx-auto.py-1");
    const taskID = $card.attr("id");

    console.log("task ID is " + taskID);

    if (confirmation) {
      $.ajax({
        url: `/tasks/${taskID}`,
        type: "DELETE",
        success: function(response) {
          console.log("Successful deletion.");
          $card.fadeOut(600, function() {
            $card.remove();
          });
        },
        error: function(error) {
          console.error("Error deleting task:", error);
          alert("Error deleting task. Please try again later.");
        },
      });
    }
  });

  //edit icon functionality

  $("#to-do-container").on("mouseover", ".fa-pen-to-square", function() {
    $(this).addClass("text-primary");
  });

  $("#to-do-container").on("mouseout", ".fa-pen-to-square", function() {
    $(this).removeClass("text-primary");
  });

  //edits the task
  $("#to-do-container").on("click", ".fa-pen-to-square", function() {
    $('#popup').remove();
    const $card = $(this).closest(".card.mx-auto.py-1");
    //Create the popup box and add it to the card
    const popupBox = `<div id="popup" class="popup">
       <div class="popup-content">
          <h2>Enter Details</h2>
          <input type="text" id="taskName" placeholder="Please enter a task name">
          <input type="text" id="date_added" placeholder="Please enter the date added">
          <input type="text" id="category" placeholder="Please enter a category">
          <!-- Add more textboxes if needed -->
          <button id="submitBtn">Submit</button>
          <button id="closePopup">Close</button>
       </div>
      </div>`;
    $card.append(popupBox);

    $("#to-do-container").off("click", "#closePopup").on("click", "#closePopup", function() {
      $("#popup").remove();
    });

    $("#to-do-container").off("click", "#submitBtn").on("click", "#submitBtn", function() {
      if (!$('#taskName').val() || !isNaN($('#taskName').val())) {
        alert("Please enter a valid task name");
      } else {
        if (!$('#date_added').val() || !isValidDateFormat($('#date_added').val())) {
          alert("Please enter a valid date(YYYY-MM-DD)");
        } else {
          if (!$('#category').val() || !isNaN($('#category').val())) {
            alert("Please enter a valid category");
          } else {
            //happy path - gather the information and populate our task with it
            renderTask(
              createTask(
                $card.attr('id'),
                $('#taskName').val(),
                updateTaskTitle($('#category').val()),
                $('#date_added').val()
              )
            );
            //call router put


            $.ajax({
              type: 'PUT',
              url: `/tasks/${$card.attr('id')}`,
              data: JSON.stringify({
                id: $card.attr('id'),
                name_of_todo: $('#taskName').val(),
                date_added: $('#date_added').val(),
                category_id: checkCategoryID($('#category').val()),
                completed: 'FALSE'
              }),
              dataType: "json",
              contentType: "application/json",
              success: function(response) {
                console.log('Update success: ', response);
                $('#popup').remove();
                $card.remove();
              },
              error: function(error) {
                console.log('Update error: ', error);
              }
            });
          }
        }
      }
    });
  });

  //helper function for date checking
  function isValidDateFormat(input) {
    // Regular expression to match the date format 'yyyy-mm-dd'
    const dateRegEx = /^\d{4}-\d{2}-\d{2}$/;

    // Check if the input matches the date format
    if (!dateRegEx.test(input)) {
      return false;
    }

    // Check if the date is valid
    const date = new Date(input);
    return !isNaN(date.getTime());
  }

  //date and time conversion
  function convertDate(date_added) {
    newDate = new Date(date_added);
    return newDate.toDateString();
  }

});
