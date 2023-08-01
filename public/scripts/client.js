$(() => {
  //initaliing our tweets with database data.
  $.get("/tasks", function (response) {
    const $filmList = $("#films");
    $filmList.empty();
    console.log(response);
  });

  $("#okButton").on("click", function () {
    const inputText = $("#taskBox").val();

    $.post("/", { task: inputText }, function (responseData) {
      console.log(responseData);
    });
  });
});
