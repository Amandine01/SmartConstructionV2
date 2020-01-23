import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Container, Row, Col } from 'reactstrap';
import './App.css';

//appels des différents élements du site
import Analyses from './container/Analyses';
import Navigation from './container/Navigation';
import Error from './component/Error';
import Accueil from './container/Accueil';

//page principale
class App extends Component {
  render() {
    return (
      <div className="accueil">
        <Row >  
          <BrowserRouter className="App">
            <Col xs="12" sm="12"> 
             <div>
              {/*barre de navigation*/}
              <Navigation />
              <Switch>
                //contenu page d'accueil 
                <Route path = "/" component = {Accueil} exact />
                //contenu pas d'analyses
                <Route path = "/Analyses" component = {Analyses} />
                <Route component = {Error} />
              </Switch>
            </div>
          </Col>
        </BrowserRouter>
      </Row>
    </div>
    );
  }
}

export default App;
