import React, { useContext } from 'react'
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
export default function ContactList({ Ctx }) {
  const { contacts, deleteContact, filter } = useContext(Ctx)
  const normalized = filter.trim().toLowerCase()
  const visible = !normalized ? contacts : contacts.filter(c => c.name.toLowerCase().includes(normalized))

  return (
    <List>
      {visible.map(c => (
        <Item key={c.id}>
          <span>{c.name}: {c.number}</span>
          <Delete type="button" style={{ background: 'red', fontSize: '25px' }} onClick={() => deleteContact(c.id)}>-</Delete>
        </Item>
      ))}
    </List>
  )
}