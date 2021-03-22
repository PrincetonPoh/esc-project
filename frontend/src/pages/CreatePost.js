import React from 'react';

function CreatePost() {

    const handleSubmit = (e) => {
        console.log(e);
    }

    return (
        <div>
            <h1>Create a post</h1>
            <div>
                <form>
                    <div>
                        <label>Post Title</label>
                        <input></input>
                    </div>
                    <div>
                        <label>Location</label>
                        <input></input>
                        <form>
                            <select>
                                <option>
                                    //API call for the options
                                </option>
                            </select>
                        </form>
                    </div>
                    <div>
                        <label>Description</label>
                        <input></input>
                    </div>
                    <div>
                        <label>Post Type</label>
                        //Radio Button
                    </div>
                    <div>
                        <label>Date & Time</label>
                        //Radio Button
                        <input></input>
                    </div>
                    <div>
                    <button>Publish Post</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default CreatePost;