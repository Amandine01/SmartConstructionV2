import React, { Component } from 'react';
import Chart from 'react-apexcharts'
import { Container, Row, Col } from 'reactstrap';
import axios from 'axios';

//Graphique pour les polluants de type Particules fines
export default class GraphParticules extends React.Component {
  /*constructeur définissant un tableau de capteurs et une valeur de marker gps choisi par défault à 1*/
  constructor(props) {
    super(props);
    this.state = {
      capteurs:[],
      value:'1',
    }
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

    /*tableau des valeurs des PM1.0 mesurés*/
    const valeursPM10 = [];
    /*tableau des valeurs des PM2.5 mesurés*/
    const valeursPM25 = [];
    /*tableau des dates des mesures*/
    const date = [];
    
    console.log(value);
    
    /*on parcourt toute la collection de capteurs de la base de données*/
    capteurs.forEach(a => {
      /*si le nom du capteur correspond à celui qui est cliqué sur la carte*/
      if (a.nom_capteur == value){
        /*on remplit le tableau de PM1.0 du capteur correspondant*/
        valeursPM10.push(a.PM10);
        /*on remplit le tableau de PM2.5 du capteur correspondant*/
        valeursPM25.push(a.PM25);
        /*on remplit le tableau de date des mesures*/
        date.push(a.date);
      }
  });
    
    //on ne garde que les 10 dernières mesures de PM1.0 et PM2.5 et les 10 dernières dates
    const data10_PM10=valeursPM10.slice(Math.max(valeursPM10.length - 10, 0));
    const data10_PM25=valeursPM25.slice(Math.max(valeursPM25.length - 10, 0));
    const date10=date.slice(Math.max(date.length - 10, 0));

    /*option du graphique*/
    const options = {
      chart: {
        height: 350,
        type: 'line',
        zoom: {
          enabled: false
        },
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        width: [5, 7, 5],
        curve: 'straight',
        dashArray: [0, 8, 5]
      },
      title: {
        text: 'Analyses des particules fines du capteur ' + value ,
        align: 'left'
      },
      legend: {
        tooltipHoverFormatter: function(val, opts) {
          return val + ' - ' + opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] + ''
        }
      },
      markers: {
        size: 0,
        hover: {
          sizeOffset: 6
        }
      },
      //dates des mesures
      xaxis: {
        type: 'datetime',
        categories: date10
      },
      tooltip: {
        y: [
        {
          title: {
            formatter: function (val) {
              return val;
            }
          }
        },
        {
          title: {
            formatter: function (val) {
              return val + " %"
            }
          }
        },
        {
          title: {
            formatter: function (val) {
              return val;
            }
          }
        }
        ]
      },
      grid: {
        borderColor: '#f1f1f1',
      }
    };
    
    /*mesures*/
    const series= [{
      name: "PM10",
      data: data10_PM10
    },
    {
      name: "PM25",
      data: data10_PM25
    },

    ]

    return (

      <div id = "chart">

      <Chart options={options} series={series} type="line" height={350} />
      </div>
      );
    }


    sync() {
      axios.get("http://localhost:8000/capteurs")
      .then((rep) => this.setState({ capteurs: rep.data }));
    }
  }