import { useState } from 'react'

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Form submitted!')
    // optional: clear the form
    setFormData({ name: '', email: '', message: '' })
  }

  const fieldStyle = { display: 'block', margin: '10px 0', padding: '10px', width: '100%', maxWidth: 480 }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Contact Us</h1>
      <form onSubmit={handleSubmit} noValidate>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          style={fieldStyle}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          style={fieldStyle}
          required
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          style={{ ...fieldStyle, height: 120, resize: 'vertical' }}
          required
        />
        <button
          type="submit"
          style={{
            padding: '10px 16px',
            borderRadius: 8,
            border: 'none',
            background: '#0b1b2a',
            color: 'white',
            cursor: 'pointer'
          }}
        >
          Send Message
        </button>
      </form>
    </div>
  )
}

export default Contact
