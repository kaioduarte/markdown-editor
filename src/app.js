'use strict'

import React, { Component } from 'react'
import { v4 } from 'uuid'
import marked from 'marked'

import MarkdownEditor from 'views/markdown-editor'

import('highlight.js').then(hljs => {
  marked.setOptions({
    highlight: (code, lang) => {
      if (lang && hljs.getLanguage(lang)) {
        return hljs.highlightAuto(code, lang).value
      }

      return hljs.highlightAuto(code).value
    }
  })
})

class App extends Component {
  constructor () {
    super()

    this.clearState = () => ({
      id: v4(),
      value: '',
      title: ''
    })

    this.state = {
      ...this.clearState(),
      files: {},
      isSaving: null
    }

    this.handleChange = (field) => (e) => {
      this.setState({
        [field]: e.target.value,
        isSaving: true
      })
    }

    this.getMarkup = () => ({
      __html: marked(this.state.value)
    })

    this.handleSave = () => {
      if (this.state.isSaving) {
        const { id, value, title } = this.state
        const files = {
          ...this.state.files,
          [id]: {
            title: title || 'Sem título',
            content: value
          }
        }

        localStorage.setItem('markdown-editor', JSON.stringify(files))
        this.setState({ isSaving: false, files })
      }
    }

    this.createNew = () => {
      this.setState(this.clearState())
      this.textarea.focus()
    }

    this.handleRemove = () => {
      const { [this.state.id]: id, ...files } = this.state.files
      localStorage.setItem('markdown-editor', JSON.stringify(files))

      this.setState({ files })
      this.createNew()
    }

    this.handleCreate = () => {
      this.createNew()
    }

    this.textareaRef = (node) => {
      this.textarea = node
    }

    this.openFile = (id) => () => {
      const { files } = this.state

      this.setState({
        id,
        value: files[id].content,
        title: files[id].title
      })
    }
  }

  componentDidMount () {
    const files = JSON.parse(localStorage.getItem('markdown-editor')) || {}
    this.setState({ files })
  }

  componentDidUpdate () {
    clearInterval(this.timer)
    this.timer = setTimeout(this.handleSave, 500)
  }

  componentWillUnmount () {
    clearInterval(this.timer)
  }

  render () {
    const { id, files, value, title, isSaving } = this.state

    return (
      <MarkdownEditor
        value={value}
        handleChange={this.handleChange}
        getMarkup={this.getMarkup}
        isSaving={isSaving}
        handleRemove={this.handleRemove}
        handleCreate={this.handleCreate}
        textareaRef={this.textareaRef}
        openFile={this.openFile}
        files={files}
        selectedFile={id}
        title={title}
      />
    )
  }
}

export default App
