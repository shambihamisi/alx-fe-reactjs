import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx' 
import Home from './components/Home.jsx'
import About from './components/About.jsx'
import Services from './components/Services.jsx'
import Contact from './components/Contact.jsx'

const appStyle = {
  fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif',
  lineHeight: 1.6,
  color: '#0b1b2a',
  background: '#f8fafc',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column'
}

const containerStyle = {
  maxWidth: 960,
  width: '100%',
  margin: '0 auto',
  padding: '24px'
}

function App() {
  return (
    <div style={appStyle}>
      <Navbar />
      <main style={containerStyle}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
