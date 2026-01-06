import { useEffect, useState } from 'react'
import { supabase } from '../client'
import CreatorCard from '../components/CreatorCard'

export default function ShowCreators() {
  const [creators, setCreators] = useState([])
  const [loading, setLoading] = useState(true)
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    const fetchCreators = async () => {
      setLoading(true)
      setErrorMsg('')

      const { data, error } = await supabase
        .from('creators')
        .select('*')
        .order('id', { ascending: true })

      if (error) {
        setErrorMsg(error.message)
        setCreators([])
      } else {
        setCreators(data ?? [])
      }

      setLoading(false)
    }

    fetchCreators()
  }, [])

  if (loading) return <p>Loading creators...</p>
  if (errorMsg) return <p className="error">Error: {errorMsg}</p>

  return (
    <section>
      <h1>Top Creators</h1>

      {creators.length === 0 ? (
        <p>No creators yet. Click "Add Creator".</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
          {creators.map((c) => (
            <CreatorCard key={c.id} creator={c} />
          ))}
        </div>
      )}
    </section>
  )
}
