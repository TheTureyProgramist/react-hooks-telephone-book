import React from 'react'
import styled from 'styled-components'
const Label = styled.label`
  display: block;
  margin: 12px 0;
`
const Input = styled.input`
  margin-top: 6px;
  padding: 6px;
`
export default function Filter({ filter, onChange }) {
  return (
    <Label>
      Знайдіть контакт через ім'я
      <Input type="text" value={filter} onChange={(e) => onChange(e.target.value)} />
    </Label>
  )
}