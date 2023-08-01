const request = require("request");

const getBookDetails = (bookTitle) => {
  const apiKey = process.env.GOOG_API_KEY;
  const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
    bookTitle
  )}&key=${apiKey}`;

  return new Promise((resolve, reject) => {
    // Create a new promise
    request(apiUrl, (error, response, body) => {
      //
      if (error) {
        // If the request fails
        const errorMessage = `Failed to fetch book details for ${bookTitle}`;
        console.error(errorMessage, error.message); // Log the error message
        reject(new Error(errorMessage));
      } else {
        // If the request is successful
        const bookData = JSON.parse(body); // Parse the response body to JSON

        if (bookData.error) {
          // If the API returns an error, handle it here
          const errorMessage = `Book not found for ${bookTitle}`; // Create a custom error message
          console.error(errorMessage); // Log the error message
          reject(new Error(errorMessage)); // Reject the promise with an error
        } else {
          // Extract only the required information
          const bookDetails = {
            // Create an object with the required information
            Title: bookData.items[0].volumeInfo.title,
            // Author: bookData.items[0].volumeInfo.authors
            //   ? bookData.items[0].volumeInfo.authors[0]
            //   : "N/A",
            // PublishedDate: bookData.items[0].volumeInfo.publishedDate,
            // Description: bookData.items[0].volumeInfo.description,
            // AverageRating: bookData.items[0].volumeInfo.averageRating || "N/A",
            // Add more properties as needed
          };

          resolve(bookDetails); // Resolve the promise with the book details
        }
      }
    });
  });
};



const getMovieDetails = (movieTitle) => {
  const apiKey = process.env.OMDB_API_KEY;
  const apiUrl = `http://www.omdbapi.com/?apikey=${apiKey}&t=${encodeURIComponent(
    movieTitle
  )}`;

  return new Promise((resolve, reject) => {
    request(apiUrl, (error, response, body) => {
      if (error) {
        const errorMessage = `Failed to fetch movie details for ${movieTitle}`;
        console.error(errorMessage, error.message);
        reject(new Error(errorMessage));
      } else {
        const movieDetails = JSON.parse(body);

        if (movieDetails.Response === "False") {
          // If the API returns an error, handle it here
          const errorMessage = `Movie not found for ${movieTitle}`;
          console.error(errorMessage);
          reject(new Error(errorMessage));
        } else {
          // Extract only the required information and add the Type field
          const simplifiedMovieDetails = {
            Title: movieDetails.Title,
            Type: movieDetails.Type.toLowerCase(), // Convert to lowercase for consistency
            // Add more properties as needed
          };

          resolve(simplifiedMovieDetails);
        }
      }
    });
  });
};

const checkWolfram = (task) => {
  const testString = JSON.stringify(task);
  const queryString = testString.split(' ').join('+');
  // `http://api.wolframalpha.com/v2/query?input=${queryString}&appid=${process.env.WAAPIKEY}`
  return request(`http://api.wolframalpha.com/v2/query?input=${queryString}&appid=${process.env.W_API_KEY}`)
  .then((response) => {
    const obj = convert.xml2json(response);
    const JSONobj = JSON.parse(obj);
    return JSONobj.elements[0].attributes.datatypes;
    }
  )
  .catch((error) => {
    console.log(error);
  });
};


//just reminder in case - JSON returns "canditates: as category"
const getRestaurant = (task) => {
  const queryString = task.split(' ').join('+');
  const apiKey = process.env.PLACES_API_KEY;
  const apiUrl = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?fields=name&input=${encodeURIComponent(queryString)}&inputtype=textquery&key=${apiKey}`;

  return new Promise((resolve, reject) => {
    request(apiUrl, (error, response, body) => {
      if (error) {
        // If the request fails
        const errorMessage = `Failed to fetch restaurant details for ${task}`;
        console.error(errorMessage, error.message); // Log the error message
        reject(new Error(errorMessage));
      } else {
        const restaurantData = JSON.parse(body);
        if (restaurantData.status !== 'OK' || restaurantData.candidates.length === 0) {
          // If the API returns an error or no restaurant found, handle it here
          const errorMessage = `Restaurant not found for ${task}`;
          console.error(errorMessage);
          reject(new Error(errorMessage));
        } else {
          // Extract only the required information
          const restaurantDetails = { Name: restaurantData.candidates[0].name };
          resolve(restaurantDetails);
        }
      }
    });
  });
};


const getProduct = (productName) => {
  const apiKey = 'b1b208bedbmshacb994a6700332fp1701dfjsncc912d96137f';
  const apiUrl = 'https://product-categorization.p.rapidapi.com/products/v1/categorized';

  const options = {
    method: 'GET',
    url: apiUrl,
    qs: {
      title: productName,
      price: '200' // price is a required parameter, we may need to change to our needs
    },
    headers: {
      'X-RapidAPI-Key': apiKey,
      'X-RapidAPI-Host': 'product-categorization.p.rapidapi.com'
    }
  };

  return new Promise((resolve, reject) => {
    request(options, (error, response, body) => {
      if (error) {
        const errorMessage = `Failed to fetch product details for ${productName}`;
        console.error(errorMessage, error.message);
        reject(new Error(errorMessage));
      } else {
        const productData = JSON.parse(body);
        if (!productData.title) {
          // If the API returns an error or no product found, handle it here
          const errorMessage = `Product not found for ${productName}`;
          console.error(errorMessage);
          reject(new Error(errorMessage));
        } else {
          // Extract only the required information
          const productDetails = { Name: productData.title };
          resolve(productDetails);
        }
      }
    });
  });
};

module.exports = { getBookDetails, getMovieDetails, getRestaurant,checkWolfram,getProduct };




// const interpretTask = (task) => {
//   if (task.includes("eat")) {
//     // User wants to find a restaurant
//     return getRestaurant(task);
//   } else if (task.includes("buy")) {
//     // User wants to find a product
//     return getProduct(task);
//   } else if (task.includes("watch")) {
//     // User wants to find a movie
//     return getMovieDetails(task);
//   } else if (task.includes("read")) {
//     // User wants to find a book
//     return getBookDetails(task);
//   } else {
//     // If no keyword is found, check Wolfram
//     return checkWolfram(task);
//   }
// };
