import React from 'react'
import styled from 'styled-components'
const List = styled.ul`
  padding-left: 0;
  list-style: none;
  max-width: 480px;
`
const Delete = styled.button`

`
const Item = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 6px 0;
  border-bottom: 1px solid #eee;
`
export default function ContactList({ contacts, onDelete }) {
  return (
    <List>
      {contacts.map(c => (
        <Item key={c.id}>
          <span>{c.name}: {c.number}</span>
          <Delete type="button" style={{ background: 'red', fontSize: '25px' }} onClick={() => onDelete(c.id)}>-</Delete>
        </Item>
      ))}
    </List>
  )
}