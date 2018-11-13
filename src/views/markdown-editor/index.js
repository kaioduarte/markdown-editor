import React from 'react'
import PropTypes from 'prop-types'

import Header from './header'
import Files from './files'

const MarkdownEditor = ({ value,
  handleChange,
  getMarkup,
  textareaRef,
  files,
  openFile,
  selectedFile,
  ...props }) =>
  (
    <section className='editor'>
      <Header handleChange={handleChange} {...props} />
      <Files files={files} selectedFile={selectedFile} openFile={openFile} />
      <textarea
        autoFocus
        value={value}
        onChange={handleChange('value')}
        ref={textareaRef}
      />
      <article
        className='view'
        dangerouslySetInnerHTML={getMarkup()}
      />
    </section>
  )

MarkdownEditor.propTypes = {
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  getMarkup: PropTypes.func.isRequired,
  textareaRef: PropTypes.func.isRequired
}

export default MarkdownEditor
