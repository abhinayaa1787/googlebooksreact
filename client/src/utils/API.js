import axios from "axios";



export default {
  // Gets all books
  searchBooks: function(query) {
    return axios.get("https://www.googleapis.com/books/v1/volumes/", { params: { q: query } })
  },
  getBooks: function() {
    return axios.get("/api/books/" );
  },
  // Deletes the book with the given id
  deleteBook: function(id) {
    return axios.delete("/api/books/" + id);
  },
  // Saves a book to the database
  saveBook: function(bookData) {
    return axios.post("/api/books", bookData);
  }
};
