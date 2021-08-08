import React, { useRef }  from "react";
import { Link } from "react-router-dom";
import ContactCard from "./ContactCard";

const ContactList = (props) => {
    console.log(props);
    const inputEl = useRef("");
    const deleteContactHandler = (id) => {
        props.getContactId(id);
    };

  

    const renderContactList = props.contacts.map((contact) => {
        return (
            <ContactCard 
            contact={contact} 
            clickHander={deleteContactHandler} 
            key={ contact.id }
            />
        );
    });
    
    const getSearchTerm = () => {
        props.searchKeyword(inputEl.current.value);
    };


    return(
        <div className="main">
            <h2>Contact List
                <Link to="/add">
                     <button className="ui button blue right">Add Contact</button>
                </Link>
            </h2>
            <div className="center-div">
                <div className="ui icon input">
                    <input 
                    ref={inputEl}
                    type="text" 
                    className="prompt" 
                    placeholder="Search..." 
                    value={props.term} 
                    onChange={getSearchTerm} 
                    />
                    <i className="search link icon" />
                </div>
            </div>
            <div className="ui celled list ">
                {renderContactList.length > 0 ? renderContactList: "No results"}
            </div>
        </div>
    );
};

export default ContactList;