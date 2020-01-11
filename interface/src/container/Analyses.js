import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import './Analyses.css';

import CarteGaz from '../component/CarteGaz';
import GraphGaz from '../component/GraphGaz';
import CarteParticules from '../component/CarteParticules';
import GraphParticules from '../component/GraphParticules';
import CarteSon from '../component/CarteSon';
import GraphSon from '../component/GraphSon';


export default class Analyses extends Component {


    render() {
            
    	return (
      		<Row Class>
      			<Col xs="12" sm="12"> <h1 className="titreresults">Analyses de la pollution sur le chantier </h1> </Col> 
      		
                <Col xs="12" sm="12"> <h2 className="typepolluant">Gaz polluants</h2> </Col>
                <Col  sm="1"></Col>
                <Col xs="12" sm="4" className="carte1">
        			
        	 		    <CarteGaz/>
        	
      				  </Col> 
	      		    <Col xs="3" sm="1"></Col>

	      		    <Col xs="12" sm="5" className="graph">
        			
        	 		    <GraphGaz/>
        	
      			    </Col> 

	      		    <Col xs="2" sm="2"></Col>

                <Col xs="12" sm="12"> <h2 className="typepolluant">Particules fines</h2> </Col>
                <Col  sm="1"></Col>
                <Col xs="12" sm="4" className="carte2">
              
                  <CarteParticules/>
          
                </Col> 
                <Col xs="3" sm="1"></Col>
            

                <Col xs="12" sm="5" className="graph">
              
                  <GraphParticules/>
          
                </Col> 

                <Col xs="2" sm="2"></Col>

                <Col xs="12" sm="12"> <h2 className="typepolluant">Pollution sonore</h2> </Col>
                <Col  sm="1"></Col>
                <Col xs="12" sm="4" className="carte2">
              
                  <CarteSon/>
          
                </Col> 
                <Col xs="3" sm="1"></Col>
            

                <Col xs="12" sm="5" className="graph">
              
                  <GraphSon/>
          
                </Col> 
	      	
			</Row>
    	);
  	}
}

