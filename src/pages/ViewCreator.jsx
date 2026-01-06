import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { supabase } from '../client'

export default function ViewCreator() {
  const { id } = useParams()
  const [creator, setCreator] = useState(null)
  const [loading, setLoading] = useState(true)
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    const fetchCreator = async () => {
      setLoading(true)
      setErrorMsg('')

      const { data, error } = await supabase
        .from('creators')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        setErrorMsg(error.message)
        setCreator(null)
      } else {
        setCreator(data)
      }

      setLoading(false)
    }

    fetchCreator()
  }, [id])

  if (loading) return <p>Loading creator...</p>
  if (errorMsg) return <p style={{ color: '#d32f2f' }}>Error: {errorMsg}</p>
  if (!creator) return <p>Creator not found.</p>

  return (
    <article style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h1>{creator.name}</h1>

      {creator.imageURL && (
        <img src={creator.imageURL} alt={creator.name} style={{ width: '100%', maxHeight: '400px', objectFit: 'cover' }} />
      )}

      <p>{creator.description}</p>

      <p>
        <a href={creator.url} target="_blank" rel="noreferrer">
          {creator.url}
        </a>
      </p>

      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <Link to={`/edit/${creator.id}`} role="button">Edit</Link>
        <Link to="/" role="button" className="outline">Back</Link>
      </div>
    </article>
  )
}
