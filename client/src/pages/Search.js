import React, { Component } from "react";
import { Form, FormBtn } from "../components/Form";
import ViewBtn from "../components/ViewBtn";
import SaveBtn from "../components/SaveBtn";
import Jumbotron from "../components/Jumbotron";


import { List, ListItem } from "../components/List";
import API from "../utils/API";

class Search extends Component {
    state = {
        // search: "",
        books: [],
        isBtnDisabled: false
    };

    loadBooks = () => {
        if (this.state.search) {
            API.searchBooks(this.state.search)
                .then(res => this.setState({ books: res.data.items }))
                .catch(err => console.log(err))
        }
        else {
            alert("Enter name of a book/part of the bookname to begin search");
        }




    };

    create = (id, title, image, link) => {
        this.setState({ isBtnDisabled: true });
        API.saveBook({
            id: id,
            title: title,
            image: image,
            link: link
        })
            .then(res => { this.loadBooks(); console.log(res.data) })
            .catch(err => console.log(err));


    }

    handleInputChange = event => {
        const { search, value } = event.target;
        this.setState({
            search: value
        });
    };


    // When the form is submitted, search the Giphy API for `this.state.search`
    handleFormSubmit = event => {
        event.preventDefault();
        this.loadBooks(this.state.search);
    };

    render() {
        return (
            <div>
                <Jumbotron >
                    <h4>Search and Save books with GoogleBooks </h4>

                </Jumbotron>
                <Form
                    // name="bookSearch"
                    value={this.state.search}
                    onChange={this.handleInputChange}
                    placeholder="...."

                />

                <FormBtn
                    onClick={this.handleFormSubmit}
                >
                    Search Book
        </FormBtn>
                <div>
                    {this.state.books.length > 0 ? (
                        <List>

                            {this.state.books.map(book => (
                                <ListItem key={book.id}      >
                                    <div className="row">
                                        <div className="col-2"   ></div>
                                        <div className="col-8">
                                            <div className="card">

                                                <img className="card-img-top" src={book.volumeInfo.imageLinks === undefined
                                                    ? "No image to show"
                                                    : `${book.volumeInfo.imageLinks.thumbnail}`}
                                                    alt={book.volumeInfo.title} style=
                                                    {{ textAlign: 'center', border: 'solid 1px black', boxShadow: '5px  5px grey', width: '200px', height: '200px' }} />
                                                <div className="card-body">
                                                    <h4 style={{ marginTop: '20px' }}>{book.volumeInfo.title}</h4>
                                                    <p>{book.volumeInfo.description}</p>
                                                    <SaveBtn disabled={this.state.isBtnDisabled}
                                                        onClick={
                                                            () => { this.create(book.id, book.volumeInfo.title, book.volumeInfo.imageLinks.thumbnail, book.volumeInfo.previewLink) }}
                                                    >  Save
                                </SaveBtn>
                                                    <ViewBtn href={book.volumeInfo.previewLink} />

                                                </div>
                                                <div className="col-2"   ></div>
                                            </div>
                                        </div>
                                    </div>

                                </ListItem>
                            ))}

                        </List>

                    ) : (
                            " ")}
                </div>
            </div>
        );
    }
}

export default Search;
