import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { facebook, instagram, linkedin, SITENAME, SiteTitle, twitter, parent } from "./constants.component";
import { FaLinkedin } from "react-icons/fa6";
import { RiParentLine } from "react-icons/ri";

const Footer = () => {
    return (
        <>

            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 my-5 text-center text-white">
                        <Link className="btn btn-outline-light btn-floating m-1" to={parent} role="button">
                            <RiParentLine />
                        </Link>
                        <Link className="btn btn-outline-light btn-floating m-1" to={linkedin} role="button">
                            <FaLinkedin />
                        </Link>
                        <Link className="btn btn-outline-light btn-floating m-1" to={facebook} role="button">
                            <FaFacebookF />
                        </Link>
                        <Link className="btn btn-outline-light btn-floating m-1" to={instagram} role="button">
                            <FaInstagram />
                        </Link>
                        <Link className="btn btn-outline-light btn-floating m-1" to={twitter} role="button">
                            <FaTwitter />
                        </Link>
                    </div>
                </div>
            </div>

            <div className="d-flex justify-content-between p-3 text-white">
                <div>
                    &copy; {new Date().getUTCFullYear()} {SITENAME} by {SiteTitle}. All rights reserved.
                </div>
                <div>
                    Crafted with ❤️ by <Link to="https://www.lyncdigit.com/" target="_blank" rel="noopener noreferrer" className="text-white">{SiteTitle}</Link>
                </div>
            </div>
        </>
    );
}

export default Footer;