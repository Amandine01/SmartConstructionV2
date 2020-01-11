import React, { Component } from 'react';
import Chart from 'react-apexcharts'
import { Container, Row, Col } from 'reactstrap';
import axios from 'axios';

export default class GraphGaz extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      gaz:[],
    }
  }

  componentDidMount() {
    this.sync();
  }

  render() {

    const { gaz } = this.state;

    
    const valeursNO2 = [];
    const valeursCO = [];
    const valeursH2 = [];
    const valeursNH3 = [];
    const valeursCH4 = [];
    const date = [];
    const newdate = (new Date()).toLocaleDateString();
    
    //types de gaz : 'NO2','CO','H2','NH3','CH4'

    for(let i = 0 ; i< gaz.length ; i++){
      gaz.forEach(a => {
       if (a.nom_gaz === "NO2"){
        valeursNO2.push(a.mesure_gaz);
      }
      if (a.nom_gaz === "CO"){
        valeursCO.push(a.mesure_gaz);
      }
      if (a.nom_gaz === "H2"){
        valeursH2.push(a.mesure_gaz);
      }
      if (a.nom_gaz === "NH3"){
        valeursNH3.push(a.mesure_gaz);
      }
      if (a.nom_gaz === "CH4"){
        valeursCH4.push(a.mesure_gaz);
      }
        
       /* var month = (a.date_gaz).toLocaleDateString() 
        var day = (a.date_gaz).getUTCDate();
        var year = (a.date_gaz).getUTCFullYear(); */
       /* newdate = a.date_gaz.toLocaleDateString()

        newdate.push(date);*/
      });

      /*newdate = new Date (gaz[i].date_gaz).toLocaleDateString();
      newdate.push(date);*/

    }
    
    /*for (let i = 0; i < 20; ++i) {
      const an = ajd - i;
      ans.push(`01/01/${an}`);

      let nb = 0;
      albums.forEach(a => {
        if (new Date(a.release).getFullYear() === an) {
          nb++;
        }
      });

      nbs.push(nb);
    }*/

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
        text: 'Analyses des gaz',
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
        categories: date
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
      name: "NO2",
      data: valeursNO2
    },
    {
      name: "CO",
      data: valeursCO
    },
    {
      name: 'H2',
      data: valeursH2
    },
    {
      name: 'NH3',
      data: valeursNH3
    },
    {
      name: 'CH4',
      data: valeursCH4
    }

    ]




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