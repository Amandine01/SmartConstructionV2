import React, { Component } from 'react';
import Chart from 'react-apexcharts'
import { Container, Row, Col } from 'reactstrap';
import axios from 'axios';


export default class GraphGaz2 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {   
      gaz: [],
    };
  }

  componentDidMount() {
    this.sync();
  }

  render() {

    const { gaz } = this.state;

    const data = [];
    const date =[];

    const valeursCO = [];
    

      gaz.forEach(a => {
        if (a.nom_gaz === "CO"){
          valeursCO.push(a.mesure_gaz);
          date.push(a.date_gaz);
        }
      })
    


      const data10=valeursCO.slice(Math.max(valeursCO.length - 10, 0));
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
        text: 'Analyse des nuisances sonores',
        align: 'left'
      },
      grid: {
        row: {
                  colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                  opacity: 0.5
                },
              },
              xaxis: {
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
            axios.get("http://localhost:8000/gaz")
            .then((rep) => this.setState({ gaz: rep.data }));
          }
        }
