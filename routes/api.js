const request = require("request");
const convert = require('xml-js');


const getBookDetails = (bookTitle) => {


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
            printType: bookData.items[0].volumeInfo.printType
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

  const apiUrl = `http://www.omdbapi.com/?apikey=${apiKey}&t=${encodeURIComponent(movieTitle)}`;

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
          // Extract only the required information
          const simplifiedMovieDetails = {
            Title: movieDetails.Title,
            Type: movieDetails.Type,
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

  console.log("task =",task);


  const apiUrl = `http://api.wolframalpha.com/v2/query?input=${task}&appid=${process.env.W_API_KEY}`;

  return new Promise((resolve, reject) => {
    request(apiUrl, (error, response, body) => {
      if (error) {
        // If the request fails
        const errorMessage = `Failed to fetch Wolfram details for ${task}`;
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
    console.log('there is an error' + error);
  });
};



//just reminder in case - JSON returns "canditates: as category"
const getRestaurant = (task) => {
  const apiKey = process.env.PLACES_API_KEY;

  if (!apiKey) {
    console.error('API key is missing or invalid');
    return { error: 'API key is missing or invalid' };
  }

  const apiUrl = new URL('https://maps.googleapis.com/maps/api/place/textsearch/json');
  const params = new URLSearchParams({
    query: task,
    key: apiKey,
  });

  apiUrl.search = params.toString();

  return new Promise((resolve, reject) => {
    request(apiUrl.toString(), (error, response, body) => {
      if (error) {
        const errorMessage = `Failed to fetch restaurant details for ${task}`;
        console.error(errorMessage, error.message);
        reject(new Error(errorMessage));
      } else {
        let placeData;
        try {
          placeData = JSON.parse(body);
        } catch (error) {
          console.error(`Failed to parse JSON: ${error.message}`);
          reject(new Error(`Failed to parse JSON: ${error.message}`));
        }

        if (placeData.status !== 'OK' || placeData.results.length === 0) {
          const errorMessage = `Place not found for ${task}`;
          //console.error(errorMessage);
          reject(new Error(errorMessage));
        } else {
          const placeDetails = {
            Name: placeData.results[0].name,
            Type: placeData.results[0].types,
          };
          resolve(placeDetails);
        }
      }
    });
  }).catch((error) => {
    console.error(error.message);
    return { error: 'Place not found' };
  });
};


module.exports = { getBookDetails, getMovieDetails, checkWolfram, getRestaurant};


