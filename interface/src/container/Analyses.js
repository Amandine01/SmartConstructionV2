import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import './Analyses.css';

//importation des différents éléments de la page : 1 carte et 3 graphiques
import Carte from '../component/Carte';
import GraphGaz from '../component/GraphGaz';
import GraphParticules from '../component/GraphParticules';
import GraphSon from '../component/GraphSon';

//page analyses
export default class Analyses extends Component {
  //stockage donnée reçu par un composant de la page (ici Carte)
  state ={message:""}
  
  //fonction de récupération du message reçu 
  callbackFunction = (childData) => {
    this.setState({message: childData})
  }

  render() {

    return (
      <Row Class>
        <Col xs="12" sm="12"> <h1 className="titreresults">Analyses de la pollution sur le chantier </h1> </Col>
        
        {/*affichage de la carte google map et récupération du capteur cliqué*/}
        <Col sm="1"></Col>
        <Col xs="12" sm="10" className="espacecarte">
          <Carte parentCallback = {this.callbackFunction}/>
        </Col>
        <Col xs="1" sm="1"></Col>
        
        {/*affichage du graphique gaz et envoie du message récupéré précédemment*/}
        <Col xs="12" sm="12"> <h2 className="typepolluant">Gaz polluants</h2> </Col>
        <Col sm="1"></Col>
        <Col xs="12" sm="10" className="graph">
          <GraphGaz value = {this.state.message} />
        </Col>
        <Col xs="2" sm="2"></Col>
   
        {/*affichage du graphique particules fines et envoie du message récupéré précédemment*/}
        <Col xs="12" sm="12"> <h2 className="typepolluant">Particules fines</h2> </Col>
        <Col sm="1"></Col>
        <Col xs="12" sm="10" className="graph">
          <GraphParticules value = {this.state.message} />
        </Col>
        <Col xs="2" sm="1"></Col>

      
        {/*affichage du graphique pollution sonore et envoie du message récupéré précédemment*/}
        <Col xs="12" sm="12"> <h2 className="typepolluant">Pollution sonore</h2> </Col>
        <Col sm="1"></Col>
          <Col xs="12" sm="10" className="graph">
            <GraphSon value = {this.state.message} />
          </Col>
        <Col xs="2" sm="1"></Col>

      </Row>
    );
  }
}

