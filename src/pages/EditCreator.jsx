import { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { supabase } from '../client'

export default function EditCreator() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: '',
    url: '',
    description: '',
    imageURL: '',
  })

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    const loadCreator = async () => {
      setLoading(true)
      setErrorMsg('')

      const { data, error } = await supabase
        .from('creators')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        setErrorMsg(error.message)
      } else {
        setForm({
          name: data.name ?? '',
          url: data.url ?? '',
          description: data.description ?? '',
          imageURL: data.imageURL ?? '',
        })
      }

      setLoading(false)
    }

    loadCreator()
  }, [id])

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    setSaving(true)
    setErrorMsg('')

    const { error } = await supabase
      .from('creators')
      .update({
        name: form.name.trim(),
        url: form.url.trim(),
        description: form.description.trim(),
        imageURL: form.imageURL.trim() || null,
      })
      .eq('id', id)

    if (error) {
      setErrorMsg(error.message)
      setSaving(false)
      return
    }

    navigate(`/creator/${id}`)
  }

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Delete this creator?')
    if (!confirmDelete) return

    setSaving(true)
    setErrorMsg('')

    const { error } = await supabase.from('creators').delete().eq('id', id)

    if (error) {
      setErrorMsg(error.message)
      setSaving(false)
      return
    }

    navigate('/')
  }

  if (loading) return <p>Loading...</p>

  return (
    <section>
      <h1>Edit Creator</h1>

      <form onSubmit={handleUpdate} style={{ maxWidth: '500px', margin: '0 auto' }}>
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

        <div style={{ display: 'grid', gap: '0.5rem', justifyItems: 'stretch' }}>
          <button type="submit" disabled={saving} style={{ width: '100%' }}>
            {saving ? 'Saving...' : 'Update'}
          </button>

          <button type="button" onClick={handleDelete} disabled={saving} className="outline danger" style={{ width: '100%' }}>
            Delete
          </button>

          <Link to={`/creator/${id}`} role="button" className="outline" style={{ width: '100%' }}>
            Cancel
          </Link>
        </div>
      </form>
    </section>
  )
}
