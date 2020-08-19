import React from 'react';
import 'antd/dist/antd.css';
import './header.css';
import {Divider} from 'antd';

class Header extends React.Component{

    render(){
        return (
            <div>
                <a className="irllLogo" href="https://irll.ca/" >
                    <img src={process.env.PUBLIC_URL + '/irll-logo.png'} alt="irll-logo" width="276" height="150"/>
                </a>
                <Divider />
            </div>
        )
    }
}

export default Header;