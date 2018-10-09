import React, { Component } from 'react';
import { Header } from './Header.js';
import { Main } from './Main.js';
import { TOKEN_KEY } from '../constants';

class App extends Component {
    state = {
        isLoggedIn: !!localStorage.getItem(TOKEN_KEY) //一开始是undefined
    }
    handleLogin = (response) => {
        // console.log(response);
        localStorage.setItem(TOKEN_KEY, response);
        this.setState({ isLoggedIn: true });
    }
    handleLogout = () => {
        localStorage.removeItem(TOKEN_KEY);
        this.setState({ isLoggedIn: false });
    }

    render() {
        console.log(this.state.isLoggedIn);
        return (
            <div className="App">
                <Header isLoggedIn={this.state.isLoggedIn} handleLogout={this.handleLogout}/>
                <Main isLoggedIn={this.state.isLoggedIn} handleLogin={this.handleLogin}/>
                {/*把handleLogin function以object形式向下传*/}
            </div>
        );
    }
}

export default App;
