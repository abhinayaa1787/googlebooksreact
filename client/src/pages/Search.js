import React, { Component } from "react";
import { Form, FormBtn } from "../components/Form";
import ViewBtn from "../components/ViewBtn";
import SaveBtn from "../components/SaveBtn";

import { List, ListItem } from "../components/List";
import API from "../utils/API";

class Search extends Component {
    state = {
        search: "",
        books: []
    };

    // When this component mounts, search the Giphy API for pictures of kittens
    //   componentDidMount() {
    //     this.loadBooks();
    //   }
    loadBooks = () => {
        API.searchBooks(this.state.search)
            .then(res => this.setState({books: res.data },console.log(res.data)))
            .catch(err => console.log(err));

    };
    handleInputChange = event => {
        const { search, value } = event.target;
        this.setState({
          search: value
            });
    };


    // When the form is submitted, search the Giphy API for `this.state.search`
    handleFormSubmit = event => {
        event.preventDefault();
        console.log(this.state.books);
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
                    {/* // {this.state.books.length ? ( */}
                    <List>

                        {this.state.books.map(book => (
                            <ListItem key={book.id}>
                                <a href={book.previewLink}>
                                    Preview Link                    </a>
                            </ListItem>
                        ))}

                    </List>

                    {/* // : (
//               <h3>No Results to Display</h3>
//             )} */}
                </div>
            </div>
        );
    }
}

export default Search;
