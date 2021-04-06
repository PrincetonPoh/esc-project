import React from 'react';

class ChildCommentForm extends React.Component  {

    constructor(props) {
        super(props);
        this.state = {
            text: ""
        }
    }
    
    postChildComment = (e, parent_id) => {
        e.preventDefault();
        var text = this.state.text.trim();
        if (!text){
            return;
        }
        console.log(parent_id);
        this.props.postChild({"parent_comment_id": parent_id, "text": text, "ownerName": this.props.username});
        this.setState({text: ""});
    }

    handleTextChange = (e) => {
        this.setState({text: e.target.value});
    }
    
    
    render() {
        return(
            <form className="row" id="commentForm" onSubmit={(e) => this.postChildComment(e, this.props.parent_id)}>
                <input id="pComment" class="textarea" role="textbox" contentEditable onChange={this.handleTextChange} value={this.state.text}></input>
                <input id="pComment-button" type="submit" value="Post Comment"></input>
            </form>
        )
    }
}

export default ChildCommentForm
