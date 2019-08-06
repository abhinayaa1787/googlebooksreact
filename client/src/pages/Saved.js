import React, { Component } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import ViewBtn from "../components/ViewBtn";

import API from "../utils/API";
import { Link } from "react-router-dom";
// import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";

class Saved extends Component {
  state = {
    books: []
  };

  componentDidMount() {
    this.loadBooks();
  }

  loadBooks = () => {
    API.getBooks()
      .then(res =>
        this.setState({ books: res.data })
      )
      .catch(err => console.log(err));
  };

  deleteBook = id => {
    API.deleteBook(id)
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div>
                        <Jumbotron >
<h4>Search and Save books with GoogleBooks </h4>
                    
                </Jumbotron>

        <div>
          {this.state.books.length ? (
            <List>

              {this.state.books.map(book => (
                <ListItem key={book._id}      >
                  <div className="row">
                    <div className="col-2"   ></div>
                    <div className="col-8">
                      <div className="card">

                        <img className="card-img-top" src={book.image}
                          alt={book.title} style=
                          {{ textAlign: 'center', border: 'solid 1px black', boxShadow: '5px  5px grey', width: '200px', height: '200px' }} />
                        <div className="card-body">
                          <h4 style={{ marginTop: '20px' }}>{book.title}</h4>
                          <DeleteBtn
                            onClick={
                              () => this.deleteBook(book._id)} />
                                                        <ViewBtn href={book.link} />

                        </div>
                        <div className="col-2"   ></div>
                      </div>
                    </div>
                  </div>

                </ListItem>
              ))}

            </List>

          ) : (
              <h3>No saved books</h3>
            )}
        </div>
      </div>
    );
  }

}

export default Saved;
