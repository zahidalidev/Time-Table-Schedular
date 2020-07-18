import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {Link} from "react-router-dom";

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
        homeBackgroundColor: ''
    }

    updateDimensions = (i) => {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
        console.log("hi chane")
    };
    
    componentDidMount() {
        var oldURL = "";
        var currentURL = window.location.href;
        const checkURLchange = (currentURL) => {

            if(currentURL != oldURL){
                if(window.location.pathname.substr(6) === "classrooms"){
                    this.setState({homeBackgroundColor: "#0f9ac4"});
                }else{
                    this.setState({homeBackgroundColor: ""});
                }
                oldURL = currentURL;
            }

            oldURL = window.location.href;
            setInterval(function() {
                checkURLchange(window.location.href);
            }, 1000);

        }

        checkURLchange();
    }
    
    renderPagination = () => {
        this.props.onreRednerPagination()
    }

  render() {
    
    const {homeBackgroundColor} = this.state;
    
      return (
        <div className={useStyles.root}>
          <div style={{backgroundColor: '#202833'}} position="static">
            <Toolbar variant="dense">
              <Typography variant="h6" style={{marginLeft: 50, backgroundColor: homeBackgroundColor, padding: 10}}>
                <Link onClick={this.renderPagination} style={{color: "white", textDecoration: 'none'}} to="/home/classrooms" >Home</Link>
              </Typography>
            </Toolbar>
          </div>
        </div>
      );
  }
}

export default PrimarySearchAppBar;