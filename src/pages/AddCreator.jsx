import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../client'

export default function AddCreator() {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: '',
    url: '',
    description: '',
    imageURL: '',
  })

  const [saving, setSaving] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setErrorMsg('')

  
    if (!form.name.trim() || !form.url.trim() || !form.description.trim()) {
      setErrorMsg('Name, URL, and description are required.')
      setSaving(false)
      return
    }

    const { error } = await supabase.from('creators').insert([
      {
        name: form.name.trim(),
        url: form.url.trim(),
        description: form.description.trim(),
        imageURL: form.imageURL.trim() || null,
      },
    ])

    if (error) {
      setErrorMsg(error.message)
      setSaving(false)
      return
    }

    navigate('/')
  }

  return (
    <section>
      <h1>Add Creator</h1>

      <form onSubmit={handleSubmit} style={{ maxWidth: '500px', margin: '0 auto' }}>
        <label>
          Name
          <input name="name" value={form.name} onChange={handleChange} required />
        </label>

        <label>
          URL
          <input name="url" type="url" value={form.url} onChange={handleChange} required />
        </label>

        <label>
          Description
          <textarea name="description" value={form.description} onChange={handleChange} required />
        </label>

        <label>
          Image URL (optional)
          <input name="imageURL" type="url" value={form.imageURL} onChange={handleChange} />
        </label>

        {errorMsg && <p style={{ color: '#d32f2f' }}>Error: {errorMsg}</p>}

        <button type="submit" disabled={saving}>
          {saving ? 'Saving...' : 'Create'}
        </button>
      </form>
    </section>
  )
}
