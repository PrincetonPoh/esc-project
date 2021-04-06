import React from 'react'
import axios from 'axios'
import ChildCommentForm from './ChildCommentForm'

class ChildComments extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            parentID: 404,
            childComment: []
        }
    }

    postChildComment = (newChild) => {
        axios.post("http://localhost:1337/comments/createChildComment", newChild)
        .then((response) => {
            var updatedChildren = this.state.childComment;
            updatedChildren.push({
                "child_comment_id": response.data.success_child_comment_id,
                "parent_comment_id": this.state.parentID,
                "text": newChild.text
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
        this.setState({parentID: this.props.parent_id});
        this.getChildComments(this.props.parent_id);
    }

    render() {
        return(
            <div className="childComments">
                {this.props.text}
                {this.state.childComment.map(element => {
                    return (
                        <div key={element.id}>
                            {element.text}
                        </div>
                    )
                })}
                <ChildCommentForm parent_id={this.state.parentID} postChild={this.postChildComment}/>
            </div>
        )
    }
}

export default ChildComments
