import React from 'react';
import axios from 'axios';

class Comments extends React.Component  {
    render() {
        return(
            <div className="comments">
                {this.props.text}
            </div>
        )
    }
}

export default Comments
