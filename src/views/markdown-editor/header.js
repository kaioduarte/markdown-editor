import React from 'react'
import PropTypes from 'prop-types'

import Button from 'components/button'
import SaveMessage from 'components/save-message'

const MarkdownEditorHeader = ({ title, isSaving, handleChange, handleCreate, handleRemove }) => {
  return (
    <header className='editor-header'>
      <input
        type='text'
        value={title}
        placeholder='Sem título'
        onChange={handleChange('title')}
      />
      <SaveMessage isSaving={isSaving} />

      <Button kind='sucess' onClick={handleCreate}>
        Criar novo
      </Button>

      <Button kind='danger' onClick={handleRemove}>
        Remover
      </Button>
    </header>
  )
}

MarkdownEditorHeader.propTypes = {
  title: PropTypes.string,
  handleRemove: PropTypes.func.isRequired,
  handleCreate: PropTypes.func.isRequired
}

export default MarkdownEditorHeader
