import React, { useState } from 'react'
import {
  Form,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  FormInput,
} from 'shards-react'

export default () => {
  const [sarchValue, setSearchValue] = useState(null)

  return (
    <Form className="main-navbar__search w-100 d-none d-md-flex d-lg-flex">
      <InputGroup seamless className="ml-3">
        <InputGroupAddon type="prepend">
          <InputGroupText>
            <i className="material-icons">search</i>
          </InputGroupText>
        </InputGroupAddon>
        <FormInput
          onChange={e => setSearchValue(e.target.value)}
          className="navbar-search"
          placeholder="Search for an option..."
        />
      </InputGroup>
    </Form>
  )
}
