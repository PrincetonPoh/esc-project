import React from 'react';
import {useParams} from 'react-router-dom'; 
function Post() {
    let {id} = useParams();

    console.log(id);

    return (
        <h1>Welcome to event {id}</h1>
    )
}
export default Post;