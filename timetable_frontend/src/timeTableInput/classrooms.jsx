import React, { Component } from 'react';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import SendIcon from '@material-ui/icons/Send';
import {toast} from "react-toastify";

// styling of input field
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
        borderColor: '#0f9ac4',
      },
      '&:hover fieldset': {
        borderColor: '#202d42',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'green',
      },
    },
  },
})(TextField);


class ClassRooms extends Component {

    state = {
        rooms: [{name: ""}],    //room array in state to save the result and handling input field
        width: 0, height: 0,
        marginLeftTextField: 0,
        buttonDisabled: true     //handling button disable or enable with boolean
    }

    // handling submit button: disable button if input feild do not have value
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

    // checking that every input feild should have unique value
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

// handling the input fields with white space
    checkEmptyField = (rooms) => {
        let totalCounter = 0;
        rooms.map((room, i) => {
            let emptyCounter = 0;
            for(let j = 0; j < room.name.length; j++){
                if(room.name[j] === " "){
                    emptyCounter++;
                }
            }
            if(room.name.length === emptyCounter){
                totalCounter++;
            }
        })

        if(totalCounter > 0){           
            this.setState({buttonDisabled: true})            
        }
    }


// handling the maximum length of input field
    maxLengthConstraint = (rooms) => {
        rooms.map((room, i) => {
            if(room.name.length > 12){
                this.setState({buttonDisabled: true}) 
                toast.error("Only 12 characters are allowed in room name");    
            }
        })
    }

    // handling change in input feild and update in rooms acordingly to show in input feild
    handleChange = (e, i) => {
        const rooms = [...this.state.rooms];
        rooms[i].name = e.target.value;
        this.setState({rooms})
        


        this.sumbitButtonCOnstraint(rooms)   //checking that input feild should have value

        this.checkUniqueArray(rooms);    //cheking uniquness of input feild

        this.checkEmptyField(rooms);    // checking white space sof input fields

        this.maxLengthConstraint(rooms);    // checking maximum length of input speed

    }

    // this function will add input feild if called
    addMoreField = () => {
        const rooms = [...this.state.rooms, {name: ""}]
        this.setState({rooms})

        this.sumbitButtonCOnstraint(rooms)  //disabling the submit button because here input feild will not have value
        
        this.checkEmptyField(rooms);    // checking white space sof input fields

        this.maxLengthConstraint(rooms);    // checking maximum length of input speed
    }

    // this function will be called when submit button will be clicked
    handleSubmit = () => {
        const roomsArray = [];
        const rooms = [...this.state.rooms];    //getting latest values from the state
        
         // making rooms array of names that has been entered
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

        // if input feild is empty mean room have no name, then removing it from rooms array
        rooms.map((room, i) => {
            if(!room.name){
                roomsArray.splice(i, 1);
            }
        })

        this.props.onClassRooms(roomsArray);    //calling function from parent component that is App and sending final result
        this.props.history.push("/home/classes");   //going to forward to next page by changing the url
    }

    // if input feild added by mistake with this function that can be removed by pressing the X button this function will be called
    handleRemove = (i) => {
        const rooms = [...this.state.rooms];

        if(rooms.length > 1){
            rooms.splice(i, 1);
            this.setState({rooms});
        }else{
            toast.error("Enter the Name of Atleast one Room")
        }

        this.sumbitButtonCOnstraint(rooms)

        this.checkEmptyField(rooms);    // checking white space sof input fields

        this.maxLengthConstraint(rooms);    // checking maximum length of input speed
    }


// handling some styling that can be affected by the resizing of application   ***** start_1 ***** 
    setMarginLeft = () => {
        if(window.innerWidth <= 700){
            this.setState({marginLeftTextField: 20})
        }else{
            this.setState({marginLeftTextField: 0})
        }
    }

    // updaing dimension if size of application is chanegs
    updateDimensions = (i) => {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
        if(i === 1){
            this.setMarginLeft();
        }
    };
    // will be called when component mount this is to handle some styling by the size of application
    componentDidMount() {
        window.addEventListener('resize', () => this.updateDimensions(1));  //adding event listner of resize to detech the size change of application
        this.setMarginLeft();   //calling function if size of application is changed
    }
    //will be called when component will unmount
    componentWillUnmount() {
        window.removeEventListener('resize', () => this.updateDimensions(0));   //removing listner
        this.setMarginLeft();   //calling function if size of application is changed
    }

                                                                             // ***** end_1 *****
    
    // interface of this component
    render(){
        const {rooms, buttonDisabled} = this.state; //geting values from state by object distructring syntax

        return (
            <form noValidate >
                <Grid container row alignItems="center" item xs={12} style={{marginTop: 60}}>
                    
                    {/* maping to rooms array to render all input feilds in rooms*/}
                    {
                        rooms.map((room, i) => {
                            return (
                                <Grid container key = {i} direction="column" justify="center" alignItems="center" item xs={8} style={{marginTop: 20, marginLeft: this.state.marginLeftTextField * -2}}>  
                                    <Grid only="lg" container direction="row" justify="flex-end" alignItems="center" item sm={7} style={{marginLeft: this.state.marginLeftTextField * 8}} >                                  
                                        {/* to remove the input feild by passing the index of feild */}
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            onClick = {() => this.handleRemove(i)}
                                            style={{backgroundColor: "#0f9ac4"}}
                                        >
                                            X
                                        </Button>
                                    </Grid>
                                    <Grid container direction="row" justify="flex-end" alignItems="center" item sm={5} style={{marginTop: -40}}>                                    
                                        {/* input feilds here calling the handleChange method to handle input value*/}
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
                            {/* butto to add more feilds by calling the addMoreFeild method */}
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
                     {/* submit button to submit current feilds and to go to next step */}
                    <Button
                        variant="contained"
                        style={{backgroundColor: buttonDisabled ? "#e0e0e0":'#2a3547', color: buttonDisabled ? "#c0cad8" : "#d0d6e0"}}
                        endIcon={<SendIcon>send</SendIcon>}
                        onClick = {this.handleSubmit}
                        disabled = {buttonDisabled}
                    >
                        Submit and Next
                    </Button>
                </Grid>
            </form>
        );
    }
}

export default ClassRooms;