import React from 'react';
import "antd/dist/antd.css";
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import {Spin} from 'antd';
import Header from './components/header';
import Footer from './components/footer';
import Forum from './components/forum';
import Game from './components/game';
import {RLAPI} from './utils/constants';

class Main extends React.Component{

    state = {
        content : "",
        userId : uuidv4(),
        projectId : 'demo_1.0.0',
        isLoading : true,
        isGame : false
    }

    componentDidMount(){
        this.fetchData();
    }

    fetchData = () => {
        axios.get(RLAPI,{
            params : {
                projectId : this.state.projectId,
                userId : this.state.userId
            }
        }).then(res => {
            this.setState(({
                content : res.data,
                isLoading : false
            }))
        })
    }

    handleSubmit = (event) => {
        this.setState(({
            isLoading : true
        }))
        const form = event.target;
        const data = {}
        for (let element of form.elements) {
          if (element.tagName === 'BUTTON') { continue; }
          data[element.name] = element.value;
        }
        axios.post(RLAPI,data,{
            params : {
                projectId : this.state.projectId,
                userId : this.state.userId
            }
        }).then(res => {
            if(res.data === "pre-game end"){
                this.setState(({
                    isLoading : true,
                    isGame : true
                }))
            }else{
                this.setState(({
                    content : res.data,
                    isLoading : false
                }))
            }
        }).catch(function (error) {
            console.log(error)
          });
    }

    render(){
        const preGame =   <div style={{display: "flex",justifyContent: "center",alignItems : "center", margin: "auto"}}>
                            {this.state.isLoading ? 
                            <Spin style={{fontSize : "18px",}} size = "large" tip="Moving to next step, please wait ..." /> :
                            <Forum content={this.state.content} action={this.handleSubmit}/> 
                            }
                        </div>
                            
                            
        const inGame = <Game projectId={this.state.projectId} userId={this.state.userId} />
        return (
            <div>
                <Header />
                {!this.state.isGame ? preGame : inGame}
                <Footer />
            </div>   
        )
    }
}

export default Main;