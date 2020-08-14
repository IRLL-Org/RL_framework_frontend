import React from 'react';
import {Button} from 'antd';
import "antd/dist/antd.css";
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
   
                <div style={{textAlign: 'center'}}>
                    <div style={{display : "inline-block",textAlign: 'left'}}>
                    {ReactHtmlParser(this.state.content)}
                    <Button type="primary" htmlType="submit" >Submit</Button>
                    </div>
                </div>
            </form>
        )
    }
}

export default Forum;