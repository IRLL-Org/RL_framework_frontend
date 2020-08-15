import React from 'react';
import {Button} from 'antd';
import "antd/dist/antd.css";
import './forum.css';
import ReactHtmlParser from 'react-html-parser';


class Forum extends React.Component{

    state = {
        content : this.props.content,
    }

    render(){
        return (
            <form onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                this.props.action(e);}} >
   
                <div className="centerContainer">
                    <div className="overflowContainer">
                    {ReactHtmlParser(this.state.content)}
                    <br />
                    <Button className="submitButton" type="primary" htmlType="submit" >Submit</Button>
                    </div>
                </div>
            </form>
        )
    }
}

export default Forum;