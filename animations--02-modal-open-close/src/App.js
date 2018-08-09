import React, { Component } from "react";
import "./App.css";
import awesomeLogo from './assets/images/awesome-logo.svg';
import socialIcons from './assets/images/social-icons.svg';
import one from './assets/images/one.svg';
import two from './assets/images/two.svg';
import three from './assets/images/three.svg';
import four from './assets/images/four.svg';
import five from './assets/images/five.svg';

class App extends Component {


  render() {
    return (
        <div>
            <div className='menu-container'>
                <div className='menu'>
                    <div className='date'>Aug 14, 2016</div>
                    <div className='signup'>Sign Up</div>
                    <div className='login'>Login</div>
                </div>
            </div>
            <div className='header-container'>
                <div className='header'>
                    <div className='subscribe'>Subscribe &#9662;</div>
                    <div className='logo'><img src={awesomeLogo}/></div>
                    <div className='social'><img src={socialIcons}/></div>
                </div>
            </div>
            <div className='photo-grid-container'>
                <div className='photo-grid'>
                    <div className='photo-grid-item first-item'>
                        <img src={one}/>
                    </div>
                    <div className='photo-grid-item'>
                        <img src={two}/>
                    </div>
                    <div className='photo-grid-item'>
                        <img src={three}/>
                    </div>
                    <div className='photo-grid-item'>
                        <img src={four}/>
                    </div>
                    <div className='photo-grid-item last-item'>
                        <img src={five}/>
                    </div>
                </div>
            </div>
            <div className='footer'>
                <div className='footer-item footer-one'></div>
                <div className='footer-item footer-two'></div>
                <div className='footer-item footer-three'></div>
            </div>
        </div>

    );
  }
}

export default App;
