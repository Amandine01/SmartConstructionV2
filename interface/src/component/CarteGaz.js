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
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

const mapStyles = {
  width: '100%',
  height: '100%',
};

class MapContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stores: [{lat: 47.49855629475769, lng: -122.14184416996333},
              {latitude: 47.359423, longitude: -122.021071},
              {latitude: 47.2052192687988, longitude: -121.988426208496},
              {latitude: 47.6307081, longitude: -122.1434325},
              {latitude: 47.3084488, longitude: -122.2140121},
              {latitude: 47.5524695, longitude: -122.0425407}]
    }
  }

  displayMarkers = () => {
    return this.state.stores.map((store, index) => {
      return <Marker key={index} id={index} position={{
       lat: store.latitude,
       lng: store.longitude
     }}
     onClick={() => console.log("You clicked me!")} />
    })
  }

  render() {
    return (
        <Map
          google={this.props.google}
          zoom={8}
          style={mapStyles}
          initialCenter={{ lat: 47.444, lng: -122.176}}
        >
          {this.displayMarkers()}
        </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDxWbabVF0eE7_LzXGBcvfypVdW19omOLY'
})(MapContainer);