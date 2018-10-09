import React from 'react';
import { Register } from './Register.js';
import { Login } from './Login';
import { Home } from './Home';
import { Redirect, Switch, Route, Link } from 'react-router-dom';

export class Main extends React.Component {

    getLogin = () => {
        if (this.props.isLoggedIn) {
            return <Redirect to="/home"/>;
        }
        return <Login handleLogin={this.props.handleLogin} />;
    }

    getHome = () => {
        if (this.props.isLoggedIn) {
            return <Home />;
        }
        return <Redirect to="/login"/>;
    }

    getRoot = () => {
        return <Redirect to="login"/>;
    }

    render() {
        return (
            <div className="main">
                <Switch>
                    <Route exact path="/" render={this.getRoot}/>
                    <Route path="/login" component={this.getLogin}/>
                    {/*url match 如果match到，就render*/}
                    <Route path="/register" component={Register}/>
                    <Route path="/home" render={this.getHome}/>
                    {/*<Route component={Login}/>*/}
                    {/*如果没有match到前面，就render这个，switch相关*/}
                    <Route render={this.getRoot}/>
                </Switch>

            </div>
        );
    }
}