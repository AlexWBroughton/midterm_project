//populate the lists on loading of the page.
$(() => {
  //getting films
  $.get('/films', function(response) {
    const $filmList = $('#films');
    $filmList.empty();

    //for(const user of response.users) {
    //  $(`<li class="user">`).text(user.name).appendTo($usersList);
    //}

    console.log(response);
  });
  //
  $.get('/restaurants', function(response) {
    const $restaurantList = $('#restaurants');
    $restaurantList.empty();

    //for(const user of response.users) {
    //  $(`<li class="user">`).text(user.name).appendTo($usersList);
    //}

    console.log(response);
  });
  $.get('/books', function(response) {
    const $bookList = $('#books');
    $bookList.empty();

    //for(const user of response.users) {
    //  $(`<li class="user">`).text(user.name).appendTo($usersList);
    //}

    console.log(response);
  });
  $.get('/products', function(response) {
    const $productList = $('#products');
    $productList.empty();

    //for(const user of response.users) {
    //  $(`<li class="user">`).text(user.name).appendTo($usersList);
    //}

    console.log(response);
  });
});
