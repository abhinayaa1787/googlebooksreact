const axios = require("axios");
const router = require("express").Router();
const booksController = require("../controllers/booksController");



router.get("/", (req, res) => {
  axios
    .get("https://www.googleapis.com/books/v1/volumes?q=", { params: req.query  } )
    .then(({ data: { results } }) => res.json(results))
    .catch(err => res.status(422).json(err));
});
router.route("/api/books")
  .get(booksController.findAll)

// Matches with "/api/books/:id"
router
  .route("/api/books/:id")
  .get(booksController.findById)
  .put(booksController.update)
  .delete(booksController.remove);

  router.route("/api/books").post(booksController.create);


module.exports = router;
