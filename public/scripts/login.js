
const getUserById = (userId) => {
  return $.get(`/api/users/${userId}`);
};

const createUserDetails = (user) => {
  $('#userInfo').append(
    `
    <span>
      ${user.name} is logged in
    </span>
    `
  ).show();

  $('#userDetails').show();
};

//document is ready
$(() => {
  // hide user details on start up
  $('#userDetails').hide();
  $('#updateProfileForm').hide();

  $('#loginButton').click(() => {
    console.log('should collapse');
    $('#loginForm').collapse('toggle');
  });

  // login form sign in
  $("#loginForm").submit(function(event) {
    event.preventDefault();

    // serializes tweets
    const email = $('#email')[0].value.trim();
    // console.log('formData ', email);
    const password = $('#password')[0].value.trim();
    // console.log("password", password);
    const formData = {
      email: email,
      password:password
    };

    // ajax post request
    $.post('/api/users/login', formData)
      .then((res) => {
        console.log("login was successful", res);
        getUserById(res.id)
          .then((res) => {
            $('#loginForm').collapse('toggle');
            $('#loginSection').hide();
            createUserDetails(res);
          }).catch((err) => {
            console.log('error getting user by id ', err);
          });
      })
      .catch(function(err) {
        console.log("err ", err);
      });

  });

  $('#updateProfileButton').click(() => {
    $('#updateProfileForm').show();
    $('#updateProfileButton').hide();

  });

  $('#updateProfileForm').submit((event) => {
    event.preventDefault();
    console.log(FormData);
    const nameUpdate = $('#updateNameInput')[0].value.trim();
    // console.log("nameUpdate" ,nameUpdate);

    const formDataUpdate = {
      nameUpdate: nameUpdate
    };

    // console.log("formDataUpdate",formDataUpdate);
    $.post('api/users', formDataUpdate)
      .then((res) => {
        getUserById(res.id)
          .then((res) => {

            $('#updateProfileForm').hide();
            $('#userInfo').empty();
            createUserDetails(res);

          }).catch((err) => {
            console.log('error getting user by id ', err);
          });
      });
    $('#updateProfileButton').show();
  });
});




