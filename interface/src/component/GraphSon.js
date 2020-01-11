import React, { Component } from 'react';
import Chart from 'react-apexcharts'
import { Container, Row, Col } from 'reactstrap';
import axios from 'axios';


export default class GraphParticules extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      son: [],
    };
  }

  componentDidMount() {
    this.sync();
  }

  render() {

    const { son } = this.state;



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
                categories: son.map((a) => a.date_son),
              }
            };


            const series= [{
              name: "dB",
              data: son.map((a) => a.mesure_son)
            }];


  return (


    <div id="chart">
      <Chart options={options} series={series} type="line" height={350} />
    </div>
  );
}

sync() {
  axios.get("http://localhost:8000/son/")
    .then((rep) => this.setState({son: rep.data }))
    .catch((err)=>{
      console.error(err);
      this.status(500).send({"errorServer": err})
    });
  }
}
