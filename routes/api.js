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
            Author: bookData.items[0].volumeInfo.authors
              ? bookData.items[0].volumeInfo.authors[0]
              : "N/A",
            PublishedDate: bookData.items[0].volumeInfo.publishedDate,
            Description: bookData.items[0].volumeInfo.description,
            AverageRating: bookData.items[0].volumeInfo.averageRating || "N/A",
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
            Year: movieDetails.Year,
            Runtime: movieDetails.Runtime,
            Genre: movieDetails.Genre,
            Director: movieDetails.Director,
            imdbRating: movieDetails.imdbRating,
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
  const queryString = task.split(' ').join('+');
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
module.exports = { getBookDetails,getMovieDetails,checkWolfram };
