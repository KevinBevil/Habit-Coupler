import React, { Component } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem, resItem } from "../components/List";
import { Input, TextArea, FormBtn, SearchBtn } from "../components/Form";

class Books extends Component {
  state = {
    books: [],
    title: "",
    authors: "",
    description: "",
    image: "",
    link: "",
    bookResults: []
  };

  componentDidMount() {
    this.loadBooks();
  }

  loadBooks = () => {
    API.getBooks()
      .then(res =>
        this.setState({
          books: res.data,
          title: "",
          authors: "",
          description: "",
          image: "",
          link: ""
        })
      )
      .catch(err => console.log(err));
  };

  deleteBook = id => {
    API.deleteBook(id)
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };



  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.title && this.state.authors) {
      API.saveBook({
        title: this.state.title,
        authors: this.state.authors,
        description: this.state.description
      })
        .then(res => this.loadBooks())
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">

          </Col>
          <Col size="md-12 sm-12">
            <Jumbotron>
              <h1>My Coupled Habits</h1>
            </Jumbotron>
            {this.state.books.length ? (
              <List>
                {this.state.books.map(book => (
                  <ListItem key={book._id}>
                    <Link to={"/books/" + book._id}>
                      <strong>
                        {book.title} by {book.authors}
                      </strong>
                    </Link>
                    <DeleteBtn onClick={() => this.deleteBook(book._id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Books;
