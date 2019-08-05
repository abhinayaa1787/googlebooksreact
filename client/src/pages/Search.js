import React, { Component } from "react";
import { Form, FormBtn } from "../components/Form";
import ViewBtn from "../components/ViewBtn";
import SaveBtn from "../components/SaveBtn";

import { List, ListItem } from "../components/List";
import API from "../utils/API";

class Search extends Component {
    state = {
        // search: "",
        books: []
    };

    loadBooks = () => {
        API.searchBooks(this.state.search)
            .then(res => this.setState({books:res.data.items},console.log(res.data.items)))
            .catch(err => console.log(err));

    };

    create = (id,title,image,link) => {
        API.saveBook({
            id: id,
            title: title,
            image: image,
            link: link
        })
            .then(res => {this.loadBooks();console.log(res.data)})
            .catch(err => console.log(err))
          
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
                <form>
                    <Form
                        // name="bookSearch"
                        value={this.state.search}
                        onChange={this.handleInputChange}
                        placeholder="Search For a Book"

                    />

                    <FormBtn
                        onClick={this.handleFormSubmit}
                    >
                        Search Book
        </FormBtn>
                </form>
                <div>
                     {this.state.books.length ? (
                    <List>

                        {this.state.books.map(book => (
                            <ListItem key={book.id}      >                                    <strong>{book.volumeInfo.title}</strong>
                            <img alt={book.volumeInfo.title} src={book.volumeInfo.imageLinks.smallThumbnail}></img>

                                {/* <a href={book.volumeInfo.previewLink}>
                                    Preview Link                    </a>*/}
                                    <ViewBtn href={book.volumeInfo.previewLink}/> 
                                    <SaveBtn
                                    onClick ={
                                        () => this.create(book.id,book.volumeInfo.title,book.volumeInfo.imageLinks.smallThumbnail,book.volumeInfo.previewLink)} />
                            </ListItem>
                        ))}

                    </List>

                    ) : (
              <h3>Search for a book</h3>
            )} 
                </div>
            </div>
        );
    }
}

export default Search;
