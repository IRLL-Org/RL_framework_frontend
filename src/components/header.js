import React from 'react';
import 'antd/dist/antd.css';
import './header.css';
import {Divider} from 'antd';

class Header extends React.Component{

    render(){
        return (
            <div>
             <img className="irllLogo" src={process.env.PUBLIC_URL + '/irll-logo.png'} alt="irll-logo" width="276" height="150"/>
             <Divider />
            </div>
        )
    }
}

export default Header;