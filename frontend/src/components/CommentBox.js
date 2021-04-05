import React from 'react';
import axios from 'axios';
import CommentList from './CommentList'
import CommentForm from './CommentForm'

class CommentBox extends React.Component  {

    constructor(props) {
        super(props);
        this.state = {
            postID: 404,
            parentComment: []
        }
    }

    getParentComments = (post_id) => {
        axios.get("http://localhost:1337/comments/getParentComments?post_id=" + post_id)
        .then((response) => {
            this.setState({parentComment: response.data.posts});
        })
        .catch(error => alert("Error fetching parent comments."))
    }

    updateParentComments = (newComment) => {
        console.log(newComment);
        axios.post("http://localhost:1337/comments/createParentComment", newComment)
        .then((response) => {
            console.log("Updating!");
            var updatedComments = this.state.parentComment;
            updatedComments.push({
                "parent_comment_id": response.data.successful_parent_comment_id,
                "post_id": newComment.post_id,
                "text": newComment.text
            });
            this.setState({parentComment: updatedComments});
        }).catch(error => alert("Could not post comment."))
    }

    componentDidMount = () => {
        const postId = window.location.pathname.slice(6);
        this.setState({postID: postId})
        this.getParentComments(postId);
    }

    render() {
        return(
            <div className="commentBox">
                <CommentForm post_id={this.state.postID} updateParentComments={this.updateParentComments}/>
                <CommentList data={this.state.parentComment}/>
            </div>
        )
    }
}

export default CommentBox
