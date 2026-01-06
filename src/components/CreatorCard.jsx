import { Link } from 'react-router-dom'

export default function CreatorCard({ creator }) {
  return (
    <article>
      {creator.imageURL && (
        <img src={creator.imageURL} alt={creator.name} style={{ width: '100%', height: '160px', objectFit: 'cover' }} />
      )}

      <h3>{creator.name}</h3>

      <a href={creator.url} target="_blank" rel="noreferrer">
        Visit channel
      </a>

      <p>{creator.description}</p>

      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <Link to={`/creator/${creator.id}`} role="button" className="outline">Details</Link>
        <Link to={`/edit/${creator.id}`} role="button" className="outline">Edit</Link>
      </div>
    </article>
  )
}
