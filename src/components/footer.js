import React from 'react';
import 'antd/dist/antd.css';
import {Divider, Row, Col} from 'antd';

class Footer extends React.Component{

    render() {
        return (
            <div>
                <Divider />
                <Row>
                    <Col flex={3}>
                        <p style={{marginLeft : "35%",fontSize : "16px",color : "#777"}}>
                        © 2020 The Intelligent Robot Learning Lab.<br />
                        We are proudly affiliated with the <a style={{color : "#006a30"}} href="https://ualberta.ca">University of Alberta</a>,
                        <a style={{color : "#006a30"}} href="http://rlai.ualberta.ca/">RLAI</a>, and <a style={{color : "#006a30"}} href="https://amii.ca">Amii</a>.
                        </p>
                    </Col>
                    <Col flex={2}>
                        <img style={{marginLeft : "15%",marginBottom : "5%"}} src={process.env.PUBLIC_URL + '/ualberta.png'} alt="ualberta-logo" width="213" height="50"/>
                        <img style={{marginLeft : "5%", marginBottom : "5%"}} src={process.env.PUBLIC_URL + '/amii.png'} alt="amii-logo" width="97" height="75"/>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Footer;