import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {Link} from "react-router-dom";
import CardMedia from '@material-ui/core/CardMedia';
import Logo from "../assets/az_time_schedular.png";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

class PrimarySearchAppBar extends Component{

    state = {
      marginLeftLogo: 20  //to hadnle margin conditionally
    }

    //thi will be called when home button is clicked 
    renderPagination = () => {
        this.props.onreRednerPagination();  //calling funtion from its parent componet
        window.location.reload(true);   //reloading the page 
    }

    // changin the margin of the logo conditionally on chnage of the screen size
  setMarginLeft = () => {
      if(window.innerWidth <= 700){
          this.setState({marginLeftLogo: 2})
      }else{
          this.setState({marginLeftLogo: 20})
      }
  }

  //calling setMarginLeft method when size is chaged of the screen or at the loading of this componet
  updateDimensions = (i) => {
      this.setState({ width: window.innerWidth, height: window.innerHeight });
      if(i === 1){
          this.setMarginLeft();
      }
  };
  
  //this method will be called when component is mount
  componentDidMount() {
      window.addEventListener('resize', () => this.updateDimensions(1));  //to listen size change event
      this.setMarginLeft();
  }

   //this method will be called when component will unmount
  componentWillUnmount() {
      window.removeEventListener('resize', () => this.updateDimensions(0)); //removing listner when component is unmount
      this.setMarginLeft();
  }    

  render() {
    
    const {marginLeftLogo} = this.state;  //values from the state

    // app bar
    return (
      <div className={useStyles.root}>
        <div style={{backgroundColor: '#202833'}} position="static">
          <Toolbar variant="dense">
              <img src={Logo}  width="250" height="70" style={{padding: 10, marginLeft: marginLeftLogo}} />
            <Typography variant="h6" style={{marginLeft: marginLeftLogo * 2 + 10}}>
              <Link onClick={this.renderPagination} style={{color:  "white", textDecoration: 'none'}} to="/home/classrooms" >Home</Link>
            </Typography>
          </Toolbar>
        </div>
      </div>
    );
  }
}

export default PrimarySearchAppBar;