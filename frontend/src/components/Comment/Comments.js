import React from 'react'
import ChildComments from './ChildComments'

class Comments extends React.Component  {

    render() {
        return(
            <div className="comments">
                {this.props.text}
                <ChildComments parent={this.props.parent}/>
            </div>
        )
    }
}

export default Comments