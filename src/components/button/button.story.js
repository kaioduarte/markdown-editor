'use strict'

import React from 'react'
import { storiesOf, action } from '@storybook/react'

import Button from 'components/button'

const stories = storiesOf('Button', module)

stories.addDecorator(story => (
  <div style={{ display: 'flex', height: 40 }}>
    {story()}
  </div>
))

stories.add('without theme', () => (
  <Button onClick={action('w/o theme')}>Sample</Button>
))

stories.add('Sucess theme', () => (
  <Button kind='sucess' onClick={action('sucess')}>Sucess</Button>
))

stories.add('Danger theme', () => (
  <Button kind='danger' onClick={action('danger')}>Danger</Button>
))
