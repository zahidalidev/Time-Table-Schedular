import React, { Component } from 'react';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import SendIcon from '@material-ui/icons/Send';
import {Link} from 'react-router-dom';
import {toast} from "react-toastify";

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


class ClassRooms extends Component {

    state = {
        rooms: [{name: ""}],
        width: 0, height: 0,
        marginLeftTextField: 0,
        buttonDisabled: true
    }

    sumbitButtonCOnstraint = (rooms) => {
        let count = 0;
        rooms.map((room, i) => {
            if(!room.name){
                count++;
            }
        })
        if(count){
            this.setState({buttonDisabled: true})
        }else{
            this.setState({buttonDisabled: false})
        }
    }

    checkUniqueArray = (rooms) => {
        let singleArray = [];
        rooms.map(room => {
            singleArray.push(room.name);
        })
        let hasDuplicate = singleArray.some((val, i) => singleArray.indexOf(val) !== i);
        if(hasDuplicate){
            this.setState({buttonDisabled: true})
            toast.error("please enter unique name");
        }
    }

    handleChange = (e, i) => {
        const rooms = [...this.state.rooms];
        rooms[i].name = e.target.value;
        this.setState({rooms})

        this.sumbitButtonCOnstraint(rooms)

        this.checkUniqueArray(rooms);
    }

    addMoreField = () => {
        const rooms = [...this.state.rooms, {name: ""}]
        this.setState({rooms})

        this.sumbitButtonCOnstraint(rooms)
    }

    handleSubmit = () => {
        const roomsArray = [];
        const rooms = [...this.state.rooms];
        
        rooms.map(room => {
            let roomArray = [room.name, [
                ["Monday", 0, 0, 0, 0, 0, 0, 0, 0],
                ["Tuesday", 0, 0, 0, 0, 0, 0, 0, 0],
                ["Wednesday", 0, 0, 0, 0, 0, 0, 0, 0],
                ["Thursday", 0, 0, 0, 0, 0, 0, 0, 0],
                ["Friday", 0, 0, 0, 0, 0, 0, 0, 0],
            ]];
            roomsArray.push(roomArray);
        })

        rooms.map((room, i) => {
            if(!room.name){
                roomsArray.splice(i, 1);
            }
        })

        this.props.onClassRooms(roomsArray);
    }

    handleRemove = (i) => {
        const rooms = [...this.state.rooms];

        if(rooms.length > 1){
            rooms.splice(i, 1);
            this.setState({rooms});
        }else{
            toast.error("Enter the Name of Atleast one Room")
        }

        this.sumbitButtonCOnstraint(rooms)
    }



        
    setMarginLeft = () => {
        if(window.innerWidth <= 700){
            this.setState({marginLeftTextField: 20})
        }else{
            this.setState({marginLeftTextField: 0})
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
        const {rooms, buttonDisabled} = this.state;

        return (
            <form noValidate>
                <Grid container row alignItems="center" item xs={12} style={{marginTop: 60}}>
                    {
                        rooms.map((room, i) => {
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
                                            label = {`Room-${i+1} Name`}
                                            variant = "outlined"
                                            id = "custom-css-outlined-input"
                                            value = {room.name}
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
                        <Button style={{backgroundColor: "#2a3547", color: "#d0d6e0"}} onClick={this.addMoreField} variant="contained">
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
                        style={{backgroundColor: buttonDisabled ? "#e0e0e0":'#2a3547', color: buttonDisabled ? "#c0cad8" : "#d0d6e0"}}
                        endIcon={<SendIcon>send</SendIcon>}
                        onClick = {this.handleSubmit}
                        disabled = {buttonDisabled}
                    >
                        <Link style={{color: buttonDisabled ? "#c0cad8" : "#d0d6e0", textDecoration: 'none'}} to = "/home/classes" >Submit and Next</Link>
                    </Button>
                </Grid>
            </form>
        );
    }
}

export default ClassRooms;