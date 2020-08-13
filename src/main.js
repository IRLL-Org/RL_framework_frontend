import React from 'react';
import 'antd/dist/antd.css';
import {CaretRightOutlined,PauseOutlined,ArrowUpOutlined,ArrowDownOutlined,ArrowLeftOutlined,
    ArrowRightOutlined, ReloadOutlined, UpOutlined, DownOutlined, StopOutlined,
    CloudUploadOutlined,CloudDownloadOutlined} from '@ant-design/icons';
import { Button,message, Input, Spin } from 'antd';
import {browserName,osName,browserVersion,osVersion} from 'react-device-detect';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { v4 as uuidv4 } from 'uuid';
import Header from './components/header';
import Footer from './components/footer';

const client = new W3CWebSocket('wss://test.nicknissen.com:5000');

class Main extends React.Component {

    state = {
        isStart : false,
        frameCount : 0,
        frameId : 0,
        frameRate : 30,
        src : "",
        loading : true
    }

    componentDidMount() {

        client.onopen = () => {
            console.log('WebSocket Client Connected');
            this.setState(({
                loading : false
            }))
            this.sendMessage({
                userId : uuidv4()
            })
        };

        client.onmessage = (message) => {
            let frame = JSON.parse(message.data).frame;
            this.setState(prevState => ({
                src : "data:image/jpeg;base64, " + frame,
                frameCount : prevState.frameCount + 1,
                frameId : JSON.parse(message.data).frameId
              }));
        };

        client.onclose = () => {
            console.log("WebSocket Client Closed");
        }

        document.addEventListener('keydown', (event) => {
            switch(event.code) {
                case "KeyS": this.sendMessage({
                    actionType : "sKey",
                    action : "down"
                });
                break;
                case "ArrowDown": this.sendMessage({
                    actionType : "downArrow",
                    action : "down"
                });
                break;
                case "KeyW": this.sendMessage({
                    actionType : "wKey",
                    action : "up"
                });
                break;
                case "ArrowUp": this.sendMessage({
                    actionType : "upArrow",
                    action : "up"
                });
                break;
                case "KeyA": this.sendMessage({
                    actionType : "aKey",
                    action : "left"
                });
                break;
                case "ArrowLeft": this.sendMessage({
                    actionType : "leftArrow",
                    action : "left"
                });
                break;
                case "KeyD": this.sendMessage({
                    actionType : "dKey",
                    action : "right"
                });
                break;
                case "ArrowRight": this.sendMessage({
                    actionType : "rightArrow",
                    action : "right"
                });
                break;
                default:
                    break
              }
          });

        //document.addEventListener('mousedown',(event) => {
        //    this.sendMessage({
        //        eventType : "mousedown",
        //        xCoord : event.offsetX,
        //        yCoord : event.offsetY
        //    })
        //})

        if(document.hasFocus){
            console.log("The window is in focus");
        }

        console.log("Your screen resolution is: " + window.screen.width * window.devicePixelRatio + "x" + window.screen.height * window.devicePixelRatio);
    }

    sendMessage = (data) => {
        if(this.state.loading){
            message.error("Please wait the connection to be established first!")
            return;
        }
        const allData = {
            ...data,
            frameCount : this.state.frameCount,
            frameId : this.state.frameId
        }
        console.log(allData);
        client.send(JSON.stringify(allData));
    }

    handleStart(status){
        if(status === "start"){
            this.sendMessage({
                command : "start",
                system : osName,
                systemVersion : osVersion,
                browser : browserName,
                browserVersion : browserVersion,

            })
        }else{
            this.sendMessage({
                command : status
            })
        }
        this.setState(prevState => ({
            isStart : !prevState.isStart,
          }));
    }

    handleFPS(speed){
        if((speed === "faster" && this.state.frameRate + 5 > 90) || (speed === "slower" && this.state.frameRate - 5 < 1)){
            message.error("Invalid FPS, the FPS can only between 1 - 90!")
        }else{
            this.setState(prevState => ({
                frameRate : speed === "faster" ? prevState.frameRate + 5 : prevState.frameRate - 5
            }))
            this.sendMessage({
                changeFrameRate : speed
            })
        }
    }

    onFPSChange(speed){
        this.setState(({
            frameRate : speed
        }))
        this.sendMessage({
            changeFrameRate: speed
        })
    }

    render() {

        return (
            <div>
                <Header />
                <div style={{height: "605px",width : "705px", border : "solid #1890ff" ,borderRadius: "10px", display: "flex",justifyContent: "center",alignItems : "center", margin: "auto"}}>
                    {this.state.loading || !this.state.src ?
                    <Spin style={{fontSize : "18px",}} size = "large" tip="The game is still loading, please wait ..." /> 
                    : <img style={{borderRadius : " 10px"}} src={this.state.src} alt="frame" width="700px" height="600px" />
                    }
                </div>

                <div style={{border : "solid",borderRadius: "10px",marginTop : "20px",width : "700px",marginLeft : "auto",marginRight : "auto"}}>
                    <table style={{border: "none"}} cellSpacing="0" cellPadding="6">
                        <tbody>
                            <tr>
                                <td></td>
                                <td><Button shape="round" size="large" icon={<ArrowUpOutlined />} onClick={() => this.sendMessage({actionType : "mousedonw",action : "up"})}/></td>
                                <td></td>
                                <td><p></p></td>
                                <td>{
                                this.state.isStart ? <Button type="danger" icon={<PauseOutlined  />} size='large' onClick={() => this.handleStart("pause")}>Pause</Button> 
                                : <Button type="primary"  icon={<CaretRightOutlined />} size='large' onClick={() => this.handleStart("start")}>Start</Button>
                                }</td>
                                <td><Button type="danger" icon={<StopOutlined  />} size='large' onClick={() => this.handleStart("stop")}>Stop</Button></td>
                                <td><Button type="primary" style={{backgroundColor: "#52c41a", color : "white", borderColor : "#52c41a"}} icon={<ReloadOutlined />} size='large' onClick={() => this.handleStart("reset")}>Reset</Button></td>
                            </tr>
                            <tr>
                                <td><Button shape="round" size="large" icon={<ArrowLeftOutlined />} onClick={() => this.sendMessage({actionType : "mousedown", action :"left"})}/></td>
                                <td></td>
                                <td><Button shape="round" size="large" icon={<ArrowRightOutlined />} onClick={() => this.sendMessage({actionType : "mousedown" , action : "right"})}/></td>
                                <td></td>
                                <td><Button style={{backgroundColor: "#faad14", color : "white", borderColor : "#faad14"}} icon={<CloudUploadOutlined />} type="primary" size='large' onClick={() => this.handleStart("trainOffline")}>Train Online</Button></td>
                                <td><Button type="primary" size='large' icon={<CloudDownloadOutlined />} onClick={() => this.handleStart("trainOnline")}>Train Offline</Button></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td><Button shape="round" size="large" icon={<ArrowDownOutlined />} onClick={() => this.sendMessage({actionType : "mousedown",action : "down"})}/></td>
                                <td></td>
                                <td></td>
                                <td><Input style={{width : "100px"}} defaultValue={30} value={this.state.frameRate} suffix="FPS"/></td>
                                <td>
                                    <Button shape="round" size="large" icon={<UpOutlined />} onClick={() => this.handleFPS("faster")}/>
                                    <Button shape="round" size="large" icon={<DownOutlined />} onClick={() => this.handleFPS("slower")}/>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <Footer />
            </div>
                
        );
    }
}

export default Main;