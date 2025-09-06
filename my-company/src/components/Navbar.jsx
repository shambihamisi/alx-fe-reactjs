import { Link } from 'react-router-dom'


const barStyle = {
  maxWidth: 960,
  margin: '0 auto',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
}

const brandStyle = {
  fontWeight: 700,
  fontSize: 20,
  letterSpacing: 0.3,
  color: '#fff',
  textDecoration: 'none'
}

const linkWrapStyle = {
  display: 'flex',
  gap: 12
}

const linkStyle = {
  color: '#fff',
  textDecoration: 'none',
  padding: '8px 12px',
  borderRadius: 8,
  background: 'transparent'
}

const linkStyleHover = {
  ...linkStyle,
  background: 'rgba(255, 255, 255, 0.1)'
}

function NavLink({ to, children }) {
  // a tiny inline “hover” effect with onMouse events
  const base = { ...linkStyle }
  let current = { ...base }
  return (
    <Link
      to={to}
      style={current}
      onMouseEnter={(e) => Object.assign(e.currentTarget.style, linkStyleHover)}
      onMouseLeave={(e) => Object.assign(e.currentTarget.style, linkStyle)}
    >
      {children}
    </Link>
  )
}

function Navbar() {
  return (
    <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 10,
        backgroundColor: '#0b1b2a',
        color: '#fff',
        padding: '12px 24px',
        boxShadow: '0 2px 12px rgba(0,0,0,.1)',
      }}>
      <div style={barStyle}>
        <Link to="/" style={brandStyle}>MyCompany</Link>
        <nav style={linkWrapStyle}>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/services">Services</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
