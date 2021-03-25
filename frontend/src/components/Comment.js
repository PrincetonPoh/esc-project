import React, {useEffect} from 'react';
import axios from 'axios';
import CommentCards from "./CommentCards";

class Comment extends React.Component {

    postParentComment = (post_id) => {
        const text = document.getElementById("pComment").value;
        axios.post("http://localhost:1337/comments/createParentComment", {
            "post_id": post_id,
            "text": text
        }).then((response) => {
            document.getElementById("commentBox").appendChild(
                <CommentCards parent_comment_id={response} text={text}/>
            )
        }).catch(error => alert("Could not post comment."))
    }

    getParentComments = (post_id) => {
        axios.get("http://localhost:1337/comments/getParentComments?post_id=" + post_id)
        .then((response) => {this.cardComment(response)})
        .catch(error => alert("Error fetching parent comments."))
    }
    
    cardComment = (allParents) => {
        return allParents.map(element => {
            return (
                <CommentCards comment={element}/>
            )
        })
    }

    render() {
        return (
            <div>
                <p>Comments</p>
                <div className="row" id="commentBox">
                    <textarea id="pComment" placeholder="Type here to post a comment..." maxLength="280" style={{width: "40vw"}}></textarea>
                    <input type="submit" value="Post comment" onSubmit={this.postParentComment(this.props.post_id)}></input>
                </div>

                <div>
                    {this.getParentComments(this.props.post_id)}
                </div>
            </div>
        )
    }
}

export default Comment
