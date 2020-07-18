import React, {Component} from 'react';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import PrimarySearchAppBar from "./appBar/appBar";
import ProgressBars from "./appBar/progressBar"

class Pagination extends Component{

    state = {
        smallScreen: false,
        reRender: false,
        progressValue: 1
    }

    setMarginLeft = () => {
        if(window.innerWidth <= 700){
            this.setState({smallScreen: true})
        }else{
            this.setState({smallScreen: false})
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

    reRednerPagination = () => {
        const reRender = !this.state.reRender;
   
        this.setState({reRender, progressValue: 0})
    }

    render(){
        const {smallScreen, progressValue} = this.state;
        
        const backColorDefault = "#2a3547";
        const textCOlor = "#dadfe8";
        
        const selectedId = window.location.pathname.substr(6);

        const changeColor1 = selectedId === "classrooms";
        const changeColor2 = selectedId === "classes";
        const changeColor3 = selectedId === "teachers";
        const changeColor4 = selectedId === "courses";
        const changeColor5 = selectedId === "table";
        return(
            <div>
                <PrimarySearchAppBar onreRednerPagination = {this.reRednerPagination} />
                <form noValidate>
                    <Grid container style={{marginTop: 100}} direction="col" justify="center" alignItems="center" item sm={12} >
                        <Grid container direction="row" justify="center" alignItems="center" item sm={6} >
                            <ProgressBars ononProgressValue = {progressValue ? this.props.onProgressValue : progressValue} />
                        </Grid>
                        <Grid container style={{marginTop: 40}} direction="row" justify="center" alignItems="center" item sm={12} >
                            <ButtonGroup color="primary" aria-label="outlined primary button group">
                                <Button disabled style={{backgroundColor: changeColor1 ? "#0f9ac4" : backColorDefault, color: textCOlor}} >
                                    <p style={{fontSize: smallScreen ? 7 : 11, marginBottom: -1}}>1- Add Class Rooms</p>
                                </Button>
                                <Button disabled style={{backgroundColor: changeColor2 ? "#0f9ac4" : backColorDefault, color: textCOlor}} >
                                    <p style={{fontSize: smallScreen ? 7 : 11, marginBottom: -1}}>2- Add Classes</p>
                                </Button>
                                <Button disabled style={{backgroundColor: changeColor3 ? "#0f9ac4" : backColorDefault, color: textCOlor}} >
                                    <p style={{fontSize: smallScreen ? 7 : 11, marginBottom: -1}}>3- Add Teachers</p>
                                </Button>
                                <Button disabled style={{backgroundColor: changeColor4 ? "#0f9ac4" : backColorDefault, color: textCOlor}} >
                                    <p style={{fontSize: smallScreen ? 7 : 11, marginBottom: -1}}>4- Add Courses</p>
                                </Button>
                                <Button disabled style={{backgroundColor: changeColor5 ? "#0f9ac4" : backColorDefault, color: textCOlor}} >
                                    <p style={{fontSize: smallScreen ? 7 : 11, marginBottom: -1}}>5- Time Table</p>
                                </Button>

                                {/* <Button onClick={()=> filterOrder('delivered')} variant={delivered} >Delivered</Button> */}
                            </ButtonGroup>
                        </Grid>
                    </Grid>
                </form>
            </div>
        );
    }
}

export default Pagination;