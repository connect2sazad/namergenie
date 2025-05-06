import React from "react";
import axios from "axios";

import { BsArrowRight } from "react-icons/bs";

import withRouter from '../components/withrouter.component';
import WebHead from '../components/webhead.component';
import Header from "../components/header.component";
import Footer from "../components/footer.component";
import IconCards from "../components/icon-cards.component";

import image_idea from '../assets/images/idea.png';
import image_ai from '../assets/images/ai.png';
import image_availability from '../assets/images/availability.png';
import image_pick from '../assets/images/pick.png';
import { SITENAME } from "../components/constants.component";
import TextCards from "../components/text-cards.component";

class HomePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            message: '',
            posts: [],
            head_insiders: {
                page_title: SITENAME,
                keywords: ["Best Site", "Best Site 2", "Best Site 3"],
                description: 'Test Description'
            },
        };
    }

    componentDidMount() {
        // this.fetchPosts();
    }

    fetchPosts = async () => {
        const token = localStorage.getItem('token');

        try {
            const response = await axios.get('http://localhost:5555/posts', {
                headers: {
                    'Authorization': token
                }
            });
            this.setState({ message: response.data.message, posts: response.data.posts });
        } catch (error) {
            this.setState({ message: `Failed to load profile: ${error.response?.data?.message || error.message}` });
            this.props.navigate('/login');
        }
    }

    render() {
        return (
            <>
                <WebHead headInsiders={this.state.head_insiders} />
                <Header selected="home" />
                <div className="container-fluid text-white">
                    <div className="row my-5 py-3">
                        <div className="col-12 text-center">
                            <p className="font-weight-bolder display-4">Drop your idea, we'll name it for the world.</p>
                        </div>
                        <div className="col-12 text-center">
                            <p className="lead">Smart, Catchy & Available</p>
                        </div>
                        <div className="col-12">
                            <div className="row justify-content-center">
                                <div className="col-12 col-md-8">
                                    <div className="input-group">
                                        <input 
                                            type="text" 
                                            className="form-control bg-theme-primary-input no-outline rounded no-rounded-right text-white home-input-custom" 
                                            placeholder="Name your next big idea, in seconds..." 
                                        />
                                        <div className="input-group-append">
                                            <button className="btn btn-outline-primary home-button-custom" type="button">
                                                First step for something amazing!!
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <IconCards />

                <div className="container-fluid text-white">
                    <div className="row my-5 py-3">
                        <div className="col-12 text-center">
                            <p className="font-weight-bolder display-4">How It Works</p>
                        </div>
                        <div className="col-12 my-5 d-flex justify-content-center align-items-center">
                            <ul className="how-it-works list-unstyled">
                                <li>
                                    <img className="icon" src={image_idea} alt="Drop your idea" />
                                    <p>Drop your idea</p>
                                </li>
                                <li>
                                    <BsArrowRight className="blue-neon" />
                                </li>
                                <li>
                                    <img className="icon" src={image_ai} alt="AI generates names" />
                                    <p>AI generates names</p>
                                </li>
                                <li>
                                    <BsArrowRight className="blue-neon" />
                                </li>
                                <li>
                                    <img className="icon" src={image_availability} alt="Availability Checked" />
                                    <p>Availability Checked</p>
                                </li>
                                <li>
                                    <BsArrowRight className="blue-neon" />
                                </li>
                                <li>
                                    <img className="icon" src={image_pick} alt="You pick" />
                                    <p>You pick</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="container-fluid text-white">
                    <div className="row my-5 py-3">
                        <div className="col-12 text-center">
                            <p className="font-weight-bolder display-4">Some Great Ideas</p>
                        </div>
                        <div className="col-12 mb-5 d-flex justify-content-center align-items-center">
                            <TextCards />
                        </div>
                    </div>
                </div>

                <div className="container-fluid text-white">
                    <div className="row my-5 py-3">
                        <div className="col-12 text-center">
                            <p className="font-weight-bolder display-4">Join Waitlist</p>
                        </div>
                        <div className="col-2"></div>
                        <div className="col-12 col-md-8 my-5 d-flex justify-content-center align-items-center">
                            <div className="input-group">
                                <input 
                                    type="email" 
                                    className="form-control bg-theme-primary-input no-outline rounded no-rounded-right text-white home-input-custom" 
                                    placeholder="Enter your Email ID" 
                                />
                                <div className="input-group-append">
                                    <button className="btn btn-outline-primary home-button-custom" type="button">
                                        I'm excited!!
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="col-2"></div>
                    </div>
                </div>

                <Footer />
            </>
        );
    }
}

export default withRouter(HomePage);
