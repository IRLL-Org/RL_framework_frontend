import React from 'react';
import 'antd/dist/antd.css';
import {CaretRightOutlined,PauseOutlined,ArrowUpOutlined,ArrowDownOutlined,ArrowLeftOutlined,ArrowRightOutlined} from '@ant-design/icons';
import { Button } from 'antd';

class Main extends React.Component {

    state = {
        isStart : false
    }

    componentDidMount() {

        document.addEventListener('keydown', (event) => {
            switch(event.code) {
                case "KeyS":
                case "ArrowDown":
                  this.handleArrowDown();
                  break;
                case "KeyW":
                case "ArrowUp":
                  this.handleArrowUp();
                  break;
                case "KeyA":
                case "ArrowLeft":
                  this.handleArrowLeft();
                  break;
                case "KeyD":
                case "ArrowRight":
                  this.handleArrowRight();
                  break;
                default:
                    break
              }
          });
    }

    handleStart(status){
        if(status === "start"){
            console.log("The game is started");
        }else if (status === "pause"){  
            console.log("The game is paused");
        }
        this.setState(prevState => ({
            isStart : !prevState.isStart,
          }));
    }

    handleArrowUp(){
        console.log("up button");
    }
    handleArrowDown(){
        console.log("down button");
    }
    handleArrowLeft(){
        console.log("left button");
    }
    handleArrowRight(){
        console.log("right button");
    }

    render() {

        return (
            <div>
                <Button shape="circle" size="large" icon={<ArrowUpOutlined />} onClick={() => this.handleArrowUp()}/>
                <Button shape="circle" size="large" icon={<ArrowDownOutlined />} onClick={() => this.handleArrowDown()}/>
                <Button shape="circle" size="large" icon={<ArrowLeftOutlined />} onClick={() => this.handleArrowLeft()}/>
                <Button shape="circle" size="large" icon={<ArrowRightOutlined />} onClick={() => this.handleArrowRight()}/>

                {
                this.state.isStart ? <Button type="danger" icon={<PauseOutlined  />} size='large' onClick={() => this.handleStart("pause")}>Pause</Button> 
                : <Button type="primary" icon={<CaretRightOutlined />} size='large' onClick={() => this.handleStart("start")}>Start</Button>
                }
                
            </div>
        );
    }
}

export default Main;