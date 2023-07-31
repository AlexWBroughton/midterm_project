const request = require('request');

const getMovieDetails = (movieTitle) => {
  const apiKey = '96b19b98';
  const apiUrl = `http://www.omdbapi.com/?apikey=${apiKey}&t=${encodeURIComponent(movieTitle)}`;

  return new Promise((resolve, reject) => {
    request(apiUrl, (error, response, body) => {
      if (error) {
        const errorMessage = `Failed to fetch movie details for ${movieTitle}`;
        console.error(errorMessage, error.message);
        reject(new Error(errorMessage));
      } else {
        const movieDetails = JSON.parse(body);

        if (movieDetails.Response === 'False') {
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

module.exports = { getMovieDetails };
