import React, { useState } from 'react'
import { ClipLoader } from 'react-spinners'
import {
  Form,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  FormInput,
} from 'shards-react'

export default ({ onSearch, loading = false }) => {
  return (
    <Form
      className="main-navbar__search w-100 d-none d-md-flex d-lg-flex"
      onSubmit={e => e.preventDefalt()}
    >
      <InputGroup seamless className="ml-3">
        <InputGroupAddon type="prepend">
          <InputGroupText>
            <i className="material-icons searchIcon">search</i>
            <ClipLoader size={15} color={'#007bff'} loading={loading} />
          </InputGroupText>
        </InputGroupAddon>
        <FormInput
          style={{ paddingLeft: 40 }}
          onChange={onSearch}
          className="navbar-search"
          placeholder="Search for an option..."
        />
      </InputGroup>
    </Form>
  )
}
