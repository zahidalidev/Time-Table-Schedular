import React, {Component} from 'react';
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
});

let id = 0;
function createData(name, calories, fat, carbs, protein) {
  id += 1;
  return { id, name, calories, fat, carbs, protein };
}



class TimeTable extends Component {
    
    state = {
        textSize: "14px",
        leftPadding: "16px",
        rightPadding: "16px",
        showLoader: false
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

    updateDimensions = (i) => {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
        if(i === 1){
            this.setMarginLeft();
        }
    };
    
    componentDidMount() {

        window.addEventListener('resize', () => this.updateDimensions(1));
        this.setMarginLeft();
        
    }
    componentWillUnmount() {
        window.removeEventListener('resize', () => this.updateDimensions(0));
        this.setMarginLeft();
        // console.log(this.state.width)
    }

    render(){ 
        const {onGeneratedTimeTable: timeTables} = this.props; 
        const {textSize, leftPadding, rightPadding, showLoader} = this.state;
        
        if(timeTables.length === 0 && showLoader){
            return (
                <React.Fragment style={{marginTop: 200}}>
                    <Grid container direction="row" justify="center" alignItems="center" item xs={12}>
                            <Button style={{backgroundColor: "#2a3547", color: "#d0d6e0", marginTop: 50}} color="primary" onClick={this.generateTable}>Generate Table</Button>
                    </Grid>
                    <Grid container direction="row" justify="center" alignItems="center" item xs={12} style={{marginTop: 150}}>
                        <div className={styles.circleRoot}>
                            <CircularProgress />
                        </div>
                    </Grid>
                </React.Fragment>
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
                                    <Grid container direction="col" justify="center" alignItems="center" item xs={8}>
                                        <Paper className={styles.root}>
                                            <h4 style={{marginTop: "54px", marginBottom: "58px", color: "#202d42"}}>CLass Name: <span style={{color: "#0f9ac4"}}>{table[0]}</span></h4>
                                            <Table className={styles.table}>
                                                <TableHead style={{backgroundColor: "#202d42"}}>
                                                    <TableRow>
                                                        <TableCell style = {{fontSize: textSize, paddingLeft: leftPadding, paddingRight: rightPadding, color: "white"}} >Days</TableCell>
                                                        <TableCell numeric style = {{fontSize: textSize, paddingLeft: leftPadding, paddingRight: rightPadding, color: "white"}} >8-9am</TableCell>
                                                        <TableCell numeric style = {{fontSize: textSize, paddingLeft: leftPadding, paddingRight: rightPadding, color: "white"}} >9-10am</TableCell>
                                                        <TableCell numeric style = {{fontSize: textSize, paddingLeft: leftPadding, paddingRight: rightPadding, color: "white"}} >10-11am</TableCell>
                                                        <TableCell numeric style = {{fontSize: textSize, paddingLeft: leftPadding, paddingRight: rightPadding, color: "white"}} >11-12am</TableCell>
                                                        <TableCell numeric style = {{fontSize: textSize, paddingLeft: leftPadding, paddingRight: rightPadding, color: "white"}} >12-1pm</TableCell>
                                                        <TableCell numeric style = {{fontSize: textSize, paddingLeft: leftPadding, paddingRight: rightPadding, color: "white"}} >1-2pm</TableCell>
                                                        <TableCell numeric style = {{fontSize: textSize, paddingLeft: leftPadding, paddingRight: rightPadding, color: "white"}} >2-3pm</TableCell>
                                                        <TableCell numeric style = {{fontSize: textSize, paddingLeft: leftPadding, paddingRight: rightPadding, color: "white"}} >3-4pm</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                {table[2].map(tab =>{
                                                    return (
                                                        <TableBody>
                                                            <TableRow>
                                                                <TableCell component="th" scope="row" style = {{fontSize: textSize, paddingLeft: leftPadding, paddingRight: rightPadding, color: "white", backgroundColor: "#2b384cad"}} >{tab[0]}</TableCell>
                                                                <TableCell numeric style = {{fontSize: textSize, paddingLeft: leftPadding, paddingRight: rightPadding}} >{tab[1]}</TableCell>
                                                                <TableCell numeric style = {{fontSize: textSize, paddingLeft: leftPadding, paddingRight: rightPadding}} >{tab[2]}</TableCell>
                                                                <TableCell numeric style = {{fontSize: textSize, paddingLeft: leftPadding, paddingRight: rightPadding}} >{tab[3]}</TableCell>
                                                                <TableCell numeric style = {{fontSize: textSize, paddingLeft: leftPadding, paddingRight: rightPadding}} >{tab[4]}</TableCell>
                                                                <TableCell numeric style = {{fontSize: textSize, paddingLeft: leftPadding, paddingRight: rightPadding}} >{tab[5]}</TableCell>
                                                                <TableCell numeric style = {{fontSize: textSize, paddingLeft: leftPadding, paddingRight: rightPadding}} >{tab[6]}</TableCell>
                                                                <TableCell numeric style = {{fontSize: textSize, paddingLeft: leftPadding, paddingRight: rightPadding}} >{tab[7]}</TableCell>
                                                                <TableCell numeric style = {{fontSize: textSize, paddingLeft: leftPadding, paddingRight: rightPadding}} >{tab[8]}</TableCell>
                                                            </TableRow>
                                                        </TableBody>
                                                    );    
                                                })}

                                            </Table>
                                        </Paper>
                                    </Grid>
                    
                            );
                        })}
                    </Grid>
            </React.Fragment>
        );
    }
}

export default TimeTable;