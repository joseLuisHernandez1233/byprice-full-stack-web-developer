import React from 'react'
import { render } from 'react-dom'
import SentenceContainer from './components/sentence.container'

const rootEl = document.getElementById('SentenceContainer')

render(<SentenceContainer />, rootEl)

if (module.hot) module.hot.accept()
