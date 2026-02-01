import React, { useContext } from 'react'
import styled from 'styled-components'

const Label = styled.label`
  display: block;
  margin: 12px 0;
`
const Input = styled.input`
  margin-top: 6px;
  padding: 6px;
`
export default function Filter({ Ctx }) {
  const { filter, setFilter } = useContext(Ctx)
  return (
    <Label>
      Знайдіть контакт через ім'я
      <Input type="text" value={filter} onChange={(e) => setFilter(e.target.value)} />
    </Label>
  )
}