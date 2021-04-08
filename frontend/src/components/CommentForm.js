import React from 'react';

class CommentForm extends React.Component  {

    constructor(props) {
        super(props);
        this.state = {
            text: ""
        }
    }
    
    postParentComment = (e, post_id) => {
        e.preventDefault();
        var text = this.state.text.trim();
        if (!text){
            return;
        }
        this.props.updateParentComments({"post_id": post_id, "text": text, "ownerName": this.props.username});
        this.setState({text: ""});
    }

    handleTextChange = (e) => {
        this.setState({text: e.target.value});
    }
    
    
    render() {
        return(
            <form className="row" id="pCommentForm" onSubmit={(e) => this.postParentComment(e, this.props.post_id)}>
                <input id="pComment" class="textarea" role="textbox" contentEditable onChange={this.handleTextChange} value={this.state.text} placeholder="Type here to comment..."></input>
                {this.state.text!="" ? <input id="pComment-button" type="submit" value="Post Comment"></input> : null}
            </form>
        )
    }
}

export default CommentForm
