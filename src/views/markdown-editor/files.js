import React from 'react'
import PropTypes from 'prop-types'

const Files = ({ files, selectedFile, openFile }) => (
  <div className='file-list-container'>
    <h2 className='file-list-title'>Arquivos</h2>
    <ul className='file-list'>
      {Object.keys(files).map(fileId => (
        <li
          key={fileId}
          className={`file-list-item ${selectedFile === fileId ? 'selected' : ''}`}
          onClick={openFile(fileId)}
        >
          {files[fileId].title}
        </li>
      )
      )}
    </ul>
  </div>
)

Files.propTypes = {
  files: PropTypes.shape({
    title: PropTypes.string,
    content: PropTypes.string
  }),
  openFile: PropTypes.func.isRequired
}

export default Files
