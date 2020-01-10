import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Container, Row, Col } from 'reactstrap';
import './Accueil.css';

import Solene from '../component/solene.jpg';
import Amandine from '../component/amandine.jpg';
import Martin from '../component/martin.jpg';
import Marie from '../component/marie.jpg';
import Manar from '../component/manar.jpg';
import Agetha from '../component/agetha.jpg';
import Aurelio from '../component/aurelio.jpg';


export default class Accueil extends Component {
  render() {
    return (
    	<Row className="widget_grid">
      	<Col xs="12" sm="12"> 
        <header className="titre">
          
              <h1>Smart Construction</h1>
              <h2>Un PFE pour des chantiers plus responsables</h2>
            
        </header>
        </Col>
        <Col xs="12" sm="12"><h2 className="soustitre"> Le projet </h2></Col>
        
          <Col xs="12" sm="6"> 
            <div className="image"> 
            Insérer image ici 
            </div>
          </Col>
          <Col xs="12" sm="6"> 
            <div className="texte"> 
            Voici l'interface de notre projet PFE Smart Construction 
            </div>
          </Col>
        
        <Col xs="12" sm="12"><h2 className="soustitre"> L'équipe </h2></Col>
        
          <Col xs="12" sm="2" className="m1"> </Col>

          <Col xs="12" sm="2" className="m1"> 
            <div className="nom">
              <img className="member" src={Amandine}/>
              <div className="legende">Amandine <br/> Ducruet</div>
            </div>
          </Col>

          <Col xs="12" sm="2" className="m2"> 
            <div className="nom">
              <img className="member2" src={Solene}/>
              <div className="legende">Solène <br/> Consten</div> 
              </div>
          </Col>

          <Col xs="12" sm="2" className="m3"> 
            <div className="nom">
              <img className="member3" src={Manar}/> 
              <div className="legende">Manar <br/> Aggoun</div> 
            </div>
          </Col>

          <Col xs="12" sm="2" className="m4"> 
            <div className="nom">
              <img className="member4" src={Martin}/> 
              <div className="legende">Martin <br/> Le Mintier</div> 
            </div>
          </Col>

        <Col xs="12" sm="2" className="m1"> </Col>

        <Col xs="12" sm="3" className="m1"> </Col>
        
        <Col xs="12" sm="2"> 
          <div className="nom">
            <img className="member5" src={Marie}/> 
            <div className="legende">Marie <br/> Yahiaoui</div> 
          </div>
        </Col>

        <Col xs="12" sm="2"> 
          <div className="nom">
            <img className="member6" src={Agetha}/> 
            <div className="legende">Agetha <br/> Sugunaparajan</div> 
          </div>
        </Col>

        <Col xs="12" sm="2"> 
          <div className="nom">
            <img className="member7" src={Aurelio}/> 
            <div className="legende">Aurelio <br/> Rognetta</div> 
          </div>
        </Col>


      </Row>
    );
  }
}
