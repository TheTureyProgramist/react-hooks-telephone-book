import React, { createContext, useReducer } from 'react';
import './App.css';
import styled from 'styled-components'
import ContactForm from './components/ContactForm/ContactForm'
import ContactList from './components/ContactList/ContactList'
import Filter from './components/Filter/Filter'
export const ContactsContext = createContext(null)

function contactsReducer(state, action) {
  switch (action.type) {
    case 'ADD_CONTACT':
      return { ...state, contacts: [action.payload, ...state.contacts] }
    case 'DELETE_CONTACT':
      return { ...state, contacts: state.contacts.filter(c => c.id !== action.payload) }
    case 'SET_FILTER':
      return { ...state, filter: action.payload }
    default:
      return state
  }
}

function useContacts(initialContacts = []) {
  const [state, dispatch] = useReducer(contactsReducer, { contacts: initialContacts, filter: '' })

  const addContact = (contact) => {
    const exists = state.contacts.some(c => c.name.toLowerCase() === contact.name.toLowerCase())
    if (exists) {
      alert(`${contact.name} є в контактах`)
      return false
    }
    const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 9)
    const contactWithId = { ...contact, id }
    dispatch({ type: 'ADD_CONTACT', payload: contactWithId })
    return true
  }

  const deleteContact = (id) => dispatch({ type: 'DELETE_CONTACT', payload: id })
  const setFilter = (value) => dispatch({ type: 'SET_FILTER', payload: value })

  return {
    contacts: state.contacts,
    addContact,
    deleteContact,
    filter: state.filter,
    setFilter,
  }
}

export function ContactsProvider({ children }) {
  const { contacts, addContact, deleteContact, filter, setFilter } = useContacts([])

  return (
    <ContactsContext.Provider value={{ contacts, addContact, deleteContact, filter, setFilter }}>
      {children}
    </ContactsContext.Provider>
  )
}

const Container = styled.div`
  padding: 20px;
  font-family: sans-serif;
`

export default function App() {
  return (
    <ContactsProvider>
      <Container>
        <h1>Телефонна книга</h1>
        <ContactForm Ctx={ContactsContext} />
        <h2>Контакти</h2>
        <Filter Ctx={ContactsContext} />
        <ContactList Ctx={ContactsContext} />
      </Container>
    </ContactsProvider>
  )
}