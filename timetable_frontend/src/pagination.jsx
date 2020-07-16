import React, {Component} from 'react';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';


class Pagination extends Component{
    render(){
        return(
            <React.Fragment>
                <div >
                    <ButtonGroup color="primary" aria-label="outlined primary button group">
                        <Button >
                            <Link to = "/home/classrooms" >1- Add Class Rooms</Link>
                        </Button>
                        <Button >
                            <Link to = "/home/classes" >2- Add Classes</Link>
                        </Button>
                        <Button >
                            <Link to = "/home/teachers" >3- Add Teachers</Link>
                        </Button>
                        <Button >
                            <Link to = "/home/courses" >4- Add Courses</Link>
                        </Button>

                        {/* <Button onClick={()=> filterOrder('delivered')} variant={delivered} >Delivered</Button> */}
                    </ButtonGroup>
                </div>
            </React.Fragment>
        );
    }
}

export default Pagination;