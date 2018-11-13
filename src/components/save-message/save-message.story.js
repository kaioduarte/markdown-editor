'use strict'

import React from 'react'
import { storiesOf } from '@storybook/react'

import SaveMessage from 'components/save-message'

const stories = storiesOf('SaveMessage', module)

stories.addDecorator(story => (
  <div style={{ background: '#ccc' }}>
    Mensagem: "{story()}"
  </div>
))

stories.add('isSaving === null', () => (
  <SaveMessage isSaving={null} />
))

stories.add('isSaving === false', () => (
  <SaveMessage isSaving={false} />
))

stories.add('isSaving === true', () => (
  <SaveMessage isSaving />
))
