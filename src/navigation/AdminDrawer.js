import React, { Component, Fragment } from "react";
// import Product from "./Product";
// import Title from "./Title";
import { ProductConsumer } from "../context";
import { withStyles } from '@material-ui/core/styles';
import { Link, NavLink } from "react-router-dom";
import clsx from 'clsx';
// import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
// import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
// import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import LocalMallIcon from '@material-ui/icons/LocalMall';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import RateReviewIcon from '@material-ui/icons/RateReview';
import LiveTvIcon from '@material-ui/icons/LiveTv';
import EqualizerIcon from '@material-ui/icons/Equalizer';

import Switch from '@material-ui/core/Switch';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Redirect } from "react-router";
import HomeIcon from '@material-ui/icons/Home';


const AntSwitch = withStyles((theme) => ({
  root: {
    width: 28,
    height: 16,
    padding: 0,
    display: 'flex',
  },
  switchBase: {
    padding: 2,
    color: theme.palette.grey[500],
    '&$checked': {
      transform: 'translateX(12px)',
      color: theme.palette.common.white,
      '& + $track': {
        opacity: 1,
        backgroundColor: '#6600ff',
        borderColor: '#6600ff',
      },
    },
  },
  thumb: {
    width: 12,
    height: 12,
    boxShadow: 'none',
  },
  track: {
    border: `1px solid ${theme.palette.grey[500]}`,
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: theme.palette.common.white,
  },
  checked: {},
}))(Switch);

class MainDrawer extends Component {
  
  state={
    checkedC: true
  }

  handleChange = (event) => {
    // this.setState({checkedC: false})
    this.setState({ ...this.state, [event.target.name]: event.target.checked });
  };

  render() {
    return (
      <Fragment>
      <ProductConsumer>
      {value => {
      return <Drawer open={value.isDrawerVisible} onClose={value.handleDrawerClose}>
            <div style={{width:250}}>  
              <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          // padding: theme.spacing(0, 1),
                          // necessary for content to be below app bar
                          // ...theme.mixins.toolbar,
                          justifyContent: 'flex-end',
                        }}>
                
                
                
                <Link to='/'>
                <IconButton onClick={value.handleDrawerClose}>
                  <HomeIcon style={{color:'#6600ff'}} />
                </IconButton>
                </Link>
                <IconButton onClick={value.handleDrawerClose}>
                  <ChevronLeftIcon />
                </IconButton>
              </div>
              <List>

              <NavLink to='/newcase'
                      style={{
                        color:'#000000',
                        textDecoration: 'none',
                      }}
                      activeStyle={{
                        fontWeight: "bold",
                        color: "#6600ff",
                      }}
                      isActive={(match, location) => {
                        if (!match) {
                          // // console.log(match)
                          return false;
                        }
                        
                        // value.switchScreen(location.pathname)
                        // // console.log(location.pathname)
                        // // console.log(location)
                        // only consider an event active if its event id is an odd number
                        const eventID = parseInt(match.params.eventID);
                        return !isNaN(eventID) && eventID % 2 === 1;
                      }}
                      >
              <ListItem button key={'New Case'}>
                  <ListItemIcon>{<LocalMallIcon  />}</ListItemIcon>
                  <ListItemText primary={'New Case'} />
                </ListItem>
              </NavLink>

              <NavLink to='/calender'
                        style={{
                          color:'#000000',
                          textDecoration: 'none',
                        }}
                        activeStyle={{
                          fontWeight: "bold",
                          color: "#6600ff"
                        }}>

              <ListItem button key={'Calender'}>
                  <ListItemIcon>{<ShoppingCartIcon />}</ListItemIcon>
                  <ListItemText primary={'Calender'} />
                </ListItem>
              </NavLink>
              
              <NavLink to='/tasks'
                style={{
                  color:'#000000',
                  textDecoration: 'none',
                }}
                activeStyle={{
                  fontWeight: "bold",
                  color: "#6600ff"
                }}>
                <ListItem button key={'Tasks'}>
                  <ListItemIcon>{<LocalOfferIcon />}</ListItemIcon>
                  <ListItemText primary={'Tasks'} />
                </ListItem>
              </NavLink>

              <NavLink to='/consultations'
                        style={{
                          color:'#000000',
                          textDecoration: 'none',
                        }}
                        activeStyle={{
                          fontWeight: "bold",
                          color: "#6600ff"
                        }}>
              <ListItem button key={'Consultations'}>
                <ListItemIcon>{<RateReviewIcon />}</ListItemIcon>
                <ListItemText primary={'Consultations'} />
              </ListItem>
              </NavLink>

              <NavLink to='/accounts'
                        style={{
                          color:'#000000',
                          textDecoration: 'none',
                        }}
                        activeStyle={{
                          fontWeight: "bold",
                          color: "#6600ff"
                        }}>
                <ListItem button key={'Accounts'}>
                  <ListItemIcon>{<LiveTvIcon />}</ListItemIcon>
                  <ListItemText primary={'Accounts'} />
                </ListItem>
              </NavLink>
                

                </List>
              </div>
            </Drawer>}}

        </ProductConsumer>
      </Fragment>
    );
  }
}
export default MainDrawer;
