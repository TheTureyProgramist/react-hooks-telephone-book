import React, { useState, useMemo } from 'react';
import './App.css';
import styled from 'styled-components'
import ContactForm from './components/ContactForm/ContactForm'
import ContactList from './components/ContactList/ContactList'
import Filter from './components/Filter/Filter'
const Container = styled.div`
  padding: 20px;
  font-family: sans-serif;
`

export default function App() {
  const [contacts, setContacts] = useState([])
  const [filter, setFilter] = useState('')

  const addContact = (contact) => {
    const exists = contacts.some(c => c.name.toLowerCase() === contact.name.toLowerCase())
    if (exists) {
      alert(`${contact.name} є в контактах`)
      return false
    }
    const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 9)
    const contactWithId = { ...contact, id }
    setContacts(prev => [contactWithId, ...prev])
    return true
  }

  const deleteContact = (id) => {
    setContacts(prev => prev.filter(c => c.id !== id))
  }

  const changeFilter = (value) => {
    setFilter(value)
  }

  const visible = useMemo(() => {
    const normalized = filter.trim().toLowerCase()
    if (!normalized) return contacts
    return contacts.filter(c => c.name.toLowerCase().includes(normalized))
  }, [contacts, filter])

  return (
    <Container>
      <h1>Телефонна книга</h1>
      <ContactForm onAdd={addContact} />
      <h2>Контакти</h2>
      <Filter filter={filter} onChange={changeFilter} />
      <ContactList contacts={visible} onDelete={deleteContact} />
    </Container>
  )
}