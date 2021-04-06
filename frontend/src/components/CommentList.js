import React from 'react';
import ChildComments from './ChildComments'

class CommentList extends React.Component  {
    
    render() {
        return(
            <div className="commentList">
                {
                    this.props.data.map((element) => {
                        return (
                            <ChildComments text={element.text} parent_id={element.parent_comment_id} key={element.id}/>
                        )
                    })
                }
            </div>
        )
    }
}

export default CommentList
