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
        this.props.postChild({"parent_comment_id": parent_id, "text": text});
        this.setState({text: ""});
    }

    handleTextChange = (e) => {
        this.setState({text: e.target.value});
    }
    
    
    render() {
        return(
            <form className="row" id="cCommentForm" onSubmit={(e) => this.postChildComment(e, this.props.parent_id)}>
                <input id="cComment" class="textarea" role="textbox" contentEditable onChange={this.handleTextChange} value={this.state.text} placeholder="Type here to reply..."></input>
                {this.state.text!="" ? <input id="cComment-button" type="submit" value="Reply"></input> : null}
            </form>
        )
    }
}

export default ChildCommentForm
