import React from 'react';
import 'antd/dist/antd.css';
import './game.css';
import {CaretRightOutlined,PauseOutlined,ArrowUpOutlined,ArrowDownOutlined,ArrowLeftOutlined,
    ArrowRightOutlined, ReloadOutlined, UpOutlined, DownOutlined, StopOutlined,
    CloudUploadOutlined,CloudDownloadOutlined, SendOutlined} from '@ant-design/icons';
import { Button,message, Input, Spin, Tooltip, Modal } from 'antd';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import {browserName,osName,browserVersion,osVersion} from 'react-device-detect';
import getKeyInput from '../utils/getKeyInput';
import {WS_URL,USER_ID, PROJECT_ID} from '../utils/constants';

class Game extends React.Component{
    
    state = {
        isStart : false,
        frameCount : 0,
        frameId : 0,
        frameRate : 30,
        frameSrc : "",
        isLoading : true,
        isEnd : false,
        isVisible : false
    }

    componentDidMount() {

        this.timer = setTimeout(() => {
            this.websocket = new W3CWebSocket(WS_URL);
            this.websocket.onopen = () => {
                console.log('WebSocket Client Connected');
                this.setState(({
                    isLoading : false
                }))
                this.sendMessage({
                    userId : USER_ID,
                    projectId : PROJECT_ID
                })
            };

            this.websocket.onmessage = (message) => {
                if(message.data === "done"){
                    this.setState(({
                        isEnd : true,
                        isVisible : true
                    }))
                }else{
                    let frame = JSON.parse(message.data).frame;
                    this.setState(prevState => ({
                        frameSrc : "data:image/jpeg;base64, " + frame,
                        frameCount : prevState.frameCount + 1,
                        frameId : JSON.parse(message.data).frameId
                    }));
                }
            };
        }, 30000);

        document.addEventListener('keydown', (event) => {
            if([37, 38, 39, 40].indexOf(event.keyCode) > -1) {
                event.preventDefault();
            }
            this.sendMessage(getKeyInput(event.code));
        })

        document.addEventListener('mousedown',(event) => {
            this.sendMessage({
                eventType : "mousedown",
                xCoord : event.offsetX,
                yCoord : event.offsetY
            })
        })
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    handleOk = e => {
        this.setState({
          isVisible : false
        });
        this.props.action()
      };
    
    handleCancel = e => {
        this.setState({
            isVisible : false
        });
    };

    sendMessage = (data) => {
        if(this.state.isLoading){
            message.error("Please wait the connection to be established first!")
            return;
        }
        const allData = {
            ...data,
            frameCount : this.state.frameCount,
            frameId : this.state.frameId
        }
        this.websocket.send(JSON.stringify(allData));
    }

    handleStart(status){
        if(status === "start"){
            this.sendMessage({
                command : status,
                system : osName,
                systemVersion : osVersion,
                browser : browserName,
                browserVersion : browserVersion,

            })
            this.setState(prevState => ({
                isStart : !prevState.isStart
            }))
        }else if (status === "stop" || status === "pause"){
            this.sendMessage({
                command : status
            })   
            this.setState(prevState => ({
                isStart : !prevState.isStart,
            }));
        }
        else{
            this.sendMessage({
                command : status
            })
        }   
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

    render() {
        const {isLoading, frameSrc, isStart, frameRate, isEnd} = this.state;
        return (
            <div>
                <div className="gameWindow">
                    {isLoading || !frameSrc ?
                    <Spin className="Loader" size = "large" tip="The robot is about to start the game, please wait ..." /> 
                    : <img className="gameContent" src={frameSrc} alt="frame" width="700px" height="600px" />
                    }
                </div>
                <Modal
                    title="Game end message"
                    visible={this.state.isVisible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    >
                    <p>The game has ended</p>
                    <p>Press <b>Cancel</b> to stay on this page</p>
                    <p>Press <b>OK</b> to move to next step</p>
                </Modal>

                <div className="controlPanel">
                    <table className="panelContainer" cellSpacing="0" cellPadding="6">
                        <tbody>
                            <tr>
                                <td></td>
                                <td>
                                <Tooltip placement="left" title="Move Up" arrowPointAtCenter>
                                    <Button shape="round" size="large" icon={<ArrowUpOutlined />} onClick={() => this.sendMessage({actionType : "mousedonw",action : "up"})}/>
                                </Tooltip>   
                                </td>
                                <td></td>
                                <td><p></p></td>
                                <td>{
                                isStart ? <Button type="danger" icon={<PauseOutlined  />} size='large' onClick={() => this.handleStart("pause")}>Pause</Button> 
                                : <Button type="primary"  icon={<CaretRightOutlined />} size='large' onClick={() => this.handleStart("start")}>Start</Button>
                                }</td>
                                <td><Button type="danger" icon={<StopOutlined  />} size='large' onClick={() => this.handleStart("stop")}>Stop</Button></td>
                                <td><Button type="primary" className="resetButton"  icon={<ReloadOutlined />} size='large' onClick={() => this.handleStart("reset")}>Reset</Button></td>
                            </tr>
                            <tr>
                                <td>
                                <Tooltip placement="bottom" title="Move Left" arrowPointAtCenter>
                                    <Button shape="round" size="large" icon={<ArrowLeftOutlined />} onClick={() => this.sendMessage({actionType : "mousedown", action :"left"})}/>
                                </Tooltip>
                                </td>
                                <td></td>
                                <td>
                                <Tooltip placement="top" title="Move Right" arrowPointAtCenter>
                                    <Button shape="round" size="large" icon={<ArrowRightOutlined />} onClick={() => this.sendMessage({actionType : "mousedown" , action : "right"})}/>
                                </Tooltip>
                                </td>
                                <td></td>
                                <td><Button className="onlineButton" icon={<CloudUploadOutlined />} type="primary" size='large' onClick={() => this.handleStart("trainOffline")}>Train Online</Button></td>
                                <td><Button className="offlineButton" type="primary" size='large' icon={<CloudDownloadOutlined />} onClick={() => this.handleStart("trainOnline")}>Train Offline</Button></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>
                                <Tooltip placement="right" title="Move Dowm" arrowPointAtCenter>
                                    <Button shape="round" size="large" icon={<ArrowDownOutlined />} onClick={() => this.sendMessage({actionType : "mousedown",action : "down"})}/>
                                </Tooltip>
                                    </td>
                                <td></td>
                                <td></td>
                                <td><Input className="fpsInput" defaultValue={30} value={frameRate} suffix="FPS"/></td>
                                <td>
                                    <Tooltip placement="bottom" title="Increase the FPS" arrowPointAtCenter>
                                        <Button shape="round" size="large" icon={<UpOutlined />} onClick={() => this.handleFPS("faster")}/>
                                    </Tooltip>
                                    <Tooltip placement="bottom" title="Decrease the FPS" arrowPointAtCenter>
                                        <Button shape="round" size="large" icon={<DownOutlined />} onClick={() => this.handleFPS("slower")}/>
                                    </Tooltip>
                                </td>
                                <td>{isEnd ? 
                                    <Tooltip placement="bottom" title="Move to next step" arrowPointAtCenter>
                                        <Button type="primary" shape="round" size="large" icon={<SendOutlined />} onClick={this.handleOk}>Next</Button>
                                    </Tooltip> : null}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )}
}

export default Game;