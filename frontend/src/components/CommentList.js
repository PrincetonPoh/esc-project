import React from 'react';
import Comments from './Comments'

class CommentList extends React.Component  {
    
    render() {
        return(
            <div className="commentList">
                {
                    this.props.data.map((element) => {
                        return (
                            <Comments text={element.text} key={element.parent_comment_id}/>
                        )
                    })
                }
            </div>
        )
    }
}

export default CommentList
