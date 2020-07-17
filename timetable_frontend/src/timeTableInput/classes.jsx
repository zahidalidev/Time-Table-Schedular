import React, { Component } from 'react';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import SendIcon from '@material-ui/icons/Send';


const CssTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: 'green',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'green',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'red',
      },
      '&:hover fieldset': {
        borderColor: 'yellow',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'green',
      },
    },
  },
})(TextField);


class Classes extends Component {

    state = {
        classes: [{name: ""}],
        width: 0, height: 0,
        marginLeftTextField: 0 
    }

    handleChange = (e, i) => {
        const classes = [...this.state.classes];
        classes[i].name = e.target.value;
        this.setState({classes})
    }

    addMoreField = () => {
        const classes = [...this.state.classes, {name: ""}]
        this.setState({classes})
    }

    handleSubmit = () => {
        const classesArray = [];
        const classes = [...this.state.classes];
        
        classes.map(clas => {
            let classArray = [clas.name, [
                ["Monday", 0, 0, 0, 0, 0, 0, 0, 0],
                ["Tuesday", 0, 0, 0, 0, 0, 0, 0, 0],
                ["Wednesday", 0, 0, 0, 0, 0, 0, 0, 0],
                ["Thursday", 0, 0, 0, 0, 0, 0, 0, 0],
                ["Friday", 0, 0, 0, 0, 0, 0, 0, 0],
            ]];
            classesArray.push(classArray);
        })
        this.props.onClasses(classesArray);
    }

    handleRemove = (i) => {
        const classes = [...this.state.classes];

        if(classes.length > 1){
            classes.splice(i, 1);
            this.setState({classes});
        }else{
            alert("Enter the Name of Atleast one Class")
        }
    }



        
    updateDimensions = (i) => {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
        if(i === 1){
            if(window.innerWidth <= 700) 
                this.setState({marginLeftTextField: 20})
        }
    };
    
    componentDidMount() {

        window.addEventListener('resize', () => this.updateDimensions(1));
        if(window.innerWidth <= 700) 
                this.setState({marginLeftTextField: 20})
        // console.log(this.state.width)
    }
    componentWillUnmount() {
        window.removeEventListener('resize', () => this.updateDimensions(0));
        if(window.innerWidth <= 700) 
                this.setState({marginLeftTextField: 20})
        // console.log(this.state.width)
    }
    

    render(){
        const {classes} = this.state;

        return (
            <form noValidate>
                <Grid container row alignItems="center" item xs={12} style={{marginTop: 60}}>
                    {
                        classes.map((clas, i) => {
                            return (
                                <Grid container key = {i} direction="column" justify="center" alignItems="center" item xs={8} style={{marginTop: 20, marginLeft: this.state.marginLeftTextField * -2}}>  
                                    <Grid only="lg" container direction="row" justify="flex-end" alignItems="center" item sm={7} style={{marginLeft: this.state.marginLeftTextField * 8}} >                                  
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            onClick = {() => this.handleRemove(i)}
                                        >
                                            X
                                        </Button>
                                    </Grid>
                                    <Grid container direction="row" justify="flex-end" alignItems="center" item sm={5} style={{marginTop: -40}}>                                    
                                        <CssTextField
                                            label = {`Class-${i+1} Name eg. Session18`}
                                            variant = "outlined"
                                            id = "custom-css-outlined-input"
                                            value = {clas.name}
                                            onChange = {(e) => this.handleChange(e, i)}
                                            size="small"
                                            fullWidth
                                        />
                                    </Grid>
                                </Grid>
                            );
                        })
                    }
                         <Grid container
                            direction="row"
                            justify="flex-start"
                            alignItems="flex-start" 
                            item sm={4}
                            style={{marginTop: 20, marginLeft: this.state.marginLeftTextField * 2}}
                        >
                        <Button onClick={this.addMoreField} variant="contained" color="primary">
                            Add more
                        </Button>
                    </Grid>
                </Grid>
                <Grid container
                    direction="row"
                    justify="center"
                    alignItems="center" 
                    item xs={12}
                    style={{ marginTop: 40}}
                >
                    <Button
                        variant="contained"
                        // color="purple"
                        style={{backgroundColor: '#90ee90'}}
                        endIcon={<SendIcon>send</SendIcon>}
                        onClick = {this.handleSubmit}
                    >
                        Submit and Next
                    </Button>
                </Grid>
            </form>
        );
    }
}

export default Classes;