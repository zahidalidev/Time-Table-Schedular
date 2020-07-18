import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {Link} from "react-router-dom";
import CardMedia from '@material-ui/core/CardMedia';
import Logo from "./az_time_schedular.png";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

class PrimarySearchAppBar extends Component{

    updateDimensions = (i) => {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
        console.log("hi chane")
    };

   
    renderPagination = () => {
        this.props.onreRednerPagination()
    }

  render() {
    
    const {ononHomePath} = this.props;
    
      return (
        <div className={useStyles.root}>
          <div style={{backgroundColor: '#202833'}} position="static">
            <Toolbar variant="dense">
                <img src={Logo}  width="250" height="70" style={{padding: 10, marginLeft: 20}} />
              <Typography variant="h6" style={{marginLeft: 50}}>
                <Link onClick={this.renderPagination} style={{color:  "white", textDecoration: 'none'}} to="/home/classrooms" >Home</Link>
              </Typography>
            </Toolbar>
          </div>
        </div>
      );
  }
}

export default PrimarySearchAppBar;