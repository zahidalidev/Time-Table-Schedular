import React, {Component} from 'react';
import "./tableDesign.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/css/bootstrap.css";

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';
import {ToastContainer, toast} from "react-toastify";
import GetAppIcon from '@material-ui/icons/GetApp';

import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Popup from "reactjs-popup";
// import html2canvas from "html2canvas-render-offscreen" 

const styles = theme => ({
  root: {
    display: 'flex',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'hide',
  },
  table: {
    // minWidth: 340,

  },
  tableCell: {
    // paddingRight: 4,
    // paddingLeft: 5
    fontSize: "11px !important"
  },
  circleRoot: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
  linearRoot: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  }
});

class TimeTable extends Component {
    
    state = {
        showLoader: false,
        saving: true
    }

    generateTable = () => {
        this.setState({showLoader: true})
        this.props.onGenerateTable();
    }

    setMarginLeft = () => {
        if(window.innerWidth <= 700){
            this.setState({textSize: "10px", leftPadding: "5px", rightPadding: "2px"})
        }else{
            this.setState({textSize: "14px", leftPadding: "16px", rightPadding: "16px"})
        }
    }

    pdfTable = async(className, i) => {
      this.setState({saving: false})

      try {
        const canvas = await html2canvas(document.getElementById(`tableId${i}`));
        
        var img = new Image();   // Create new img element
        img.src = canvas.toDataURL('image/png');
  
        // window.open(img, "_blank")
  
        var doc = new jsPDF({
          orientation: 'landscape',
          unit: 'in',
          format: [1300, 1000]
        })
  
        // const pdf = new jsPDF();
        doc.addImage(img, 'PNG', -1, -6 - (i * 8.7));
        const result = doc.save(`${className}.pdf`);

        this.setState({saving: true})

        toast.success("downloaded")
      } catch (error) {
        this.setState({saving: false})
        toast.error("Error in downloading Table")
      }
        
    }

    saveAs = (uri, filename) => {
      var link = document.createElement('a');
      if (typeof link.download === 'string') {
          link.href = uri;
          link.download = filename;
          //Firefox requires the link to be in the body
          document.body.appendChild(link);
          //simulate click
          link.click();
          //remove the link when done
          document.body.removeChild(link);
      } else {
          window.open(uri);
      }
    }

    imgTable = async(className, i) => {
      this.setState({saving: false})

      try {
        const canvas = await html2canvas(document.getElementById(`tableId${i}`));

        this.saveAs(canvas.toDataURL(), `${className}.png`)

        this.setState({saving: true})
        toast.success("downloaded")

      } catch (error) {
        this.setState({saving: false})
        toast.error("Error in downloading Table")
      }
    }


