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
                    <div name="inside" style={{display : "inline-block",textAlign: 'left',overflow : "auto",height : "650px"}}>
                    {ReactHtmlParser(this.state.content)}
                    <br />
                    <Button style={{marginLeft : "45%"}} type="primary" htmlType="submit" >Submit</Button>
                    </div>
                </div>
            </form>
        )
    }
}

export default Forum;