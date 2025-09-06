const footerStyle = {
  marginTop: 'auto',
  background: '#0b1b2a',
  color: '#cbd5e1',
  padding: '16px 24px'
}

const contentStyle = {
  maxWidth: 960,
  margin: '0 auto',
  fontSize: 14
}

function Footer() {
  return (
    <footer style={footerStyle}>
      <div style={contentStyle}>
        © {new Date().getFullYear()} MyCompany — All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
