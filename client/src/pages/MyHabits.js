import React, { Component } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem, resItem } from "../components/List";
import { Input, TextArea, FormBtn, SearchBtn } from "../components/Form";

class MyHabits extends Component {
  state = {
    username: "",
    email: "",
    habits: []
  };

  // componentDidMount() {
  //   this.loadUser();
  // }

  // loadUser = () => {
  //   API.getUsers()
  //     .then(res =>
  //       this.setState({
  //         username: res.username,
  //         email: res.email,
  //         habits: res.habits
  //       })
  //     )
  //     .catch(err => console.log(err));
  // };

  deleteUser = id => {
    API.deleteUser(id)
      .then(res => this.loadUser())
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
      API.saveUser({
        title: this.state.title,
        authors: this.state.authors,
        description: this.state.description
      })
        .then(res => this.loadUser())
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
            {this.state.users.length ? (
              <List>
                {this.state.users.map(user => (
                  <ListItem key={user._id}>
                    <Link to={"/user/" + user._id}>
                      <strong>
                        {user.title} by {user.authors}
                      </strong>
                    </Link>
                    <DeleteBtn onClick={() => this.deleteUser(user._id)} />
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

export default MyHabits;
