import React, { Component } from 'react';
import './App.css';
import styled from 'styled-components'
import ContactForm from './components/ContactForm/ContactForm'
import ContactList from './components/ContactList/ContactList'
import Filter from './components/Filter/Filter'
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      contacts: [],
      filter: ' '
    }
  }
  addContact = (contact) => {
    const { contacts } = this.state
    const exists = contacts.some(c => c.name.toLowerCase() === contact.name.toLowerCase())
    if (exists) {
      alert(`${contact.name} є в контактах`)
      return false
    }
    const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 9)
    const contactWithId = { ...contact, id }
    this.setState(prev => ({ contacts: [contactWithId, ...prev.contacts] }))
    return true
  }
  deleteContact = (id) => {
    this.setState(prev => ({ contacts: prev.contacts.filter(c => c.id !== id) }))
  }
  changeFilter = (value) => {
    this.setState({ filter: value })
  }
  getFilteredContacts() {
    const { contacts, filter } = this.state
    const normalized = filter.trim().toLowerCase()
    if (!normalized) return contacts
    return contacts.filter(c => c.name.toLowerCase().includes(normalized))
  }
  render() {
    const { filter } = this.state
    const visible = this.getFilteredContacts()
    const Container = styled.div`
      padding: 20px;
      font-family: sans-serif;
    `
    return (
      <Container>
        <h1>Телефонна книга</h1>
        <ContactForm onAdd={this.addContact} />
        <h2>Контакти</h2>
        <Filter filter={filter} onChange={this.changeFilter} />
        <ContactList contacts={visible} onDelete={this.deleteContact} />
      </Container>
    )
  }
}
export default App;