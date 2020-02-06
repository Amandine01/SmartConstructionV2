import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Container, Row, Col } from 'reactstrap';
import './Accueil.css';

//photos des membres de l'équipe
import Solene from '../component/solene.jpg';
import Amandine from '../component/amandine.jpg';
import Martin from '../component/martin.jpg';
import Marie from '../component/marie.jpg';
import Manar from '../component/manar.jpg';
import Agetha from '../component/agetha.jpg';
import Aurelio from '../component/aurelio.jpg';
import Projet from '../component/projet.jpg';



export default class Accueil extends Component {
  render() {
    return (
    	<Row>
        {/*titre du site*/}
        <Col xs="12" sm="12"> 
          <header className="titre">
            {/*grand titre*/}
            <h1>Smart Construction</h1>
            <h2>Un PFE pour des chantiers plus responsables</h2>
          </header>
        </Col>
        
        {/*section présentation du projet*/}
        <Col xs="12" sm="12"><h2 className="soustitre"> Le projet </h2></Col>
        <Col xs="12" sm="6"> 
          <img className="photo2" src={Projet}/>
             
          
        </Col>

        <Col xs="12" sm="6"> 
          <div className="texte"> 
          Smart Construction, un dispositif de contrôle de la qualité de l’air et du niveau sonore sur les chantiers de construction. Ce projet a pour but de renseigner les résidents alentours sur l’incidence du chantier sur leur qualité de vie et ainsi de leur indiquer les zones où sont dégagées les plus grandes quantités de pollution.

  Un ensemble de capteurs mesure le taux de pollution émise à un endroit donné, à savoir : 
  <ul>
  <li>Les gaz polluants comme le Monoxyde de Carbone (CO) et le Dioxyde d’Azote (NO2)</li>
  <li>Les différents types de particules fines émises, le PM10 et PM2.5</li>
  <li>Les nuisances sonores</li>
  <li>La position GPS du dispositif</li>
  </ul>
 

          </div>
        </Col>
        
        {/*section présentation de l'équipe*/}
        <Col xs="12" sm="12"><h2 className="soustitre"> L'équipe </h2></Col>
        {/*1ère ligne*/}
        <Col xs="12" sm="2" className="m1"> </Col>
        
        {/*1er membre : Amandine*/}
        <Col xs="12" sm="2" className="m1"> 
          <div className="nom">
            <img className="member" src={Amandine}/>
            <div className="legende">Amandine <br/> Ducruet</div>
          </div>
        </Col>
        
        {/*2ème membre : Solène*/}
        <Col xs="12" sm="2" className="m2"> 
          <div className="nom">
            <img className="member2" src={Solene}/>
              <div className="legende">Solène <br/> Consten</div> 
          </div>
        </Col>
        
        {/*3ème membre : Manar*/}
        <Col xs="12" sm="2" className="m3"> 
          <div className="nom">
            <img className="member3" src={Manar}/> 
            <div className="legende">Manar <br/> Aggoun</div> 
          </div>
        </Col>
        
        {/*4ème membre : Martin*/}
        <Col xs="12" sm="2" className="m4"> 
          <div className="nom">
            <img className="member4" src={Martin}/> 
            <div className="legende">Martin <br/> Le Mintier</div> 
          </div>
        </Col>

     <Col xs="12" sm="2" className="m1"> </Col>

     {/*2ème ligne*/}
     <Col xs="12" sm="3" className="m1"> </Col>
        
        {/*5ème membre : Marie*/}
        <Col xs="12" sm="2"> 
          <div className="nom">
            <img className="member5" src={Marie}/> 
            <div className="legende">Marie <br/> Yahiaoui</div> 
          </div>
        </Col>
        
        {/*6ème membre : Agetha*/}
        <Col xs="12" sm="2"> 
          <div className="nom">
            <img className="member6" src={Agetha}/> 
            <div className="legende">Agetha <br/> Sugunaparajan</div> 
          </div>
        </Col>
        
        {/*7ème membre : Aurelio*/}
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
