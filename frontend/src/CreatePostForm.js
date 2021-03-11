import React from 'react';
import './CreatePost.css';
import info_hover from './info_hover.png';
import plus_icon_circle from './plus_icon_circle.png';

class CreatePostForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            location: '',
            region: 'Any Region',
            description: '',
            posttype: 'Offer',
            datetimetype: 'Recurrent/Ongoing',
            datetimedetails: '',
            image: null,
            commercial: false
        };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFile = this.handleFile.bind(this);
    }

    handleChange(event) {
        const target = event.target; 
        const value = target.type ==='checkbox' ? target.checked : target.value; 
        const name = target.name; 
        this.setState({
            [name]: value
        });
    }

    handleFile(event) {
        const file = event.target.files[0]; 
        this.setState({
            image: file
        })
    }

    handleSubmit(event) {
        alert("Title: "+this.state.title +
            "\n\nLocation: "+this.state.location +
            "\n\nRegion: "+this.state.region +
            "\n\nDescription: "+this.state.description +
            "\n\nPost Type: "+this.state.posttype +
            "\n\nDate & Time: "+this.state.datetimetype + " @ " + this.state.datetimedetails +
            "\n\nImage: "+(this.state.image==null ? "no image" : this.state.image.name) +
            "\n\nCommercial: "+this.state.commercial
            );
        event.preventDefault();

        // upload to backend here I guess 
    };

    
    render() {

        const uploadDefaultStyle = {
            display: "block",
            margin: "auto",
            padding: "30px 0",
            height: "90px",
            filter: "drop-shadow(0px 4px 2px rgba(0, 0, 0, 0.4))"
        }

        const uploadedStyle = {
            width: "100%",
            height: "100%",
            objectFit: "cover"
        }
        return (    
            <form id="create-post-form" onSubmit={this.handleSubmit}>
                <div id="form-container"> 
                    <div id="form-posttitle" class="form-item"> 
                        <label> Post Title </label> 
                        <div class="info"> 
                            <img src={info_hover} class="info-icon"/>
                            <span class="info-text"> Summarize your event/offer in as few words as possible. </span>
                        </div>
                        <input id="input-posttitle" name="title" type="text" value={this.state.title} onChange={this.handleChange} class="text-fields" required></input>
                    </div>

                    <div id="form-location" class="form-item"> 
                        <label> Location </label> 
                        <div class="info"> 
                            <img src={info_hover} class="info-icon"/>
                            <span class="info-text"> Where will your offer/event be available or held at? Select a region to help people nearby find your post! </span>
                        </div>
                        <input id="input-location" name="location" type="text" value={this.state.location} onChange={this.handleChange} class="text-fields" required></input>

                        <select id="input-region" name="region" value={this.state.value} onChange={this.handleChange}>
                            <option value="Any Region"> Any Region </option>
                            <option value="12"> Clementi (12XXXX) </option>
                            <option value="51"> Tampines (51XXXX) </option>
                            <option value="56"> Bishan (56XXXX) </option>
                            <option value="73"> Woodlands (73XXXX) </option>
                            <option value="75"> Yishun (75XXXX) </option>
                        </select>
                    </div>

                    <div id="form-description" class="form-item"> 
                        <label> Description </label> 
                        <div class="info"> 
                            <img src={info_hover} class="info-icon"/>
                            <span class="info-text"> Give more details on what your offer/event is about. Who can join in? What will participants be doing? </span>
                        </div>
                        <textarea id="input-description" name="description" type="text" value={this.state.description} onChange={this.handleChange} class="large-text-fields" required/>
                    </div>

                    <div id="form-posttype" class="form-item"> 
                        <label> Post Type </label> 
                        <div class="info"> 
                            <img src={info_hover} class="info-icon"/>
                            <span class="info-text"> Specify this to help others find your post more easily. </span>
                        </div>
                        <label class="form-radio-label">
                            <input class="form-radio" id="input-posttype" name="posttype" type="radio" value="Offer" checked={this.state.posttype === "Offer"} onChange={this.handleChange}/> 
                            Offer
                        </label>
                        <label class="form-radio-label">
                            <input class="form-radio" id="input-posttype" name="posttype" type="radio" value="Event" checked={this.state.posttype === "Event"} onChange={this.handleChange}/> 
                            Event
                        </label>
                    </div>

                    <div id="form-datetime" class="form-item"> 
                        <label> Date and Time </label> 
                        <div class="info"> 
                            <img src={info_hover} class="info-icon"/>
                            <span class="info-text"> Will you offer/event be recurring (eg. every Wednesday etc) or one-off (a specific date and time)? </span>
                        </div>
                        <label class="form-radio-label">
                            <input class="form-radio" id="input-datetimetype" name="datetimetype" type="radio" value="Recurrent/Ongoing" checked={this.state.datetimetype === "Recurrent/Ongoing"} onChange={this.handleChange}/> 
                            Recurrent/Ongoing
                        </label>
                        <label class="form-radio-label">
                            <input class="form-radio" id="input-datetimetype" name="datetimetype" type="radio" value="One-Off" checked={this.state.datetimetype === "One-Off"} onChange={this.handleChange}/> 
                            One-Off
                        </label>
                        <textarea id="input-datetimedetails" name="datetimedetails" type="text" value={this.state.datetimedetails} onChange={this.handleChange} class="large-text-fields" required/>
                    </div> 

                    <div id="form-image" class="form-item">
                        <label> Upload Image 
                            <div class="info"> 
                                <img src={info_hover} class="info-icon"/>
                                <span class="info-text"> Add an image which represents your offer/event and make your post more interesting! </span>
                            </div>
                            {/* <UploadBox /> */}
                            <div id="upload-box"> 
                                {this.state.image==null ?
                                    <img id="upload-image" src={plus_icon_circle} style={uploadDefaultStyle}/> 
                                    : 
                                    <img id="upload-image" src={URL.createObjectURL(this.state.image)} style={uploadedStyle}/>
                                }
                            </div>
                            <p id="upload-image-filename"> {this.state.image==null ? null : this.state.image.name} </p>
                            <input type="file" onChange={this.handleFile}/>
                        </label> 
                    </div>

                </div>

                <div id="form-commercial" class="form-item"> 
                    <label> 
                    <input class="form-checkbox" id="input-commercial" name="commercial" type="checkbox" checked={this.state.commercial} onChange={this.handleChange} />
                    Commercial Post </label>
                    <div class="info"> 
                        <img src={info_hover} class="info-icon"/>
                        <span class="info-text"> If your post is a commercial post, please declare it here by checking this box. </span>
                    </div>
                </div>

                <input id="create-post-form-button" type="submit" value="Create Post" />
                
            </form>
        );
    }

}
export default CreatePostForm;