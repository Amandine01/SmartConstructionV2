/* import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import './CarteGaz.css';
import axios from 'axios';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';

const mapStyles = {
 width: '100%',
 height: '100%'
};

export class CarteGaz extends Component {

 /*constructor(props) {
   super(props);

   this.state = {
     markers: [],
   }
 }*/

/*

	state = {
	    showingInfoWindow: false,  //Hides or the shows the infoWindow
	    activeMarker: {},          //Shows the active marker upon click
	    selectedPlace: {}          //Shows the infoWindow to the selected place upon a marker
	  };

	onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  /*componentDidMount() {
    this.sync();
  }*/



/*
render() {



  return (
    <Map google={this.props.google} zoom={14} style={mapStyles}
      initialCenter={{ lat: 48.851875, lng: 2.286617 }}
    >
      <Marker
        onClick={this.onMarkerClick}
        name={'ECE Paris'}
      />
      <InfoWindow
        marker={this.state.activeMarker}
        visible={this.state.showingInfoWindow}
        onClose={this.onClose}
      >
        <div>
          <h4>{this.state.selectedPlace.name}</h4>
        </div>
      </InfoWindow>
    </Map>
  );
}
/*sync() {
  axios.get("http://localhost:8000/markers/")
    .then((rep) => this.setState({albums: rep.data }))
    .catch((err)=>{
        console.error(err);
        this.status(500).send({"errorServer": err})
       });
}*/
/*
}

/*

export default GoogleApiWrapper({
apiKey: 'AIzaSyDxWbabVF0eE7_LzXGBcvfypVdW19omOLY'
})(CarteGaz);

*/



import React, { Component } from 'react';
import { compose, withProps } from "recompose"
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import axios from 'axios';

const mapStyles = {
  width: '100%',
  height: '100%',
};

class MapContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      capteurs: [],
      showingInfoWindow: false,
      activeMarker:{},
      selectedPlace: {}
    }
  }

  componentDidMount() {
    this.sync();
  } 
  marker1(){
    console.log("marker 1 cliqué");
  }
    
  

  marker2(){
    console.log("marker 2 cliqué");
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


      /* var month = (a.date_gaz).toLocaleDateString() 
       var day = (a.date_gaz).getUTCDate();
       var year = (a.date_gaz).getUTCFullYear(); */
      /* newdate = a.date_gaz.toLocaleDateString()
       newdate.push(date);*/
    });

    ///////////////////////////////:

    // {this.displayMarkers()}


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