    render(){ 
        const {onGeneratedTimeTable: timeTables} = this.props; 
        const {showLoader, saving} = this.state;
        
        if(timeTables.length === 0 && showLoader){
            return (
                <React.Fragment style={{marginTop: 200}}>
                    <Grid container direction="row" justify="center" alignItems="center" item xs={12}>
                            <Button style={{backgroundColor: "#2a3547", color: "#d0d6e0", marginTop: 50}} color="primary" onClick={this.generateTable}>Generate Table</Button>
                    </Grid>

                    <Grid container direction="row" justify="center" alignItems="center" item xs={12} style={{marginTop: 150}}>
                        <div className={styles.circleRoot}>
                            <CircularProgress value = {100} />
                        </div>
                    </Grid>
                </React.Fragment>
            );
        }

        if(!saving){
            return (
                <Popup open={!saving} position="right center">
                  <Grid container direction="row" justify="center" alignItems="center" item xs={12} style={{backgroundColor: "#2a3547"}} >
                        <div style={{color: "#0f9ac4", paddingTop: 10, paddingBottom: 10}} className={styles.circleRoot}>
                            Downloading.....
                        </div>
                    </Grid>
                </Popup>
               
            );
        }

        return (
            <React.Fragment style={{marginTop: 200}}>
                <Grid container direction="row" justify="center" alignItems="center" item xs={12}>
                    <Button style={{backgroundColor: "#2a3547", color: "#d0d6e0", marginTop: 50}} color="primary" onClick={this.generateTable}>Generate Table</Button>
                </Grid>
                
                    <Grid container direction="row" justify="center" alignItems="center" item xs={12}>
                        {timeTables.map((table, i) => {
                            return (
                                    <Grid container direction="column" justify="center" alignItems="center" item xs={8}>
                                        
                                        <Paper tableId elevation={0} className={styles.root}>
                                            
                                               
                                            <body id={`tableId${i}`} className = "table-Body-maincss-table2">
                                              <Grid container direction="row" justify="flex-start" alignItems="center" item xs={12}>
                                                  <h4 className="sessionName" style={{marginTop: "54px", marginBottom: "58px", color: "#202d42"}}>Class Name: <span style={{color: "#0f9ac4"}}>{table[0]}</span></h4>
                                              </Grid>
                                              <div> 
                                                <div className="table100 ver1 m-b-110">
                                                  <table   className="table-bordered table-hover" data-vertable="ver1">
                                                    <thead>
                                                      <tr className="row100 head">
                                                        <th style={{cursor: "pointer", border:"2px solid rgba(43, 53, 69, 0.7)"}} className=" clickable column100 column2" data-column="column2">Days</th>
                                                        <th style={{cursor: "pointer", border:"2px solid rgba(43, 53, 69, 0.7)"}} className=" clickable column100 column3" data-column="column3">8-9am</th>
                                                        <th style={{cursor: "pointer", border:"2px solid rgba(43, 53, 69, 0.7)"}} className=" clickable column100 column4" data-column="column4">9-10am </th>
                                                        <th style={{cursor: "pointer", border:"2px solid rgba(43, 53, 69, 0.7)"}} className=" clickable column100 column5" data-column="column5">10-11am</th>
                                                        <th style={{cursor: "pointer", border:"2px solid rgba(43, 53, 69, 0.7)"}} className=" clickable column100 column6" data-column="column6">11-12am</th>
                                                        <th style={{cursor: "pointer", border:"2px solid rgba(43, 53, 69, 0.7)"}} className=" clickable column100 column7" data-column="column7">12-1pm</th>
                                                        <th style={{cursor: "pointer", border:"2px solid rgba(43, 53, 69, 0.7)"}} className=" clickable column100 column8" data-column="column8">1-2pm</th>
                                                        <th style={{cursor: "pointer", border:"2px solid rgba(43, 53, 69, 0.7)"}} className=" clickable column100 column9" data-column="column9">2-3pm</th>
                                                        <th style={{cursor: "pointer", border:"2px solid rgba(43, 53, 69, 0.7)"}} className=" clickable column100 column10" data-column="column10">3-4pm</th>
                                                      </tr>
                                                    </thead>
                                                  <tbody>
                                    
                                                      {table[2].map((tab, i) =>{
                                                          return (

                                                                <tr className="row100"  key={i}>
                                                                    <th style = {{color: "white", border:"2px solid rgba(43, 53, 69, 0.7)"}} className=" hoverClass column100 column2" data-column="column2">{tab[0]}</th>
                                                                    <td style={{border:"2px solid rgba(43, 53, 69, 0.7)"}} className="column100 column3" data-column="column3">{tab[1]}</td>
                                                                    <td style={{border:"2px solid rgba(43, 53, 69, 0.7)"}} className="column100 column4" data-column="column4">{tab[2]}</td>
                                                                    <td style={{border:"2px solid rgba(43, 53, 69, 0.7)"}} className="column100 column5" data-column="column5">{tab[3]}</td>
                                                                    <td style={{border:"2px solid rgba(43, 53, 69, 0.7)"}} className="column100 column6" data-column="column6">{tab[4]}</td>
                                                                    <td style={{border:"2px solid rgba(43, 53, 69, 0.7)"}} className="column100 column7" data-column="column7">{tab[5]}</td>
                                                                    <td style={{border:"2px solid rgba(43, 53, 69, 0.7)"}} className="column100 column8" data-column="column8">{tab[6]}</td>
                                                                    <td style={{border:"2px solid rgba(43, 53, 69, 0.7)"}} className="column100 column9" data-column="column9">{tab[7]}</td>
                                                                    <td style={{border:"2px solid rgba(43, 53, 69, 0.7)"}} className="column100 column10" data-column="column10">{tab[8]}</td>
                                                                </tr>
                                                          );    
                                                      })}
                                                    </tbody>
                                                  </table>
                                                </div>
                                              </div>
                                            </body>
                                        </Paper>

                                        <Grid container direction="row" style={{marginTop: 30}} justify="center" alignItems="center" item xs={12}>
                                            <Grid container direction="row" justify="flex-end" alignItems="center" item xs={6}>
                                                <Button className="downloadButton" color="primary" onClick={() => this.pdfTable(table[0], i)}><GetAppIcon />  PDF of {table[0]} <span className = "smallSizeDownButton"> *slow</span></Button>
                                            </Grid>
                                            <Grid container direction="row" justify="flex-start" alignItems="center" item xs={6}>
                                                <Button className="downloadButton"  color="primary" onClick={() => this.imgTable(table[0], i)}><GetAppIcon />  IMG of {table[0]} <span className = "smallSizeDownButton"> *fast</span></Button>
                                            </Grid>
                                        </Grid>
                                        
                                    </Grid>
                            );
                        })}
                    </Grid>
            </React.Fragment>
        );
    }
}

export default TimeTable;