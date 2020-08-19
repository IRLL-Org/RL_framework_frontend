import React from 'react';
import "antd/dist/antd.css";
import './main.css';
import axios from 'axios';
import {Spin} from 'antd';
import Header from './components/header';
import Footer from './components/footer';
import Forum from './components/forum';
import Game from './components/game';
import {RLAPI, PROJECT_ID, USER_ID} from './utils/constants';

class Main extends React.Component{

    state = {
        formContent : "",
        userId : USER_ID,
        projectId : PROJECT_ID,
        isLoading : true,
        isGame : false,
    }

    componentDidMount(){
        this.initialForm();
    }

    initialForm = () => {
        axios.get(RLAPI,{
            params : {
                projectId : this.state.projectId,
                userId : this.state.userId
            }
        }).then(res => {
            this.setState(({
                formContent : res.data,
                isLoading : false
            }))
        })
    }

    gameEndHandler = () =>{
        this.setState(({
            isGame : false
        }))
        this.initialForm();
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
                    formContent : res.data,
                    isLoading : false
                }))
            }
        }).catch(function (error) {
            console.log(error)
          });
    }

    render(){
        const {isLoading,formContent,isGame} = this.state;

        const preGame = <div className="forumContainer">
                            {isLoading ? 
                            <Spin className="Loader" size = "large" tip="Moving to next step, please wait ..." /> :
                            <Forum content={formContent} action={this.handleSubmit}/> 
                            }
                        </div>
                            
        return (
            <div>
                <Header />
                {!isGame ? preGame : <Game action={this.gameEndHandler} />}
                <Footer />
            </div>   
        )
    }
}

export default Main;