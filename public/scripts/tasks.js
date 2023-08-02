$(() => {
  //initaliing our tweets with database data.
  $.get("/tasks", function (response) {
    let currentTask = response[0];

    renderTask(createTask(currentTask.name_of_todo,updateTaskTitle(currentTask.category),currentTask.date_added));

    currentTask = response[1];
    renderTask(createTask(currentTask.name_of_todo,updateTaskTitle(currentTask.category),currentTask.date_added));

    currentTask = response[2];
    renderTask(createTask(currentTask.name_of_todo,updateTaskTitle(currentTask.category),currentTask.date_added));
  });
  // <!--<i class="fa-solid fa-utensils"></i>-->
  // <!--<i class="fa-solid fa-tv"></i>-->
  // <!--<i class="fa-solid fa-book-open"></i>-->
  // <!--<i class="fa-solid fa-bag-shopping"></i>-->

  //generate html 'tweet'

  const createTask = function (task, category, date_added){
    console.log('category in createTask', category)
    const iconClass = getIcon(category);


    console.log('get icon(category)' , getIcon(category));

    const $task = $(`
    <div class="card mx-auto py-1" style="width:80%">
    <div class="card-header">
    <i class="${iconClass}"></i>
      ${category}
    </div>
    <div class="card-body " >
      <blockquote class="blockquote mb-0">
        <p>${task}</p>
        <footer class=" blockquote-footer py-1">Date Added: <cite title="Source Title">"${date_added}"</cite></footer>
      </blockquote>
          <div class="d-flex justify-content-end">
            <a><i class="fa-solid fa-trash-can fa-lg px-2" id="iconTrash"></i></a>
            <a><i class="fa-solid fa-pen-to-square fa-lg px-2" id="iconEdit"></i></a>
          </div>
    </div>
  </div>
  <br>`
  );
  return $task;
}



//render the html 'tweet'

const renderTask = function (task){
  $("#to-do-container").append(task);
}

  $("#okButton").on("click", function () {
    const inputText = $("#taskBox").val();

    $.post("/tasks", { task: inputText }, function (responseData) {
      console.log(responseData);
    });
  });


  const updateTaskTitle = function(category){
    switch(category) {
      case "buy":
        return "Products"
        break;
      case "eat":
        return "Restaurants"
        break;
      case "read":
        return "Books"
        break;
      case "watch":
        return "Films"
        break;
      default: ""
        // code block
    }
  }

  const getIcon = function(category){
    switch (category) {
      case "Products":
        return "fa-solid fa-bag-shopping"
        break;
      case "Restaurants":
        return "fa-solid fa-utensils"
        break;
      case "Books":
        return "fa-solid fa-book-open"
        break;
      case "Films":
        return "fa-solid fa-tv"
        break;
      default: ""
        // code block
    }
  }
});

