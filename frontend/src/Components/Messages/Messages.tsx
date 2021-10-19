import React from 'react'

import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

class MessagesSubmit extends React.Component{


    MessagesSubmit(this: any, e: { preventDefault: () => void; }) {
        e.preventDefault();
        var that = this,
        title = encodeURIComponent(that.refs.title.value.trim()),
        content = encodeURIComponent(that.refs.content.value.trim());
        that.props.submit(title,content);
        that.refs.title.value = '';
        that.refs.content.value = '';
    }
    
    render()
    {
        return(
            <form role="form" ref="form">
                <div className = 'display-0.5 text-center my-3'>
                    Create New Messages Here
                </div>
                <div className="card h-100">
                    <div className="col-xs-4">
                        <input className="form-control" type="text" name="name" ref="name" placeholder="Input the title" required/>
                    </div>
                </div>
                <div className="card h-100 my-2">
                    <div className="col-xs-12">
                        <textarea className="form-control" name="content" ref="content" placeholder="Input the message " required></textarea>
                    </div>
                </div>
                <div className="SubmitButt">
                    
                    <button className="btn btn-success" onClick={this.MessagesSubmit}>Submit</button>
                </div>
            </form>
        )
    }
}


class MessageShow extends React.Component{
    render()
    {
        return(
            
            <div className='MessageList'>
                <h1 className="display-0.7 text-center my-4">Messages List</h1>
                
                <div className="list-group">

                    <a href="#" className="list-group-item list-group-item-action" >
                        <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-1">Message from database --- Title1</h5>
                        <small>3 days ago</small>
                        </div>
                        <p className="mb-1">Message from database --- Content1</p>
                        
                    </a>

                    <a href="#" className="list-group-item list-group-item-action" >
                        <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-1">Message from database --- Title2</h5>
                        <small>4 days ago</small>
                        </div>
                        <p className="mb-1">Message from database --- Content2</p>
                        
                    </a>

                    <a href="#" className="list-group-item list-group-item-action" >
                        <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-1">Message from database --- Title3</h5>
                        <small>5 days ago</small>
                        </div>
                        <p className="mb-1">Message from database --- Content3</p>
                        
                    </a>

                    <a href="#" className="list-group-item list-group-item-action" >
                        <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-1">Message from database --- Title4</h5>
                        <small>5 days ago</small>
                        </div>
                        <p className="mb-1">Message from database --- Content4</p>
                        
                    </a>

                    <a href="#" className="list-group-item list-group-item-action" >
                        <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-1">Message from database --- Title5</h5>
                        <small>7 days ago</small>
                        </div>
                        <p className="mb-1">Message from database --- Content5</p>
                        
                    </a>

                    <a href="#" className="list-group-item list-group-item-action" >
                        <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-1">Message from database --- Title6</h5>
                        <small>8 days ago</small>
                        </div>
                        <p className="mb-1">Message from database --- Content6</p>
                        
                    </a>
                </div> 
            </div>
        


          
        );
    }
}









class MessageBoard extends React.Component{
   
    submit()
    {
        
    }
    render()
    {
        return(
            <div className="col-xs-8">
                <MessagesSubmit/>
                <MessageShow/>
            </div>
        );
    }
}
    






export default MessageBoard;

