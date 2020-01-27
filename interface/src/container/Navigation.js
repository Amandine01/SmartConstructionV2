import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Row,
  Col} from 'reactstrap';
  import './Navigation.css';

class Navigation extends Component {
  constructor(props) {
   super(props);
   this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <header className="barre">
      <div>
       <Navbar dark expand="md">
          <NavbarBrand className="Titre" style={{color: 'white'}} href="/">Smart Construction</NavbarBrand>
          <NavbarToggler  onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink className="home" style={{color: 'white'}} to="/">Le Projet</NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="home" style={{color: 'white'}} to="/analyses">Analyses</NavLink>
              </NavItem>
              </Nav>
          </Collapse>
        </Navbar>
      </div>
      </header>
    );
  }
}

export default Navigation;
