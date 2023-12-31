$(() => {
  //HELPER FUNCTION SECTION


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
//************************date *****************************/
  function convertDate(date_added) {
    newDate = new Date(date_added);
    return newDate.toDateString();
  }


  function databaseConvertDate(dateObj) {
    if (!(dateObj instanceof Date)) {
        console.error('dateObj is not a Date instance:', dateObj);
        return null;
    }

    let year = dateObj.getFullYear();
    let month = dateObj.getMonth() + 1;
    let day = dateObj.getDate();

    // Pad the month and day with leading zeros if necessary
    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;

    return year + '-' + month + '-' + day;
  }  //yyyy=mmm=dd

// ***************************end of date ****************************
  //prepends tasks onto UI
  const renderTask = function (task) {
    $("#to-do-container").prepend(task);
  };

  //helper function to call and render task/todo
  const generateTask = function (response) {
    if (response) {
      if (response.length < 3) {
        for (let i = 0; i < response.length; i++) {
          let currentTask = response[i];
          console.log(currentTask + "    CurrentTask");
          renderTask(
            createTask(
              currentTask.id,
              currentTask.name_of_todo,
              updateTaskTitle(currentTask.category),
              convertDate(currentTask.date_added)
            )
          );
        }
      } else {
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
      }
    }
  };
  //populates the UI with tasks ordered by date
  $.get("/tasks", function (response) {
    generateTask(response);
  });


  //a non trivial helper function to change of task box title
  const updateTaskTitle = function (category) {
    category = category.toLowerCase();
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
  //check category_id helper function
  const checkCategoryID = function (category) {
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

  // case R.id.someValue :
  // case R.id.someOtherValue :
       //do stuff


  //a non trivial icon for task box helper function
  const getIcon = function (category) {
    switch (category) {
      case "Products":
      case "buy":
        return "fa-solid fa-bag-shopping";
      case "Restaurants":
      case "eat":
        return "fa-solid fa-utensils";
      case "Books":
      case "read":
        return "fa-solid fa-book-open";
      case "Films":
      case "watch":
        return "fa-solid fa-tv";
      default:
        return "fa-solid fa-otter";
    }
  };

  //TASK MANAGEMENT FUNCTIONS

  //dynamic task creation
  const createTask = function (taskID, name_of_task, category, date_added) {
    const newDate = new Date(date_added);
    const iconClass = getIcon(category);

    const $task = $(`
    <div class="card mx-auto py-1 " style="width:80%; margin-bottom: 15px" id=${taskID}>
      <div class="card-header d-flex justify-content-between p-3">
        <div>
          <i class="${iconClass}"></i>
          ${category}
        </div>
        <div class="form-check" >
        <label class="form-check-label" for="flexCheckIndeterminate">
            To-do Complete
          </label>
        <input class="form-check-input" type="checkbox" value=""       id="completed">
        </div>
      </div>
        <p class="p-3 h5 ">${name_of_task}</p>
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
  //-------------------------------------popup from checkbox-------------
  let originalColor; // Variable to store original color

  const completeTaskPopupBox = `
  <div id="completeTaskPopup" class="popup" style="position: fixed; width: 100%; height: 100%; top: 0; left: 0; display: flex; justify-content: center; align-items: center; background: rgba(0, 0, 0, 0.5);">
    <div class="popup-content p-3 border rounded bg-white shadow-lg position-relative" style="max-width: 400px; width: 90%;">
      <span id="closeCompleteTaskPopup" style="position: absolute; right: 15px; top: 10px; cursor: pointer; font-size: 25px; color: red;">&times;</span>
      <h2 class="text-center my-3">Task Completed!</h2>
      <div class="d-flex justify-content-center mt-3">
        <button id="closeCompleteTaskBtn" class="btn btn-primary">Close</button>
      </div>
    </div>
  </div>`;

  $(document).on("change", "#completed", function () {
    $(document).off("click", "#closeCompleteTaskBtn, #closeCompleteTaskPopup");

    let $card = $(this).closest(".card");

    if ($(this).is(":checked")) {
      originalColor = $card.css("backgroundColor");
      if ($("#completeTaskPopup").length === 0) {
        $("body").append(completeTaskPopupBox);
      }
    } else {
      // If the checkbox is unchecked, reset the color
      $card.find(".completed-on").remove();
      $card.animate(
        {
          backgroundColor: originalColor,
        },
        3000
      );
    }

    $(document).on(
      "click",
      "#closeCompleteTaskBtn, #closeCompleteTaskPopup",
      function () {
        $("#completeTaskPopup").remove();

        if ($("#completed").is(":checked")) {
          $card.animate(
            {
              backgroundColor: "#c3e6cb",
            },
            2000
          );

          let formattedDate = new Date().toISOString().split("T")[0];
          $.ajax({
            type: "PUT",
            url: `/tasks/completed`,
            data: JSON.stringify({
              id: $card.attr("id"),
              completed: "TRUE",
              date_completed: formattedDate,
            }),
            dataType: "json",
            contentType: "application/json",
            success: function (response) {
              console.log("Update success: ", response);
              // Ensure that the selector #footer-date is present in each card.
              $card
                .find("#footer-date")
                .append(
                  `<div class = "completed-on"> Completed On: ${formattedDate} </div>`
                );
            },
            error: function (error) {
              console.log("Update error: ", error);
            },
          });
        }
      }
    );
  });

  //edits the task
  $("#to-do-container").on("click", ".fa-pen-to-square", function () {
    $("#popup").remove();
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

    $("#to-do-container")
      .off("click", "#closePopup")
      .on("click", "#closePopup", function () {
        $("#popup").remove();
      });

    $("#to-do-container")
      .off("click", "#submitBtn")
      .on("click", "#submitBtn", function () {
        if (!$("#taskName").val() || !isNaN($("#taskName").val())) {
          alert("Please enter a valid task name");
        } else {
          if (
            !$("#date_added").val() ||
            !isValidDateFormat($("#date_added").val())
          ) {
            alert("Please enter a valid date(YYYY-MM-DD)");
          } else {
            if (!$("#category").val() || !isNaN($("#category").val())) {
              alert("Please enter a valid category");
            } else {
              //happy path - gather the information and populate our task with it
              renderTask(
                createTask(
                  $card.attr("id"),
                  $("#taskName").val(),
                  updateTaskTitle($("#category").val()),
                  $("#date_added").val()
                )
              );
              //call router put

              $.ajax({
                type: "PUT",
                url: `/tasks/${$card.attr("id")}`,
                data: JSON.stringify({
                  id: $card.attr("id"),
                  name_of_todo: $("#taskName").val(),
                  date_added: $("#date_added").val(),
                  category_id: checkCategoryID($("#category").val()),
                  completed: "FALSE",
                }),
                dataType: "json",
                contentType: "application/json",
                success: function (response) {
                  console.log("Update success: ", response);
                  $("#popup").remove();
                  $card.remove();
                },
                error: function (error) {
                  console.log("Update error: ", error);
                },
              });
            }
          }
        }
      });
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



  //adds color functionality to the icons - may need a module?

  $("#to-do-container").on("mouseover", ".fa-trash-can", function () {
    $(this).addClass("text-danger");
  });

  $("#to-do-container").on("mouseout", ".fa-trash-can", function () {
    $(this).removeClass("text-danger");
  });

  $("#to-do-container").on("mouseover", ".fa-pen-to-square", function () {
    $(this).addClass("text-primary");
  });

  $("#to-do-container").on("mouseout", ".fa-pen-to-square", function () {
    $(this).removeClass("text-primary");
  });

  $("#eat").on("mouseenter", function () {
    $(this).addClass("text-success");
  });

  $("#eat").on("mouseleave", function () {
    $(this).removeClass("text-success");
  });

  $("#watch").on("mouseenter", function () {
    $(this).addClass("text-success");
  });

  $("#watch").on("mouseleave", function () {
    $(this).removeClass("text-success");
  });

  $("#read").on("mouseenter", function () {
    $(this).addClass("text-success");
  });

  $("#read").on("mouseleave", function () {
    $(this).removeClass("text-success");
  });

  $("#buy").on("mouseenter", function () {
    $(this).addClass("text-success");
  });

  $("#buy").on("mouseleave", function () {
    $(this).removeClass("text-success");
  });

  $("#other").on("mouseenter", function () {
    $(this).addClass("text-success");
  });

  $("#other").on("mouseleave", function () {
    $(this).removeClass("text-success");
  });

  //filtering the database according to the category...

  $("#eat").on("click", function () {
    $("#to-do-container").empty();
    $.get("/tasks/restaurants", function (response) {
      generateTask(response);
    });
  });
  $("#watch").on("click", function () {
    $("#to-do-container").empty();
    $.get("/tasks/films", function (response) {
      generateTask(response);
    });
  });
  $("#read").on("click", function () {
    $("#to-do-container").empty();
    $.get("/tasks/books", function (response) {
      generateTask(response);
    });
  });
  $("#buy").on("click", function () {
    $("#to-do-container").empty();
    $.get("/tasks/products", function (response) {
      generateTask(response);
    });
  });
  $("#other").on("click", function () {
    $("#to-do-container").empty();
    $.get("/tasks/others", function (response) {
      generateTask(response);
    });
  });
//////////////////////////////////////////////////////////

  //add a new task
  $("#add-todo-button").on("click", () => {
    const popupBox = `
    <div id="popup" class="popup" style="position: fixed; width: 110%; height: 110%; top: -5%; left: -5%; display: flex; justify-content: center; align-items: flex-start; background: rgba(0, 0, 0, 0.5);">
      <div class="popup-content p-3 border rounded bg-white shadow-lg position-relative" style="margin-top: 10%; max-width: 660px; width: 90%;">
        <span id="closePopup" style="position: absolute; right: 15px; top: 10px; cursor: pointer; font-size: 25px; color: red;">&times;</span>
        <h2 class="text-center my-3">Create a new Task</h2>
        <input type="text" id="todoName" class="form-control my-3" placeholder="What do you want to do?">
        <div class="d-flex justify-content-center">
          <button id="submitBtn" class="btn btn-primary">Add to the list</button>
        </div>
      </div>
    </div>
    `;

    // Clicking on 'Add Todo' button
    $(document).on("click", "#add-todo-button", function (e) {
       e.stopPropagation();
      // If popup is not already displayed, show it
      if ($("#popup").length === 0) {
        $("body").append(popupBox);
      } else {
        // If popup is displayed, remove it and then re-append it
        $("#popup").remove();
        $("body").append(popupBox);
      }
    });

    // Clicking on 'x' or outside the popup content
    $(document).on("click", function (e) {
      if (
        !$(e.target).closest(".popup-content").length &&
        !$(e.target).is("#add-todo-button")
      ) {
        $("#popup").remove();
      }
    });

    // Prevent event propagation to document when clicking on the popup content
    $(document).on("click", ".popup-content", function (e) {
       e.stopPropagation();
    });

    // Clicking on 'Submit' button
    $(document).on("click", "#submitBtn", function () {
      //grab the info from the text box.
      const queryString = $("#todoName").val();
       // Close the popup right away
    $("#popup").remove();

      //search our api's using the textbox string
      $.post("tasks/api", { input: queryString }, function (response) {
        const currentDate = new Date();


        $.get("/tasks/lastID", function (res) {
          const nextTaskID = res.id + 1;
          const newTask = {
            taskID: nextTaskID,
            name_of_todo: response.Title,
            category: response.Category,
            categoryID: response.CategoryID,
            date_added: databaseConvertDate(currentDate),
            date_completed:databaseConvertDate(currentDate)
          };

          console.log("new Task above Post ", newTask);
          console.log("nexttaskid  ", nextTaskID);
          if (newTask.name_of_todo){
            $.post("tasks/newTask", newTask, function () {
              console.log("here in the newtask post");
              renderTask(
                createTask(
                  nextTaskID,
                  response.Title,
                  response.Category,
                  databaseConvertDate(currentDate)
                )
              );
            });
          }
        });
      });
      // Close the popup
      console.log("outside :)")
      // $("#popup").remove();
    });

    // Clicking on 'X' button
    $(document).on("click", "#closePopup", function (e) {
       e.stopPropagation();
      // Close the popup
      $("#popup").remove();
    });
  });
});

