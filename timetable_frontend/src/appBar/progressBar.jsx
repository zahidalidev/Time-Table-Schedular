import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 10,
    borderRadius: 5,
    width: '100%',
  },
  colorPrimary: {
    backgroundColor: "#76adbc",
  },
  bar: {
    borderRadius: 5,
    backgroundColor: '#2a3547',
  },
}))(LinearProgress);

const useStylesFacebook = makeStyles((theme) => ({
  root: {
    position: 'relative',
  },
  bottom: {
    color: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
  },
  top: {
    color: '#2a3547',
    animationDuration: '550ms',
    position: 'absolute',
    left: 0,
  },
  circle: {
    strokeLinecap: 'round',
  },
}));

function FacebookCircularProgress(props) {
  const classes = useStylesFacebook();

  return (
    <div className={classes.root}>
      <CircularProgress
        variant="determinate"
        className={classes.bottom}
        size={40}
        thickness={4}
        {...props}
        value={100}
        />
      <CircularProgress
        variant="indeterminate"
        disableShrink
        className={classes.top}
        classes={{
          circle: classes.circle,
        }}
        size={40}
        thickness={4}
        {...props}
      />
      {/* <span style={{marginLeft: 24}} >Creating...</span> */}
    </div>
  );
}



export default function ProgressBars({ononProgressValue}) {
    // var oldURL = "";
    // var currentURL = window.location.href;
    // const checkURLchange = (currentURL) => {

    //     if(currentURL != oldURL){
    //         const pathNew = window.location.pathname.substr(6);
    //         if(pathNew === "classrooms"){
    //             ProgressValue = 0;
    //         }else if(pathNew === "classes"){
    //             ProgressValue = 25;
    //         }else if(pathNew === "teachers"){
    //             ProgressValue = 50;
    //         }else if(pathNew === "courses"){
    //             ProgressValue = 75
    //         }else if(pathNew === "table"){
    //             ProgressValue = 100
    //         }

    //         oldURL = currentURL;
    //     }

    //     oldURL = window.location.href;
    //     setInterval(function() {
    //         checkURLchange(window.location.href);
    //     }, 1000);

    // }

    // checkURLchange();
  return (
    <div className style={{flexGrow: 1}}>
      <form noValidate>
        <Grid container direction="row" item sm={12} >
          <Grid container direction="row" item sm={1} >
            <FacebookCircularProgress />
          </Grid>
          <Grid container direction="row" item sm={11} style={{paddingLeft: 5, marginTop: 15}} >

          {/* <br /> */}
            <BorderLinearProgress variant="determinate" value={ononProgressValue} />
          </Grid>
        </Grid>
      </form>
    </div>
  );
}
