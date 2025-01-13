import React, { Component } from 'react';
import RoomJoinPage from './RoomJoinPage';
import CreateRoomPage from './CreateRoomPage';
import Room from './Room';
import { Grid, Button, ButtonGroup, Typography } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import Info from "./Info";

export default class HomePage extends Component{
    constructor(props){
        super(props);
        this.state = {
            roomCode: null,
        };
        this.clearRoomCode = this.clearRoomCode.bind(this);
    }

    //once we rendered the page, we async do this operation
    async componentDidMount(){
        //get if user in the room
        fetch('/api/user-in-room').then((response) => response.json()).then((data) => {
            this.setState({
                roomCode: data.code
            });
        });
    }

    renderHomePage(){
        return (
            <Grid container spacing={3}>
                <Grid item xs={12} align="center">
                    <Typography variant="h3" compact="h3">
                        House party
                    </Typography>
                </Grid>
                <Grid item xs={12} align="center">
                    <ButtonGroup disableElevation variant="contained" color="primary">
                        <Button color="primary" to='/join' component={ Link }>
                            Join a room
                        </Button>
                        <Button color="default" to='/info' component={ Link }>
                            Info
                        </Button>
                        <Button color="secondary" to='/create' component={ Link }>
                            Create a room
                        </Button>
                    </ButtonGroup>
                </Grid>
            </Grid>
        );
    }

    clearRoomCode(){
        this.setState({
            roomCode: null,
        })
    }

    render(){
        return <Router>
            <Switch>
                <Route exact path='/' render={() => {
                    return this.state.roomCode ? (<Redirect to={`/room/${this.state.roomCode}`}/>) : (this.renderHomePage())
                }}/> 
                <Route path='/join' component={RoomJoinPage}/>
                <Route path='/info' component={Info}/>
                <Route path='/create' component={CreateRoomPage}/>
                <Route
                    path='/room/:roomCode'
                    render={(props) => {
                        return <Room {...props} leaveRoomCallback={this.clearRoomCode}/>;
                    }}>
                </Route>
            </Switch>
        </Router>;
    }
}