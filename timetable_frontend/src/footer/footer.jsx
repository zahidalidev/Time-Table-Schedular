import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/css/bootstrap.css";
import "./footer.scss"
import { makeStyles } from '@material-ui/core/styles';
import FacebookIcon from '@material-ui/icons/Facebook';
import GitHubIcon from '@material-ui/icons/GitHub';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import Link from '@material-ui/core/Link';
import LinkedInIcon from '@material-ui/icons/LinkedIn';

const useStyles = makeStyles({
    faG:{
        fontSize: '60px',
        textAlign: 'center',
        color: 'black',
    },
    faT:{
        fontSize: '60px',
        textAlign: 'center',
        color: '#55ACEE',
    },
    fa:{
        fontSize: '60px',
        textAlign: 'center',
        color: '#3b5998',
    },
    footer: {
        backgroundColor: '#384659',
        paddingBottom: 30,
        paddingTop: 70
    }

});

const Footer = () => {
    const classes = useStyles();
    const preventDefault = (event) => event.preventDefault();

  return (
    <footer style={{marginTop: 200}}>
      <div className={classes.footer}>
        <ul className="list-unstyled list-inline" align="center">
          <li className="list-inline-item">
            <a href="https://web.facebook.com/engr.zahid.927/" target="_blank" className="buttonAndButton">
               <FacebookIcon className={classes.fa} />
            </a>
          </li>
          <li className="list-inline-item">
            <a href="https://github.com/zahidalidev" target="_blank" className="buttonAndButtonG">
                <GitHubIcon className={classes.faG} />
            </a>
          </li>
          <li className="list-inline-item">
            <a href="https://www.linkedin.com/in/mrzahidali/" target="_blank" className="buttonAndButtonT">
              <LinkedInIcon className={classes.faT} />
            </a>
          </li>
          
          
          <li className="list-inline-item">
            <a href="https://www.facebook.com/prince.bhatti.3979489" target="_blank" className="buttonAndButton">
             <FacebookIcon className={classes.fa} />
            </a>
          </li>
          <li className="list-inline-item">
            <a href="https://github.com/AbSamDev" target="_blank" className="buttonAndButtonG">
             <GitHubIcon className={classes.faG} />
            </a>
          </li>
          <li className="list-inline-item">
            <a href="https://www.linkedin.com/in/abdul-samad-61a9461a0" target="_blank" className="buttonAndButtonT">
             <LinkedInIcon className={classes.faT} />
            </a>
          </li>

        </ul>
      </div>
      <div className="row" style={{backgroundColor: '#202833', marginRight: 0, display: 'flex', flexWrap: 'wrap', paddingTop: 10, paddingBottom: 10}}>
        <div align="center" className="col-md-12">
          <span style={{color: 'white'}}>&copy; {new Date().getFullYear()} Copyright: </span><a href="#"> AZ timeTable scheduler </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;