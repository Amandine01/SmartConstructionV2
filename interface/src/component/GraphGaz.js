import React, { Component } from 'react';
import Chart from 'react-apexcharts'
import { Container, Row, Col } from 'reactstrap';
import axios from 'axios';


export default class GraphParticules extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      capteurs:[],
      value:'1',
    }
  }

  componentWillReceiveProps(nextProps){
    this.setState({value: nextProps.value})
  }

  componentDidMount() {
    this.sync();
  }

  render() {

    const { capteurs, value } = this.state;


    const valeursCO = [];
    const valeursNO2 = [];
    const date = [];
    
    
    console.log(value);
    
    capteurs.forEach(a => {
     if (a.nom_capteur == value){
      valeursCO.push(a.CO);
      valeursNO2.push(a.NO2);
      date.push(a.date);
    }
    
  });
    

    const data10_CO=valeursCO.slice(Math.max(valeursCO.length - 10, 0));
    const data10_NO2=valeursNO2.slice(Math.max(valeursNO2.length - 10, 0));
    const date10=date.slice(Math.max(date.length - 10, 0));

    

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


    sync() {
      axios.get("http://localhost:8000/capteurs")
      .then((rep) => this.setState({ capteurs: rep.data }));
    }
  }