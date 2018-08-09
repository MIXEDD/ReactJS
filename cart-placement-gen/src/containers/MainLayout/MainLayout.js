import React, {Component} from 'react';
import InputForm from './InputForm/InputForm';
import banner from '../../assets/images/banner.png';
import './MainLayout.css';

class MainLayout extends Component {
    render(){
        return(
            <div className="MainLayout">
                <img id="banner" src={banner} alt="banner"/>
                <InputForm/>
            </div>
        );
    }
}

export default MainLayout;