import React from 'react'
import axios from 'axios'
import ChildCommentForm from './ChildCommentForm'
import placeholderProfilePic from '../media/logo_round.png'

class ChildComments extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            parent_id: 404,
            childComment: []
        }
    }

    postChildComment = (newChild) => {
        axios.post("http://localhost:1337/comments/createChildComment", newChild)
        .then((response) => {
            var updatedChildren = this.state.childComment;
            updatedChildren.push({
                "child_comment_id": response.data.success_child_comment_id,
                "parent_comment_id": this.state.parent_id,
                "text": newChild.text,
                "ownerName": this.props.username
            });
            this.setState({childComment: updatedChildren})

        }).catch(error => alert("Could not post reply."))
    }
    
    getChildComments = (parent_id) => {
        axios.get("http://localhost:1337/comments/getChildComments?parent_comment_id=" + parent_id)
        .then((response => this.setState({childComment: response.data.posts})))
        .catch(error => alert("Error in getting child comments."))
    }

    componentDidMount = () => {
        this.setState({parent_id: this.props.parent_id});
        this.getChildComments(this.props.parent_id);
    }

    render() {
        return(
            <div className="childComments">

                <div class="childComments-header"> 
                    <img src={placeholderProfilePic} class="profile-pic"/> 
                    <h3 class="commenter-username"> {this.props.ownerName} </h3>
                    <p class="comment-content">{this.props.text}</p>
                </div>

                <div class="childComments-inner"> 
                    {this.state.childComment.map((element, index) => {
                        return (
                            <div key={index}>
                                <hr/>
                                <img src={placeholderProfilePic} class="profile-pic"/> 
                                <h3 class="commenter-username">{element.ownerName}</h3>
                                <p class="comment-content">{element.text}</p>
                            </div>
                        )
                    })}
                    <ChildCommentForm parent_id={this.state.parent_id} postChild={this.postChildComment} username={this.props.username}/>
                </div>
            </div>
        )
    }
}

export default ChildComments
