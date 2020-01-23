import React, { Component } from 'react';
import Chart from 'react-apexcharts'
import { Container, Row, Col } from 'reactstrap';
import axios from 'axios';

//Graphique pour les polluants de type Gaz
export default class GraphParticules extends React.Component {
  /*constructeur définissant un tableau de capteurs et une valeur de marker gps choisi par défault à 1*/
  constructor(props) {
    super(props);
    this.state = {
      capteurs:[],
      value:'1',
    }
  }
  
  //mise à jour de la valeur si marker cliqué
  componentWillReceiveProps(nextProps){
    this.setState({value: nextProps.value})
  }

  componentDidMount() {
    this.sync();
  }

  render() {
    const { capteurs, value } = this.state;
    
    /*tableau des valeurs des gaz CO mesurés*/
    const valeursCO = [];
    /*tableau des valeurs des gaz NO2 mesurés*/
    const valeursNO2 = [];
    /*tableau des dates des mesures*/
    const date = [];
    
    console.log(value);
    
    /*on parcourt toute la collection de capteurs de la base de données*/
    capteurs.forEach(a => {
      /*si le nom du capteur correspond à celui qui est cliqué sur la carte*/
      if (a.nom_capteur == value){
        /*on remplit le tableau de CO du capteur correspondant*/
        valeursCO.push(a.CO);
        /*on remplit le tableau de NO2 du capteur correspondant*/
        valeursNO2.push(a.NO2);
        /*on remplit le tableau de date des mesures*/
        date.push(a.date);
      }  
    });
    
    //on ne garde que les 10 dernières mesures de CO et NO2 et les 10 dernières dates
    const data10_CO=valeursCO.slice(Math.max(valeursCO.length - 10, 0));
    const data10_NO2=valeursNO2.slice(Math.max(valeursNO2.length - 10, 0));
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
        text: 'Analyses des gaz du capteur ' + value,
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
    
    //mesures
    const series= [{
      name: "CO",
      data: data10_CO
    },
    {
      name: "NO2",
      data: data10_NO2
    }, 
    ]

    return (
      <div id = "chart">
        <Chart options={options} series={series} type="line" height={350} />
      </div>
    );
  }

  /*Méthode GET, lecture de toute la collection capteurs de la base de données*/
  sync() {
    axios.get("http://localhost:8000/capteurs")
    .then((rep) => this.setState({ capteurs: rep.data }));
  }
}