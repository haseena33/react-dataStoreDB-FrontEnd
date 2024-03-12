import React from 'react';
import facebook from "../../assets/footer-images/facebook.svg";
import twitter from "../../assets/footer-images/twitter.svg";
import {  Grid, Typography, Box } from '@mui/material';
import { useStyles } from './footerstyles';
import { Link } from 'react-router-dom';


const Footer: React.FC = () => {
  const classes = useStyles();

  return (
    <>

<Grid container spacing={0} className={classes.root}>
          <Grid item xs={3} className={classes.griditem}>
            <Box  className={classes.Box}>
              <Typography variant="h6" className={classes.title}>Company</Typography>
              <ul style={{ listStyle: 'none', padding: 0 }} className={classes.centerText}>
                <li>Community</li>
                <li>Blog</li>
                <li>Events</li>
              </ul>
            </Box>
          </Grid>

          <Grid item xs={3} className={classes.griditem}>
            <Box  className={classes.Box}>
              <Typography variant="h6" className={classes.title}>Open Source</Typography>
              <ul style={{ listStyle: 'none', padding: 0 }} className={classes.centerText}>
                <li>react-slick</li>
                <li>react-highlight</li>
              </ul>
            </Box>
          </Grid>

          <Grid item xs={3} className={classes.griditem}>
            <Box  className={classes.Box}>
              <Typography variant="h6" className={classes.title}>Meetups</Typography>
              <ul style={{ listStyle: 'none', padding: 0 }} className={classes.centerText}>
                <li>ReactJS Bangalore</li>
                <li>Blockchain Bangalore</li>
              </ul>
            </Box>
          </Grid>

          <Grid item xs={3} className={classes.griditem}>
            <Box  className={classes.Box}>
              <Typography variant="h6" className={classes.title}>Social</Typography>
              <Link to="/twitter" target="_blank" className={classes.link}>
                <img src={twitter} alt="Twitter" className={classes.socialIcon} />
              </Link>
              <Link to="/facebook" target="_blank" className={classes.link}>
                <img src={facebook} alt="Facebook" className={classes.socialIcon} />
              </Link>
            </Box>
          </Grid>
        </Grid>
    </>
  );
};

export default Footer;
