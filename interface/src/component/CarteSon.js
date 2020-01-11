import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import './CarteGaz.css';
import axios from 'axios';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';

const mapStyles = {
  width: '100%',
  height: '100%'
};

export class CarteSon extends Component {

	/*constructor(props) {
    super(props);

    this.state = {
      markers: [],
    }
  }*/

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
}



export default GoogleApiWrapper({
  apiKey: 'AIzaSyDxWbabVF0eE7_LzXGBcvfypVdW19omOLY'
})(CarteSon);