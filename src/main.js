import React from 'react';
import 'antd/dist/antd.css';
import {CaretRightOutlined,PauseOutlined,ArrowUpOutlined,ArrowDownOutlined,ArrowLeftOutlined,ArrowRightOutlined} from '@ant-design/icons';
import { Button } from 'antd';
import {browserName,osName,browserVersion,osVersion} from 'react-device-detect';
import { w3cwebsocket as W3CWebSocket } from "websocket";

const client = new W3CWebSocket('wss://test.nicknissen.com:5000');

class Main extends React.Component {

    state = {
        isStart : false,
        frameCount : 0,
        src : "",
    }

    componentDidMount() {
        

        client.onopen = () => {
            console.log('WebSocket Client Connected');
            const data = {
                "id" : 1,
                "frameId" : this.st
            };

            client.send(JSON.stringify({
                ...data
              }));
        };

        client.onclose = () => {
            console.log("WebSocket Client Closed");
        }

        client.onmessage = (message) => {
            let frame = JSON.parse(message.data).frame;
            this.setState(
                { 
                    src :  "data:image/jpeg;base64, " + frame
        
                }
            )
        };

        document.addEventListener('keydown', (event) => {
            switch(event.code) {
                case "KeyS":
                case "ArrowDown":
                  this.handleArrowDown();
                  break;
                case "KeyW":
                case "ArrowUp":
                  this.setState(
                            { time : Date.now() }
                        )
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

          document.addEventListener('keyup', (event) => {
            switch(event.code) {
                case "KeyS":
                case "ArrowDown":
                  this.handleArrowDown();
                  break;
                case "KeyW":
                case "ArrowUp":
                    const currentTime = Date.now();
                    console.log(this.state.time);
                    console.log(currentTime);
                    console.log(`You pressed the up key for ${currentTime - this.state.time}`);
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

        document.addEventListener('mousedown',(event) => {
            console.log(`The X coordinate of the mouse is ${event.offsetX}`);
            console.log(`The Y coordinate of the mouse is ${event.offsetY}`);
        })

        if(document.hasFocus){
            console.log("The window is in focus");
        }

        console.log(`You are using ${browserName} browser with version ${browserVersion}`);
        console.log(`You are using ${osName} OS with version ${osVersion}`);

        console.log("Your screen resolution is: " + window.screen.width * window.devicePixelRatio + "x" + window.screen.height * window.devicePixelRatio);

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

                <img src={this.state.src} alt="frame" width="600" height="600"/>
            </div>
        );
    }
}

export default Main;