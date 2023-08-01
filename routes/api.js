const request = require("request");
const convert = require('xml-js');


const getBookDetails = (bookTitle) => {
//need to console.log booktitle


  if (typeof bookTitle !== 'string' || bookTitle.trim().length === 0) {
    throw new Error('Invalid book title');
  }

  const apiKey = process.env.GOOG_API_KEY;
  if (!apiKey) {
    throw new Error('GOOG_API_KEY is not defined');
  }

  const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
    bookTitle
  )}&key=${apiKey}`;

  return new Promise((resolve, reject) => {
    request(apiUrl, (error, response, body) => {
      if (error) {
        const errorMessage = `Failed to fetch book details for ${bookTitle}`;
        console.error(errorMessage, error.message);
        reject(new Error(errorMessage));
      } else {
        if (response.statusCode !== 200) {
          const errorMessage = `Failed to fetch book details for ${bookTitle}. Status code: ${response.statusCode}`;
          console.error(errorMessage);
          reject(new Error(errorMessage));
          return;
        }

        let bookData;
        try {
          bookData = JSON.parse(body);
        } catch (error) {
          console.error(`Failed to parse JSON for ${bookTitle}`, error.message);
          reject(new Error(`Failed to parse JSON for ${bookTitle}`));
          return;
        }

        if (bookData.error || !bookData.items || bookData.items.length === 0) {
          const errorMessage = `Book not found for ${bookTitle}`;
          console.error(errorMessage);
          reject(new Error(errorMessage));
        } else {
          const bookDetails = {
            Title: bookData.items[0].volumeInfo.title,
          };

          resolve(bookDetails);
        }
      }
    });
  }).catch((error) => {
    console.error(error.message);
    return { error: 'Book not found' };
  });
};



const getMovieDetails = (movieTitle) => {
  const apiKey = process.env.OMDB_API_KEY;

  // Check if the API key is provided
  if (!apiKey) {
    const errorMessage = 'OMDB_API_KEY is not provided';
    console.error(errorMessage);
    return { error: errorMessage };
  }

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
        if (response.statusCode !== 200) {
          const errorMessage = `Failed to fetch movie details for ${movieTitle}. Status code: ${response.statusCode}`;
          console.error(errorMessage);
          reject(new Error(errorMessage));
          return;
        }

        let movieDetails;
        try {
          movieDetails = JSON.parse(body);
        } catch (error) {
          const errorMessage = `Failed to parse movie details for ${movieTitle}`;
          console.error(errorMessage, error.message);
          reject(new Error(errorMessage));
          return;
        }

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
  }).catch((error) => {
    console.error(error.message);
    return { error: 'Movie/Series not found' };
  });
};



const checkWolfram = (task) => {

  console.log("task =",task[0]);


  const apiUrl = `http://api.wolframalpha.com/v2/query?input=${task[0]}&appid=${process.env.W_API_KEY}`;

  return new Promise((resolve, reject) => {
    request(apiUrl, (error, response, body) => {
      if (error) {
        // If the request fails
        const errorMessage = `Failed to fetch Wolfram details for ${task[0]}`;
        console.error(errorMessage, error.message); // Log the error message
        reject(new Error(errorMessage));
      } else{
        const obj = convert.xml2js(body);
        console.log(obj.elements[0].attributes.datatypes);
        resolve(obj.elements[0].attributes.datatypes);

      }
    })
  })
  .catch((error) => {
    console.log(error);
  });
};



//just reminder in case - JSON returns "canditates: as category"
const getRestaurant = (task) => {
  const queryString = task.split(' ').join('+');
  const apiKey = process.env.PLACES_API_KEY;

  if (!apiKey) {
    console.error('API key is missing or invalid');
    return { error: 'API key is missing or invalid' };
  }

  const url = new URL('https://maps.googleapis.com/maps/api/place/findplacefromtext/json');
  const params = new URLSearchParams({ //improve the search parameters
    fields: 'name',
    input: queryString,
    inputtype: 'textquery',
    key: apiKey
  });

  url.search = params.toString(); // Construct the API URL

  return new Promise((resolve, reject) => {
    request(url.toString(), (error, response, body) => {
      if (error) {
        // If the request fails
        const errorMessage = `Failed to fetch restaurant details for ${task}`;
        console.error(errorMessage, error.message); // Log the error message
        reject(new Error(errorMessage));
      } else {
        let restaurantData;
        try {
          restaurantData = JSON.parse(body);
        } catch (error) {
          console.error(`Failed to parse JSON: ${error.message}`);
          reject(new Error(`Failed to parse JSON: ${error.message}`));
        }

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
  }).catch((error) => {
    // Handle the rejected promise here
    console.error(error.message);
    return { error: 'Restaurant not found' }; // Provide a fallback response or error handling
  });
};


const getProduct = (productName) => {
  const apiKey = process.env.PROD_API_KEY;
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
        if (response.statusCode !== 200) {
          const errorMessage = `Failed to fetch product details for ${productName}`;
          console.error(errorMessage, response.statusCode);
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
      }
    });
  }).catch((error) => {
    // Handle the rejected promise here
    console.error(error.message);
    return { error: 'Product not found' }; // Provide a fallback response or error handling
  });
};

module.exports = { getBookDetails, getMovieDetails,checkWolfram,getProduct,getRestaurant};




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
