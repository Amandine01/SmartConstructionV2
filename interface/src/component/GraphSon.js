import React, { Component } from 'react';
import Chart from 'react-apexcharts'
import { Container, Row, Col } from 'reactstrap';
import axios from 'axios';


export default class GraphSon extends React.Component {
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

  componentWillReceiveProps(nextProps){
    this.setState({value: nextProps.value})
  }

  render() {

    const { capteurs, value } = this.state;

    const data = [];
    const date =[];
    

    const valeurs_son = [];

    
    capteurs.forEach(a => {
      if (a.nom_capteur == value){
        valeurs_son.push(a.Son);
        date.push(a.date);
      }
    })

    const data10=valeurs_son.slice(Math.max(valeurs_son.length - 10, 0));
    const date10=date.slice(Math.max(date.length - 10, 0));

      /*newdate = new Date (gaz[i].date_gaz).toLocaleDateString();
      newdate.push(date);*/

      

      const data_reversed = data.reverse();


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
        xaxis: {
          type: 'datetime',
          categories: date10
        }
      };


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
