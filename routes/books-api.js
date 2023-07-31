const request = require('request');


const getBookDetails = (bookTitle) => {

  const apiKey = GOOG_API_KEY;
  const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(bookTitle)}&key=${apiKey}`;

  return new Promise((resolve, reject) => {
    request(apiUrl, (error, response, body) => {
      if (error) {
        const errorMessage = `Failed to collect book details for ${bookTitle}`;
        console.error(errorMessage, error.errorMessage);
        reject(new Error(errorMessage));
      } else {
        const bookDetails = JSON.parse(body);

        if (bookDetails.Response === 'False') {
          // If the API returns an error, handle it here
          const errorMessage = `Movie not found for ${movieTitle}`;
          console.error(errorMessage);
          reject(new Error(errorMessage));
      }
      else{
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
      }
    }
};
