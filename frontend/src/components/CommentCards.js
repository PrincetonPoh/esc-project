import React from 'react';
import axios from 'axios';

class CommentCards extends React.Component {

    postChildComment = (pComment_id) => {
        const text = document.getElementById("cComment").value;
        axios.post("http://localhost:1337/comments/createChildComment", {
            "parent_comment_id": pComment_id,
            "text": text
        }).then((response) => {
            document.getElementById({pComment_id}).appendChild(
                <p id={response}>{text}</p>
            )
        }).catch(error => alert("Could not post reply."))
    }

    getChildComments = (parent_id) => {
        axios.get("http://localhost:1337/comments/getChildComments?parent_id=" + parent_id)
        .then((response => {this.listChildComments(response, parent_id)}))
        .catch(error => alert("Error in getting child comments."))
    }

    listChildComments = (allChild, parent_id) => {
        const commentPost = document.getElementById(parent_id);
        return commentPost.prepend(
            allChild.map(element => {
                return <p id={element.child_comment_id}>{element.text}</p>
            })
        )
    }

    render() {
        return (
            <div id={this.props.parent_comment_id}>
                <p>{this.props.text}</p>
                {this.getChildComments(this.props.parent_comment_id)}
                <div className="row" id="replyBox">
                    <textarea id="cComment" placeholder="Type here to post a reply..." maxLength="280" style={{width: "20vw"}}></textarea>
                    <input type="submit" value="Post reoky" onSubmit={() => this.postChildComment(this.props.parent_comment_id)}></input>
                </div>
            </div>
        )
    }
}

export default CommentCards
