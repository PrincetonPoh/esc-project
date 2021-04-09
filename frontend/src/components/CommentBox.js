import React from 'react';
import axios from 'axios';
import CommentList from './CommentList'
import CommentForm from './CommentForm'

class CommentBox extends React.Component  {

    constructor(props) {
        super(props);
        this.state = {
            post_id: 404,
            parentComment: [],
            username: ''
        }
    }

    getParentComments = (post_id) => {
        axios.get("http://scratchtest.ddns.net:1337/comments/getParentComments?post_id=" + post_id)
        .then((response) => { this.setState({parentComment: response.data.posts});})
        .catch(error => alert("Error fetching parent comments."))
    }

    updateParentComments = (newComment) => {
        axios.post("http://scratchtest.ddns.net:1337/comments/createParentComment", newComment)
        .then((response) => {
            var updatedComments = this.state.parentComment;
            updatedComments.push({
                "parent_comment_id": response.data.success_parent_comment_id,
                "post_id": newComment.post_id,
                "text": newComment.text,
                "ownerName": this.state.username
            });
            this.setState({parentComment: updatedComments});
        }).catch(error => alert("Could not post comment."))
    }

    componentDidMount = () => {
        this.setState({post_id: this.props.post_id});
        this.getParentComments(this.props.post_id);
        this.props.username != null ? this.setState({username: this.props.username}) : this.setState({username: "Unknown User"})
    }

    render() {
        return(
            <div className="commentBox">
                <CommentForm post_id={this.state.post_id} updateParentComments={this.updateParentComments} username={this.state.username}/>
                <CommentList data={this.state.parentComment} username={this.state.username}/>
            </div>
        )
    }
}

export default CommentBox
