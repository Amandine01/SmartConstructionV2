import React, { Component } from 'react';
import { compose, withProps } from "recompose"
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import axios from 'axios';

//taille carte
const mapStyles = {
  width: '100%',
  height: '100%'
};

class MapContainer extends Component {
  //constructeur avec tableau de capteurs et fonctions des marqueurs cliqués
  constructor(props) {
    super(props);
    this.senData=this.sendData.bind(this);
    this.marker1=this.marker1.bind(this);
    this.marker2=this.marker2.bind(this);
    this.state = {
      capteurs: [],
    }
  }

  componentDidMount() {
    this.sync();
  } 
  
  //envoie du nom du capteur au Parent (ici Parent = Analyses.js)
  sendData(nom) {
    this.props.parentCallback(nom);
  }

  //fonction s'executant lorsque que le marqueur 1 est cliqué
  marker1(){
    console.log("marker 1 cliqué");
    this.sendData(1);

  }
  
  //fonction s'executant lorsque que le marqueur 2 est cliqué
  marker2(){
    console.log("marker 2 cliqué");
    this.sendData(2);
  }

  render() {

    const { capteurs } = this.state;
    
    //tableau contenant les latitudes correspondantes au capteur 1
    const latitude_capteur = [];
    //tableau contenant les longitudes correspondantes au capteur 1
    const longitude_capteur = [];
    //tableau contenant les latitudes correspondantes au capteur 2
    const latitude_capteur2 = [];
    //tableau contenant les longitudes correspondantes au capteur 2
    const longitude_capteur2 = [];

    //on parcourt tous les capteurs de la Base de données
    capteurs.forEach(a => {
      //si le nom du capteur parcouru est "1"
      if (a.nom_capteur === "1") {
        //on stocke alors sa latitude et longitude dans les tableaux correspondant
        latitude_capteur.push(a.Latitude);
        longitude_capteur.push(a.Longitude);
      }
      
      //si le nom du capteur parcouru est "2"
      else if (a.nom_capteur === "2") {
        //on stocke alors sa latitude et longitude dans les tableaux correspondant
        latitude_capteur2.push(a.Latitude);
        longitude_capteur2.push(a.Longitude);
      }  
    });


    //on récupère la dernière latitude et dernière longitude de la base de données du capteur 1 
    //= dernière position du capteur 1
    const derniere_lat = latitude_capteur.slice(Math.max(latitude_capteur.length - 1, 0));
    const derniere_long = longitude_capteur.slice(Math.max(longitude_capteur.length - 1, 0));
    
    //on récupère la dernière latitude et dernière longitude de la base de données du capteur 2 
    //= dernière position du capteur 2
    const derniere_lat2 = latitude_capteur2.slice(Math.max(latitude_capteur2.length - 1, 0));
    const derniere_long2 = longitude_capteur2.slice(Math.max(longitude_capteur2.length - 1, 0));


    return (
      <Map
      google={this.props.google}
      zoom={13}
      style={mapStyles}
      initialCenter={{ lat: 48.85, lng: 2.28 }}
      >
        {/*affichage du marqueur de position du capteur 1*/}
        <Marker 
        name={'Capteur 1'}
        position={
          { lat: derniere_lat, lng: derniere_long }} 
          onClick={this.marker1}
        />
        
        {/*affichage du marqueur de position du capteur 2*/}
        <Marker 
        name={'Capteur 2'}
        position={
          { lat: derniere_lat2, lng: derniere_long2 }} 
          onClick={this.marker2}
        />
      </Map>

    );
  }
  /*Méthode GET, lecture de toute la collection capteurs de la base de données*/
  sync() {
    axios.get("http://localhost:8000/capteurs")
    .then((rep) => this.setState({ capteurs: rep.data }));
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDxWbabVF0eE7_LzXGBcvfypVdW19omOLY'
})(MapContainer);