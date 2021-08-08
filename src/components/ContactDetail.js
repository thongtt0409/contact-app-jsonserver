/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link } from "react-router-dom";
import user from "../images/User.jpg";


const ContactDetail = (props) => {
    // console.log(props);
    const { name, email } = props.location.state.contact;
    return (
       <div className="main">
            <div className="ui card centered">
                <div className="image">
                    <img src={user} alt="user"/>
                </div>
                <div className="content">
                     <a className="header">{name}</a>
                    <div className="description">{email}</div>
                </div>
                <div className="extra content">
                    <a>
                    <i className="user icon" />
                    22 Friends
                    </a>
                </div>
            </div>
            <div className="center-div ">
             <Link to="/">
                <button className="ui button blue center">
                        Back to Contact List
                </button>
            </Link>
            </div>
       </div>
    );
};

export default ContactDetail;