import React, { Component } from 'react';
import Chart from 'react-apexcharts'
import { Container, Row, Col } from 'reactstrap';
import axios from 'axios';


export default class GraphParticules extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      particules: [],
    };
  }

  componentDidMount() {
    this.sync();
  }

  render() {

    const { particules } = this.state;

    const data = [];
    const date =[];
   
    const valeurs_particules = [];

  
    particules.forEach(a => {
      if (a.nom_particules === "PM1,0"){
        valeurs_particules.push(a.mesure_particules);
        date.push(a.date_particules);
      }
    })
      const data10=valeurs_particules.slice(Math.max(valeurs_particules.length - 10, 0));
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
        text: 'Analyse des particules fines',
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
              name: "ppm",
              data: data10
            }];


  return (


    <div id="chart">
      <Chart options={options} series={series} type="line" height={350} />
    </div>
  );
}

sync() {
            axios.get("http://localhost:8000/particules")
            .then((rep) => this.setState({ particules: rep.data }));
          }
        }
