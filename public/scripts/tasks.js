$(() => {
  //populates the UI with tasks ordered by date
  $.get("/tasks", function (response) {
    for (let i = 0; i < 3; i++) {
      let currentTask = response[i];
      renderTask(
        createTask(
          currentTask.id,
          currentTask.name_of_todo,
          updateTaskTitle(currentTask.category),
          currentTask.date_added
        )
      );
    }
  });

  //dynamic task creation
  const createTask = function (taskID, task, category, date_added) {
    console.log("category in createTask", category);
    const iconClass = getIcon(category);
    console.log("get icon(category)", getIcon(category));

    const $task = $(`
      <div class="card mx-auto py-1" style="width:80%; margin-bottom: 15px" id=${taskID}>
        <div class="card-header">
          <i class="${iconClass}"></i>
          ${category}
        </div>
        <div class="card-body">
          <blockquote class="blockquote mb-0">
            <p>${task}</p>
            <footer class="blockquote-footer py-1">Date Added: <cite title="Source Title">${date_added}</cite></footer>
          </blockquote>
          <div class="d-flex justify-content-end">
            <a><i class="fa-solid fa-trash-can fa-lg px-2 "></i></a>
            <a><i class="fa-solid fa-pen-to-square fa-lg px-2"></i></a>
          </div>
        </div>
      </div>
      `);

    return $task;
  };

  const renderTask = function (task) {
    $("#to-do-container").prepend(task);
  };

  //a non trivial change of task box title
  const updateTaskTitle = function (category) {
    switch (category) {
      case "buy":
        return "Products";
      case "eat":
        return "Restaurants";
      case "read":
        return "Books";
      case "watch":
        return "Films";
      default:
        return "Other";
    }
  };

  //a non trivial icon for task box
  const getIcon = function (category) {
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
  $("#to-do-container").on("mouseover", ".fa-trash-can", function () {
    $(this).addClass("text-danger");
  });

  $("#to-do-container").on("mouseout", ".fa-trash-can", function () {
    $(this).removeClass("text-danger");
  });

  //deletes a task via the trash can icon
  $("#to-do-container").on("click", ".fa-trash-can", function () {
    const confirmation = confirm("Are you sure you want to delete this task?");
    const $card = $(this).closest(".card.mx-auto.py-1");
    const taskID = $card.attr("id");

    console.log("task ID is " + taskID);

    if (confirmation) {
      $.ajax({
        url: `/tasks/${taskID}`,
        type: "DELETE",
        success: function (response) {
          console.log("Successful deletion.");
          $card.fadeOut(600, function () {
            $card.remove();
          });
        },
        error: function (error) {
          console.error("Error deleting task:", error);
          alert("Error deleting task. Please try again later.");
        },
      });
    }
  });

  //edit icon functionality

  $("#to-do-container").on("mouseover", ".fa-pen-to-square", function () {
    $(this).addClass("text-primary");
  });

  $("#to-do-container").on("mouseout", ".fa-pen-to-square", function () {
    $(this).removeClass("text-primary");
  });

  //edits the task
  $("#to-do-container").on("click", ".fa-pen-to-square", function () {
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

    $("#to-do-container").off("click", "#closePopup").on("click", "#closePopup", function () {
      $("#popup").remove();
    });

    $("#to-do-container").off("click", "#submitBtn").on("click", "#submitBtn", function () {
      if (!$('#taskName').val()){
        alert("Please enter a task name");
      }else {
        if (!$('#date_added').val() || !isValidDateFormat($('#date_added').val())){
          alert("Please enter a valid date(YYYY-MM-DD)");
        } else {
          if (!$('#category').val()){
            alert("Please enter a category");
          }
          else{
            //happy path - gather the information and populate our task with it
            renderTask(
              createTask(
                $card.attr('id'),
                $('#taskName').val(),
                updateTaskTitle($('#category').val()),
                $('#date_added').val()
              )
            );
            $('#popup').remove();
            $card.remove();
          }
        }
      }
    });
  });


  //helper function for date checking
  function isValidDateFormat(input) {
    try {
        const date = new Date(input);
        return !isNaN(date.getTime());
    } catch (error) {
        return false;
    }
}
});
