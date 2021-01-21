import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addStory } from '../../actions/storiesActions'
import TopStory from './TopStory';

class StoryInput extends Component {

    state = {
        opening_line: '',
        image: '',
        genre: '',
        author: this.props.user.username,
        openingLineError: '',
        imageError: '',
        genreError: ''
    }
    // validateImage(image) {
    // //regrex here 
    // }

    handleOnChange = (e) => {
        let name = e.target.name
        this.setState({ [name]: e.target.value })
    }

    handleOnSubmit = (e) => {
        // We can validate the data the user enters before we set it on the state, allowing us to block any invalid values and set another state property (for example, isInvalidNumber). 
        e.preventDefault();

        if (this.state.opening_line === '') {
            this.setState({ openingLineError: 'Opening line is required.' });
        }
        else if (this.state.image === '') {
            this.setState({ imageError: 'Image is required.' });
        }


        else if (this.state.genre === '') {
            this.setState({ genreError: 'Genre is required.' });
        }
        else {
            this.setState({ openingLineError: '', imageError: '', genreError: '' });
            this.props.addStory(this.state)
            this.setState({
                opening_line: '',
                image: '',
                genre: ''
            })
        }
    }

    render() {
        return (
            <div className="row" style={{ margin: '30px 100px' }}>

                <div className="col-md-6">
                    <TopStory story={this.props.topStory} />
                </div>

                <div className="col-md-6">
                    <div className="mt-2">
                        {/* <p className="text-secondary font-weight-bold text-warning">Add a new story:</p> */}
                        <br />
                        <form className="mt-2">
                            <div className="mb-3">
                                <input placeholder="Opening line here..." className="form-control" value={this.state.opening_line} onChange={this.handleOnChange} name="opening_line" />
                                <small className="form-text text-danger">{this.state.openingLineError}</small>
                            </div>

                            <div className="mb-3">
                                <input placeholder="Image URL" className="form-control" type="url" value={this.state.image} onChange={this.handleOnChange} name="image" required />
                                <small className="form-text text-danger">{this.state.imageError}</small>
                            </div>

                            <b>Choose a Genre:</b>

                            <div className="form-check" onChange={this.handleOnChange} name="genre">
                                <input className="form-check-input" type="radio" value="Comedy" name="genre" />
                                <label className="form-check-label" for="Comedy">
                                    Comedy
                                </label>
                                <br />
                                <input className="form-check-input" type="radio" value="Horror" name="genre" />
                                <label className="form-check-label" for="Horror">
                                    Horror
                                </label>
                                <br />
                                <input className="form-check-input" type="radio" value="Action" name="genre" />
                                <label className="form-check-label" for="Action">
                                    Action
                                </label>
                                <br />
                                <input className="form-check-input" type="radio" value="Fantasy" name="genre" />
                                <label className="form-check-label" for="genre">
                                    Fantasy
                                </label>
                            </div>
                            
                            <button className="btn btn-secondary float-right" onClick={(event) => this.handleOnSubmit(event)}> Add New Story </button>
                        </form>
                    </div>
                </div>

            </div>

        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.currentUser
    }
}

export default connect(mapStateToProps, { addStory })(StoryInput);

