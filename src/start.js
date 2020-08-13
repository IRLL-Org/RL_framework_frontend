import React from 'react';
import "antd/dist/antd.css";
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import {Button, Checkbox, Spin} from 'antd';
import Header from './components/header';
import Footer from './components/footer';
import history from './history';

const api = "https://api.irll.net/next";

class Start extends React.Component{

    state = {
        content : "",
        userId : uuidv4(),
        projectId : 'demo_1.0.0',
        loading : true,
    }

    componentDidMount(){
        this.fetchData();
    }

    fetchData = () => {
        axios.get(api,{
            params: {
                projectId : this.state.projectId,
                userId : this.state.userId
            }
        }).then(res => {
            console.log(res);
            this.setState(({
                content : res.data,
                loading : false
            }))
        })
    }

    handleSubmit(event){
        this.setState(({
            loading : true
        }))
        this.fetchData();
        //const data = new FormData(event.target);

        //axios.post(api,data).then(res => {
        //   this.setState(({
        //        loading : true
        //}))  
        //   this.fetchData();
        //    }
        //)
    }

    render(){
        return (
            <div>
                <Header />
                <form onSubmit={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                this.handleSubmit(e);
                            }}>
                    <div style={{textAlign : "center"}}>
                        <div style={{display : "inline-block",textAlign : "left", height : "600px"}}  >    
                            {this.state.loading ? <Spin style={{fontSize : "18px",}} size = "large" tip="Moving to next step, please wait ..." /> : this.state.content}
                        </div>
                        <br />
                        <input type="submit" value="Continue" />
                    </div>
                </form>
                <Footer />
            </div>
        )
    }
}

export default Start;