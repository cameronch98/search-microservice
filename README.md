# Search Microservice
Store and retrieve a shared collection of search terms the users of your application have entered. For use in future auto-completion, search analysis, etc.

## Setting up Database and Port
Before utilizing the endpoints, create a .env file and enter the port for the service to run on as PORT and the MongoDB connect string as MONGO_URI. The database should be called search-terms-db, with a collection named search-terms.

## Making Requests and Receiving Data
There are 4 different endpoints to use in this application, /add-search-term, /all-search-terms, /matching-search-terms, and /random-search-term. The service is not deployed, so the calls are meant to be made via localhost at the port you chose in your env file. In the main application, you may utilize another name for the port in a different env file, or simply hard code the port you chose. In this case, we will just represent the port as PORT in a template literal.

### Add a Search Term
The endpoint /add-search-term can be used to add a new search term to the database. We can use fetch or axios to make the post request, and place the search term as "search" in the request body. The response includes JSON with an acknowledgement of the addition of the search term and the id of the added search term in the database. These code snippets should be used in an async function.

#### Fetch
```
// Make the request to the endpoint
const response = await fetch(`http://localhost:${PORT}/add-search-term`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: { search: "search term to add" }
});

// Parse the JSON to receive the data
const response = await response.json();
```

#### Axios
```
// Make the request to the endpoint
const response = await axios.post(
  `http://localhost:${PORT}/add-search-term`,
  {
    search: "search term to add",
  },
  {
    headers: { "Content-Type": "application/json" },
  },
);

// Axios automatically parses JSON, so response has data
```

#### Response Format
```
{
  "acknowledged": true,
  "insertedId": "65d902134bd5df79ec51aed9"
}
```

### Get All Search Terms
The endpoint /all-search-terms can be used to retrieve all search terms from the database. We can use fetch or axios to make the get request. The response includes JSON with key "searchTerms" that has a value of the array of search terms. These code snippets should be used in an async function.

#### Fetch
```
// Make the request to the endpoint
const response = await fetch(`http://localhost:${PORT}/all-search-terms`);

// Parse the JSON to receive the data
const response = await response.json();
```

#### Axios
```
// Make the request to the endpoint
const response = await axios.get(`http://localhost:${PORT}/all-search-terms`);

// Axios automatically parses JSON, so response has data
```

#### Response Format
```
{
  "searchTerms": [
    "dogs",
    "school",
    "birthday",
    "car",
    "graduation ceremony",
    "lake day",
    "school documents",
    "dogs"
  ]
}
```

### Get Matching Search Terms
The endpoint /matching-search-terms can be used to retrieve all search terms in the database beginning with the string sent in the request. This may represent a portion of a typed word as a user interacts with a search bar in an application. We can use fetch or axios to make the get request, and place the string as "search" in the request body. The response includes JSON with key "searchTerms" that has a value of the array of search terms. These code snippets should be used in an async function.

#### Fetch
```
// Make the request to the endpoint
const response = await fetch(`http://localhost:${PORT}/matching-search-terms`, {
  method: "GET",
  headers: {
    "Content-Type": "application/json"
  },
  body: { search: "scho" }
});

// Parse the JSON to receive the data
const response = await response.json();
```

#### Axios
```
// Make the request to the endpoint
const response = await axios.get(
  `http://localhost:${PORT}/add-search-term`,
  {
    search: "scho",
  },
  {
    headers: { "Content-Type": "application/json" },
  },
);

// Axios automatically parses JSON, so response has data
```

#### Response Format
```
{
  "searchTerms": [
    "school",
    "school documents"
  ]
}
```

### Get a Random Search Term
The endpoint /random-search-term can be used to retrieve a random search term from the database. This can be used for "feeling lucky" utilities in an application that utilizes a search functionality. We can use fetch or axios to make the get request. The response includes JSON with key "randomTerm" that has a value of the random search term as a string. These code snippets should be used in an async function.

#### Fetch
```
// Make the request to the endpoint
const response = await fetch(`http://localhost:${PORT}/random-search-term`);

// Parse the JSON to receive the data
const response = await response.json();
```

#### Axios
```
// Make the request to the endpoint
const response = await axios.get(`http://localhost:${PORT}/random-search-term`);

// Axios automatically parses JSON, so response has data
```

#### Response Format
```
{
  "randomTerm": "birthday"
}
```
