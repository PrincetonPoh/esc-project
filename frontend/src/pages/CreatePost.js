import React, {useState} from 'react';
import axios from 'axios'

function CreatePost() {

    const [title, setTitle] = useState("")
    const [loc, setLoc] = useState("")
    const [desc, setDesc] = useState("")
    const [date, setDate] = useState("")

    const handleSubmit = (e) => {
        console.log(title, loc, desc, date);
        axios.post("http://localhost:1337/posts/createPost", 
        {
            "post_id": Math.floor(Math.random() * 100),
            "owner_id": Math.random(),
            "postTitle": title,
            "dateOfCreation": date,
            "postalCode": loc,
            "description": desc
        }).then((response) => alert("Successfully posted.")).catch((error) => alert("Error."));
    }

    return (
        <div>
            <h1>Create a post</h1>
            <div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Post Title</label>
                        <input value={title} onChange={e => setTitle(e.target.value)}></input>
                    </div>
                    <div>
                        <label>Location</label>
                        <input value={loc} onChange={e => setLoc(e.target.value)}></input>
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
                        <input value={desc} onChange={e => setDesc(e.target.value)} ></input>
                    </div>
                    <div>
                        <label>Post Type</label>
                        //Radio Button
                    </div>
                    <div>
                        <label>Date & Time</label>
                        //Radio Button
                        <input value = {date} onChange={e => setDate(e.target.value)}></input>
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
