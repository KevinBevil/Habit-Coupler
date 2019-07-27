import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";


class Login extends Component {
   render() {
     return (
       <Container fluid>
         <Col size="md-12 sm-12">
           <Jumbotron>
             <h1>Login to Habit Coupler</h1>
           </Jumbotron>
         </Col>
       </Container>
     );
   }
 }
 
 export default Login;