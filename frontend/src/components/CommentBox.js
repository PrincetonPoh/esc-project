import React from 'react';
import axios from 'axios';
import CommentList from './CommentList'
import CommentForm from './CommentForm'

class CommentBox extends React.Component  {

    constructor(props) {
        super(props);
        this.state = {
            post_id: this.props.post_id,
            parentComment: [],
            user: this.props.user
        }
    }

    getParentComments = (post_id) => {
        axios.get("http://scratchtest.ddns.net:1337/comments/getParentComments?post_id=" + post_id)
        .then((response) => { this.setState({parentComment: response.data.posts});})
        .catch(error => alert("Error fetching parent comments."))
    }

    updateParentComments = (newComment) => {
        axios.post("http://scratchtest.ddns.net:1337/comments/createParentComment", {
            "post_id": newComment.post_id,
            "text": newComment.text,
            "ownerName": this.state.user
        })
        .then((response) => {
            var updatedComments = this.state.parentComment;
            updatedComments.push({
                "parent_comment_id": response.data.success_parent_comment_id,
                "post_id": newComment.post_id,
                "text": newComment.text,
                "ownerName": this.state.user
            });
            this.setState({parentComment: updatedComments});
        }).catch(error => alert("Could not post comment."))
    }

    componentDidMount = () => {
        this.getParentComments(this.props.post_id);
    }

    render() {
        return(
            <div className="commentBox">
                <CommentForm post_id={this.state.post_id} updateParentComments={this.updateParentComments}/>
                <CommentList data={this.state.parentComment} user={this.state.user}/>
            </div>
        )
    }
}

export default CommentBox
