import React, { Component } from 'react';
import { compose, withProps } from "recompose"
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import axios from 'axios';

const mapStyles = {
  width: '100%',
  height: '100%'
};

class MapContainer extends Component {
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

  sendData(nom) {
    this.props.parentCallback(nom);
  }


  marker1(){
    console.log("marker 1 cliqué");
    this.sendData(1);

  }
  

  marker2(){
    console.log("marker 2 cliqué");
    this.sendData(2);
  }

  


  render() {

    const { capteurs } = this.state;

    const latitude_capteur = [];
    const longitude_capteur = [];
    const latitude_capteur2 = [];
    const longitude_capteur2 = [];
    const position = [];

    capteurs.forEach(a => {
      if (a.nom_capteur === "1") {
        latitude_capteur.push(a.Latitude);
        longitude_capteur.push(a.Longitude);
        capteurs.push({ latitude: latitude_capteur, longitude: longitude_capteur });

      }

      if (a.nom_capteur === "2") {
        latitude_capteur2.push(a.Latitude);
        longitude_capteur2.push(a.Longitude);
        capteurs.push({ latitude: latitude_capteur2, longitude: longitude_capteur2 });

      }


      
    });



    const derniere_lat = latitude_capteur.slice(Math.max(latitude_capteur.length - 1, 0));
    const derniere_long = longitude_capteur.slice(Math.max(longitude_capteur.length - 1, 0));

    const derniere_lat2 = latitude_capteur2.slice(Math.max(latitude_capteur2.length - 1, 0));
    const derniere_long2 = longitude_capteur2.slice(Math.max(longitude_capteur2.length - 1, 0));


    return (
      <Map
      google={this.props.google}
      zoom={13}
      style={mapStyles}
      initialCenter={{ lat: 48.85, lng: 2.28 }}
      >
      <Marker 
      name={'Capteur 1'}
      position={
        { lat: derniere_lat, lng: derniere_long }} 
        onClick={this.marker1}
        />

        <Marker 
        name={'Capteur 2'}
        position={
          { lat: derniere_lat2, lng: derniere_long2 }} 
          onClick={this.marker2}
          />


          </Map>

          );
        }
        sync() {
          axios.get("http://localhost:8000/capteurs")
          .then((rep) => this.setState({ capteurs: rep.data }));
        }
      }


      export default GoogleApiWrapper({
        apiKey: 'AIzaSyDxWbabVF0eE7_LzXGBcvfypVdW19omOLY'
      })(MapContainer);