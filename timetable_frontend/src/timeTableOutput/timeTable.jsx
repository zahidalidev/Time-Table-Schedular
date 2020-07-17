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

const styles = theme => ({
  root: {
    display: 'flex',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'hide',
  },
  table: {
    minWidth: 340,
  },
  tableCell: {
    paddingRight: 4,
    paddingLeft: 5
  }
});

let id = 0;
function createData(name, calories, fat, carbs, protein) {
  id += 1;
  return { id, name, calories, fat, carbs, protein };
}



class TimeTable extends Component {
    
    
    generateTable = () => {
        this.props.onGenerateTable();
    }



    render(){ 
        const {onGeneratedTimeTable: timeTables} = this.props; 

        return (
            <React.Fragment style={{marginTop: 200}}>
                <Button style={{marginTop: 50}} color="primary" onClick={this.generateTable}>Generate Table</Button>
                {timeTables.map((table, i) => {
                    return (
                        <Paper className={styles.root}>
                            <h3>{table[0]}</h3>
                            <Table className={styles.table}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell className={styles.tableCell}>Days</TableCell>
                                        <TableCell numeric className={styles.tableCell}>8-9am</TableCell>
                                        <TableCell numeric className={styles.tableCell}>9-10am</TableCell>
                                        <TableCell numeric className={styles.tableCell}>10-11am</TableCell>
                                        <TableCell numeric className={styles.tableCell}>11-12am</TableCell>
                                        <TableCell numeric className={styles.tableCell}>12-1pm</TableCell>
                                        <TableCell numeric className={styles.tableCell}>1-2pm</TableCell>
                                        <TableCell numeric className={styles.tableCell}>2-3pm</TableCell>
                                        <TableCell numeric className={styles.tableCell}>3-4pm</TableCell>
                                    </TableRow>
                                </TableHead>
                                {table[2].map(tab =>{
                                    return (
                                        <TableBody>
                                            <TableRow>
                                                <TableCell component="th" scope="row" className={styles.TableCell}>{tab[0]}</TableCell>
                                                <TableCell numeric className={styles.tableCell}>{tab[1]}</TableCell>
                                                <TableCell numeric className={styles.tableCell}>{tab[2]}</TableCell>
                                                <TableCell numeric className={styles.tableCell}>{tab[3]}</TableCell>
                                                <TableCell numeric className={styles.tableCell}>{tab[4]}</TableCell>
                                                <TableCell numeric className={styles.tableCell}>{tab[5]}</TableCell>
                                                <TableCell numeric className={styles.tableCell}>{tab[6]}</TableCell>
                                                <TableCell numeric className={styles.tableCell}>{tab[7]}</TableCell>
                                                <TableCell numeric className={styles.tableCell}>{tab[8]}</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    );    
                                })}

                            </Table>
                        </Paper>
     
                    );
                })}
            </React.Fragment>
        );
    }
}

export default TimeTable;