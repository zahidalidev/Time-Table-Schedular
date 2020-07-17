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


class ClassRooms extends Component {

    state = {
        rooms: [{name: ""}],
        width: 0, height: 0,
        marginLeftTextField: 0 
    }

    handleChange = (e, i) => {
        const rooms = [...this.state.rooms];
        rooms[i].name = e.target.value;
        this.setState({rooms})
    }

    addMoreField = () => {
        const rooms = [...this.state.rooms, {name: ""}]
        this.setState({rooms})
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
        this.props.onClassRooms(roomsArray);
    }

    handleRemove = (i) => {
        const rooms2 = [...this.state.rooms];

        if(rooms2.length > 1){
            rooms2.splice(i, 1);
            this.setState({rooms: rooms2});
        }else{
            alert("Enter the Name of Atleast one Room")
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
        const {rooms} = this.state;

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
                                            value = {rooms.name}
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

export default ClassRooms;