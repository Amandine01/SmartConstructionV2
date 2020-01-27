import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import './Analyses.css';

import CarteGaz from '../component/CarteGaz';
import GraphGaz from '../component/GraphGaz';


export default class Analyses extends Component {


    render() {
            
    	return (
      		<Row Class>
      			<Col xs="12" sm="12"> <h1 className="titreresults">Analyses de la pollution sur le chantier </h1> </Col> 
      		
                <Col xs="12" sm="12"> <h2 className="typepolluant">Gaz polluants</h2> </Col>
                <Col xs="3" sm="1"></Col>
                <Col xs="6" sm="4" className="carte1">
        			
        	 		<CarteGaz/>
        	
      				</Col> 
	      		<Col xs="3" sm="1"></Col>

	      		<Col xs="6" sm="4" className="graph">
        			
        	 		<GraphGaz/>
        	
      			</Col> 

	      		<Col xs="3" sm="3"></Col>
	      		<Col xs="3" sm="2"></Col>
	            <Col xs="3" sm="2"></Col>
	            <div id="demo"></div>
			</Row>
    	);
  	}
}

