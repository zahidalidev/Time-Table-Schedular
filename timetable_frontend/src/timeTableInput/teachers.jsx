import React, { Component } from 'react';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import SendIcon from '@material-ui/icons/Send';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';

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


class Teachers extends Component {

    state = {
        teachers: [
            ["", [
            ["Monday", 1, 1, 1, 1, 1, 1, 1, 1],
            ["Tuesday", 1, 1, 1, 1, 1, 1, 1, 1],
            ["Wednesday", 1, 1, 1, 1, 1, 1, 1, 1],
            ["Thursday", 1, 1, 1, 1, 1, 1, 1, 1],
            ["Friday", 1, 1, 1, 1, 1, 1, 1, 1],
        ]]],

        width: 0, height: 0,
        marginLeftTextField: 0 
    }

    handleChange = (e, i, j, k) => {
       console.log("e, i, j: ", e.target.value, i, j, k)
    }

    addMoreField = () => {
        const teachers = [...this.state.teachers, ["", [
            ["Monday", 1, 1, 1, 1, 1, 1, 1, 1],
            ["Tuesday", 1, 1, 1, 1, 1, 1, 1, 1],
            ["Wednesday", 1, 1, 1, 1, 1, 1, 1, 1],
            ["Thursday", 1, 1, 1, 1, 1, 1, 1, 1],
            ["Friday", 1, 1, 1, 1, 1, 1, 1, 1],
        ]]]
        this.setState({teachers});
    }

    handleSubmit = () => {
       
    }

    handleRemove = (i) => {
        
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
        
    }
    componentWillUnmount() {
        window.removeEventListener('resize', () => this.updateDimensions(0));
        if(window.innerWidth <= 700) 
                this.setState({marginLeftTextField: 20})
        // console.log(this.state.width)
    }
    

    render(){
        const { teachers } = this.state;

        return (
            <form noValidate>
                <Grid container row alignItems="center" item xs={12} style={{marginTop: 60}}>
                    {
                        teachers.map((teacher, i) => {
                            return (
                                <Grid container key = {i} direction="column" justify="center" alignItems="center" item xs={9} style={{marginTop: 20, marginLeft: this.state.marginLeftTextField * -2}}>  
                                    <Grid container direction="row" justify="flex-end" alignItems="center" spacing={4} item sm={12}>                                    
                                        <Grid container direction="row" justify="flex-end" alignItems="center" item xs={4} style={{paddingLeft: 70}}>
                                            <Grid container direction="row" justify="flex-end" alignItems="center" item xs={4}>
                                                <Button
                                                    variant="contained"
                                                    color="secondary"
                                                    onClick = {() => this.handleRemove(i)}
                                                    style={{marginRight: 20}}
                                                >
                                                    X
                                                </Button>
                                            </Grid>
                                            <Grid container direction="row" justify="flex-end" alignItems="center" item xs={8}>
                                                <CssTextField
                                                    label = {`Teacher-${i+1} Name`}
                                                    variant = "outlined"
                                                    id = "custom-css-outlined-input"
                                                    value = {teacher[0]}
                                                    onChange = {(e) => this.handleChange(e, i)}
                                                    size="small"
                                                />
                                            </Grid>
                                        </Grid>
                                        {teacher[1].map((week, j) => {
                                            return (
                                                <Grid container key = {i} direction="row" justify="flex-end" alignItems="center" item xs={8}>
                                                    <p style={{marginRight: 20}} >{week[0]}</p>
                                                    <FormControl>
                                                        <Select
                                                            style={{marginRight: 20}}
                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            value={week[1]}
                                                            onChange={(e) => this.handleChange(e, i, j, 1)}
                                                            >
                                                            <MenuItem value={0}>0</MenuItem>
                                                            <MenuItem value={1}>1</MenuItem>
                                                        </Select>
                                                        <FormHelperText>8-9AM</FormHelperText>
                                                    </FormControl>
                                                    <FormControl>
                                                        <Select
                                                            style={{marginRight: 20}}
                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            value={week[2]}
                                                            onChange={(e) => this.handleChange(e, i, j, 2)}
                                                            >
                                                            <MenuItem value={0}>0</MenuItem>
                                                            <MenuItem value={1}>1</MenuItem>
                                                        </Select>
                                                        <FormHelperText>9-10AM</FormHelperText>
                                                    </FormControl>
                                                    <FormControl>
                                                        <Select
                                                            style={{marginRight: 20}}
                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            value={week[3]}
                                                            onChange={(e) => this.handleChange(e, i, j, 3)}
                                                            >
                                                            <MenuItem value={0}>0</MenuItem>
                                                            <MenuItem value={1}>1</MenuItem>
                                                        </Select>
                                                        <FormHelperText>10-11AM</FormHelperText>
                                                    </FormControl>
                                                    <FormControl>
                                                        <Select
                                                            style={{marginRight: 20}}
                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            value={week[4]}
                                                            onChange={(e) => this.handleChange(e, i, j, 4)}
                                                            >
                                                            <MenuItem value={0}>0</MenuItem>
                                                            <MenuItem value={1}>1</MenuItem>
                                                        </Select>
                                                        <FormHelperText>11-12AM</FormHelperText>
                                                    </FormControl>
                                                    <FormControl>
                                                        <Select
                                                            style={{marginRight: 20}}
                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            value={week[5]}
                                                            onChange={(e) => this.handleChange(e, i, j, 5)}
                                                            >
                                                            <MenuItem value={0}>0</MenuItem>
                                                            <MenuItem value={1}>1</MenuItem>
                                                        </Select>
                                                        <FormHelperText>12-1PM</FormHelperText>
                                                    </FormControl>
                                                    <FormControl>
                                                        <Select
                                                            style={{marginRight: 20}}
                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            value={week[6]}
                                                            onChange={(e) => this.handleChange(e, i, j, 6)}
                                                            >
                                                            <MenuItem value={0}>0</MenuItem>
                                                            <MenuItem value={1}>1</MenuItem>
                                                        </Select>
                                                        <FormHelperText>1-2PM</FormHelperText>
                                                    </FormControl>
                                                    <FormControl>
                                                        <Select
                                                            style={{marginRight: 20}}
                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            value={week[7]}
                                                            onChange={(e) => this.handleChange(e, i, j, 7)}
                                                            >
                                                            <MenuItem value={0}>0</MenuItem>
                                                            <MenuItem value={1}>1</MenuItem>
                                                        </Select>
                                                        <FormHelperText>2-3PM</FormHelperText>
                                                    </FormControl>
                                                    <FormControl>
                                                        <Select
                                                            style={{marginRight: 20}}
                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            value={week[8]}
                                                            onChange={(e) => this.handleChange(e, i, j, 8)}
                                                            >
                                                            <MenuItem value={0}>0</MenuItem>
                                                            <MenuItem value={1}>1</MenuItem>
                                                        </Select>
                                                        <FormHelperText>3-4PM</FormHelperText>
                                                    </FormControl>
                                                </Grid>
                                            );
                                        })}



                                    </Grid>
                                </Grid>
                            );
                        })
                    }
                         <Grid container
                            direction="row"
                            justify="flex-start"
                            alignItems="flex-start" 
                            item sm={3}
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

export default Teachers;