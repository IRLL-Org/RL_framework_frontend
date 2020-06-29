import React from 'react';
import 'antd/dist/antd.css';
import {LeftOutlined,RightOutlined,UpOutlined,DownOutlined,CaretRightOutlined,PauseOutlined } from '@ant-design/icons';
import { Button } from 'antd';

class Main extends React.Component {

    state = {

    }

    componentDidMount() {

        document.addEventListener('keyup', (event) => {
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
                <UpOutlined style={{ fontSize: '40px', color: '#08c' }} onClick={() => this.handleArrowUp()}/>
                <DownOutlined style={{ fontSize: '40px', color: '#08c' }} onClick={() => this.handleArrowDown()}/>
                <LeftOutlined style={{ fontSize: '40px', color: '#08c' }} onClick={() => this.handleArrowLeft()}/>
                <RightOutlined style={{ fontSize: '40px', color: '#08c' }} onClick={() => this.handleArrowRight()}/>
            
                <Button type="primary" icon={<CaretRightOutlined />} size='large'>Start</Button>
                <Button type="disabled" icon={<PauseOutlined  />} size='large'>Pause</Button>
            </div>
        );
    }
}

export default Main;