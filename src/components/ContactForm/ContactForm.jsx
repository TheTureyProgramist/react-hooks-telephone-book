import React, { useState } from 'react'
import styled from 'styled-components'
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 320px;
  border: 1px solid transparent;
  border-radius: 4px;
  transition: box-shadow 120ms ease, border-color 120ms ease;
  &:hover {
    border: 1px solid green;
    box-shadow: 0 0 0 3px rgba(0,128,0,0.05);
  }
`
const Label = styled.label`
  display: flex;
  flex-direction: column;
  font-size: 14px;
`
const Input = styled.input`
  padding: 6px;
  font-size: 14px;
`
const Button = styled.button`
  width: 140px;
  padding: 6px;
  cursor: pointer;
  background: yellow;
  position: relative;
  overflow: hidden;
  transition: color 120ms ease;
  &::after {
    content: '+';
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
    transition: opacity 120ms ease, transform 120ms ease;
    pointer-events: none;
    z-index: 1;
    font-size: 18px;
    color: #000;
  }
  &:hover {
    color: transparent;
    background-color: skyblue;
  }
  &:hover::after {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1.05);
  }
`
export default function ContactForm({ onAdd }) {
  const [name, setName] = useState('')
  const [number, setNumber] = useState('')
  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmed = name.trim()
    if (!trimmed) return
    const newContact = { name: trimmed, number }
    const added = onAdd(newContact)
    if (added) {
      setName('')
      setNumber('')
    }
  }
  return (
    <Form onSubmit={handleSubmit}>
      <Label>
        Ім'я
        <Input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          placeholder="Введіть ім'я та прізвище"
          required
        />
      </Label>
      <Label>
        Номер
        <Input
          type="tel"
          name="number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          pattern="\\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          placeholder="Введіть номер телефону"
          required
        />
      </Label>
      <Button type="submit">Додати контакт</Button>
    </Form>
  )
}