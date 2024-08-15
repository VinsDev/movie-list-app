# API Documentation

This document provides an overview of the API interactions in the Movie List Application. The application primarily interacts with **The Movie Database (TMDb) API** to fetch and display movie data.

## Base URL

All API requests to The Movie Database (TMDb) are made to the following base URL:

```
https://api.themoviedb.org/3
```

## Authentication

The application uses an API key for authentication with TMDb. The API key is stored in an environment variable named `VITE_API_KEY`.

To authenticate API requests, the API key must be included in the query string:

```
?api_key=your_api_key
```

## Endpoints

### 1. Fetch Popular Movies

**Endpoint:**

```
GET /movie/popular
```

**Example Request:**

```sh
GET https://api.themoviedb.org/3/movie/popular?api_key=your_api_key
```

**Query Parameters:**
- `api_key`: Your TMDb API key (required)
- `page`: The page of results to retrieve (optional)

**Response:**
```json
{
  "page": 1,
  "results": [
    {
      "id": 550,
      "title": "Fight Club",
      "overview": "A description of the movie...",
      "genre_ids": [18, 53],
      "poster_path": "/path_to_poster.jpg",
      "backdrop_path": "/path_to_backdrop.jpg",
      "release_date": "1999-10-15",
      "vote_average": 8.4,
      "runtime": 139,
      "production_companies": [
        {
          "name": "Fox 2000 Pictures",
          "id": 25
        }
      ]
    },
    ...
  ],
  "total_pages": 500,
  "total_results": 10000
}
```

### 2. Search for Movies

**Endpoint:**

```
GET /search/movie
```

**Example Request:**

```sh
GET https://api.themoviedb.org/3/search/movie?api_key=your_api_key&query=Inception
```

**Query Parameters:**
- `api_key`: Your TMDb API key (required)
- `query`: The text to search for (required)
- `page`: The page of results to retrieve (optional)

**Response:**
```json
{
  "page": 1,
  "results": [
    {
      "id": 27205,
      "title": "Inception",
      "overview": "A description of the movie...",
      "genre_ids": [28, 12, 878],
      "poster_path": "/path_to_poster.jpg",
      "backdrop_path": "/path_to_backdrop.jpg",
      "release_date": "2010-07-16",
      "vote_average": 8.3,
      "runtime": 148,
      "production_companies": [
        {
          "name": "Warner Bros. Pictures",
          "id": 174
        }
      ]
    },
    ...
  ],
  "total_pages": 10,
  "total_results": 200
}
```

### 3. Fetch Movie Details

**Endpoint:**

```
GET /movie/{movie_id}
```

**Example Request:**

```sh
GET https://api.themoviedb.org/3/movie/550?api_key=your_api_key
```

**Path Parameters:**
- `movie_id`: The ID of the movie to fetch details for (required)

**Query Parameters:**
- `api_key`: Your TMDb API key (required)

**Response:**
```json
{
  "id": 550,
  "title": "Fight Club",
  "overview": "A description of the movie...",
  "genres": [
    {
      "id": 18,
      "name": "Drama"
    }
  ],
  "poster_path": "/path_to_poster.jpg",
  "backdrop_path": "/path_to_backdrop.jpg",
  "release_date": "1999-10-15",
  "vote_average": 8.4,
  "runtime": 139,
  "production_companies": [
    {
      "name": "Fox 2000 Pictures",
      "id": 25
    }
  ],
  "budget": 63000000,
  "revenue": 100853753
}
```

## Error Handling

TMDb API responses will include an error message and a status code if something goes wrong. The application should handle these errors gracefully.

**Example Error Response:**

```json
{
  "status_code": 7,
  "status_message": "Invalid API key: You must be granted a valid key.",
  "success": false
}
```

**Common Status Codes:**
- `200 OK`: The request was successful.
- `401 Unauthorized`: Authentication failed due to an invalid API key.
- `404 Not Found`: The requested resource could not be found.
- `500 Internal Server Error`: An error occurred on TMDb's server.

## Utilities

### Image Base URL

TMDb provides images through a base URL that should be combined with the `poster_path` or `backdrop_path` returned in the API response.

**Image Base URL:**

```
https://image.tmdb.org/t/p/
```

**Example Image URL Construction:**

```sh
https://image.tmdb.org/t/p/w500/path_to_poster.jpg
```

## Notes

- **Rate Limiting**: TMDb API has rate limiting. Be mindful of the number of requests made in a short time.
- **Pagination**: Use the `page` parameter to paginate through results. TMDb API returns a maximum of 20 results per page.

## Conclusion

This document provides a comprehensive guide on how to interact with The Movie Database (TMDb) API within the Movie List Application. Ensure you have the necessary API key configured in your `.env` file and use the correct endpoints to fetch data from the API.
