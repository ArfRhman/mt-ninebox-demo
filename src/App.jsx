import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { Button, Card, Container, Row, Col } from "react-bootstrap";
import NineBoxGrid from './pages/NineBoxGrid';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Container>
      <h1 className="text-center mb-3">MT - 9 Box Demo</h1>
      <hr/>
      <NineBoxGrid />
    </Container>
  )
}

export default App
