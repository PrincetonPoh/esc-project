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
            user: ''
        }
    }

    getParentComments = (post_id) => {
        axios.get("http://localhost:1337/comments/getParentComments?post_id=" + post_id)
        .then((response) => { this.setState({parentComment: response.data.posts});})
        .catch(error => alert("Error fetching parent comments."))
    }

    updateParentComments = (newComment) => {
        axios.post("http://localhost:1337/comments/createParentComment", {
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
        this.setState({user: this.props.user});
        this.setState({post_id: this.props.post_id});
        this.getParentComments(this.props.post_id);
        console.log(this.props.user);
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
