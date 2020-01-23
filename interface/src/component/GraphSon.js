import React, { Component } from 'react';
import Chart from 'react-apexcharts'
import { Container, Row, Col } from 'reactstrap';
import axios from 'axios';

//Graphique pour les polluants de type son
export default class GraphSon extends React.Component {
  /*constructeur définissant un tableau de capteurs et une valeur de marker gps choisi par défault à 1*/
  constructor(props) {
    super(props);
    this.state = {   
      capteurs: [],
      value:'1',
    };
  }

  componentDidMount() {
    this.sync();
  }

  //mise à jour de la valeur si marker cliqué
  componentWillReceiveProps(nextProps){
    this.setState({value: nextProps.value})
  }

  render() {

    const { capteurs, value } = this.state;

    /*tableau des dates des mesures*/
    const date =[];
    
    /*tableau des valeurs du son mesuré*/
    const valeurs_son = [];

    /*on parcourt toute la collection de capteurs de la base de données*/
    capteurs.forEach(a => {
      /*si le nom du capteur correspond à celui qui est cliqué sur la carte*/
      if (a.nom_capteur == value){
        /*on remplit le tableau de son du capteur correspondant*/
        valeurs_son.push(a.Son);
        /*on remplit le tableau de date des mesures*/
        date.push(a.date);
      }
    })
    
    //on ne garde que les 10 dernières mesures de son et les 10 dernières dates
    const data10=valeurs_son.slice(Math.max(valeurs_son.length - 10, 0));
    const date10=date.slice(Math.max(date.length - 10, 0));
    
    //options du graphique
    const options= {
      chart: {
        height: 350,
        type: 'line',
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'straight'
      },
      title: {
        text: 'Analyse des nuisances sonores du capteur' + value,
        align: 'left'
      },
      grid: {
        row: {
          colors: ['#f3f3f3', 'transparent'], 
          opacity: 0.5
        },
      },
      //dates des mesures
      xaxis: {
        type: 'datetime',
        categories: date10
        }
      };
      
      //mesures
      const series= [{
        name: "dB",
        data: data10
      }];


    return (
      <div id="chart">
        <Chart options={options} series={series} type="line" height={350} />
      </div>
    );
  }

  sync() {
    axios.get("http://localhost:8000/capteurs")
    .then((rep) => this.setState({ capteurs: rep.data }));
  }
}
