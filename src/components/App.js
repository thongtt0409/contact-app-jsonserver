import React, { useState,useEffect } from "react";
import {  BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { uuid } from "uuidv4";
import api from "../api/contacts";
import "./App.css";
import Header from './Header';
import AddContact from './AddContact';
import ContactList from './ContactList';
import ContactDetail from './ContactDetail';
import EditContact from './EditContact';




function App() {
  const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // ustate search
  const [searchResults, setSearchResults] = useState([]);

  //lấy api contacts
  const retrieveContacts = async () => {
    const response = await api.get("/contacts");
    return response.data;
  }

//thêm contacts
  const addContactHandler = async (contact) => {
    console.log(contact);
    const request = {
      id: uuid(),
      ...contact,
    };

    const response = await api.post("/contacts", request);
    setContacts([...contacts, response.data]); //toán tử lấy name và email ...contact   .data lấy từ input
  };

  //update contacts
  const updateContactHandler = async (contact) => {
    const response = await api.put(`/contacts/${contact.id}`, contact);
    const {id, name, email} = response.data;
    setContacts(
      contacts.map((contact) => {
      return contact.id === id ? {...response.data } : contact;
    })
    );
  };


//xóa contacts
  const removeContactHandler = async (id) => {
    await api.delete(`/contacts/${id}`);
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });
    setContacts(newContactList);
  };

  //tìm kiếm contacts
  const searchHandler =  (searchTerm) => {
    setSearchTerm(searchTerm);
    if (searchTerm !== "") {
      const newContactList = contacts.filter((contact) => {
        return Object.values(contact)
            .join(" ") //join cho phép lấy hết tất cả giá trị của contact
            .toLowerCase() //toLowserCase cho phép giá trị in hoa hoặc thường để đưa vào tìm kiếm
            .includes(searchTerm.toLowerCase());
      });
      setSearchResults(newContactList);                                                   
    } else {
      setSearchResults(contacts);
    }
  };


    //lưu trữ
   useEffect(() => {
    // const retriveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    // if(retriveContacts) setContacts(retriveContacts);

    const getAllCOntacts = async () => {
      const allContacts = await retrieveContacts();
      if (allContacts) setContacts(allContacts);
    };

    getAllCOntacts();
  }, []);


    useEffect(() => {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div className="ui container ">
    <Router>
      <Header />
      <Switch>
          <Route 
            path="/" 
            exact
            render={(props) => (
                <ContactList 
                {...props}
                contacts={searchTerm.length < 1 ? contacts : searchResults} 
                getContactId={removeContactHandler } 
                term={searchTerm}
                searchKeyword={searchHandler}
                />
            )}
          />
         
          <Route 
            path="/add"
            render={(props) => (
                 <AddContact 
                 {...props}
                 addContactHandler={addContactHandler}/>
            )}
          />

          <Route 
            path="/edit"
            render={(props) => (
                 <EditContact 
                 {...props}
                 updateContactHandler={updateContactHandler}/>
            )}
          />


          <Route path="/contact/:id" component={ContactDetail} />
      </Switch>

    </Router>
    </div>
  );
}

export default App;
