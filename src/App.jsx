import { useRoutes, Link } from 'react-router-dom'
import ShowCreators from './pages/ShowCreators'
import ViewCreator from './pages/ViewCreator'
import AddCreator from './pages/AddCreator'
import EditCreator from './pages/EditCreator'

export default function App() {
  const element = useRoutes([
    { path: '/', element: <ShowCreators /> },
    { path: '/creator/:id', element: <ViewCreator /> },
    { path: '/new', element: <AddCreator /> },
    { path: '/edit/:id', element: <EditCreator /> },
  ])

  return (
    <>
      <header>
        <hgroup>
          <h1><Link to="/">Creatorverse</Link></h1>
        </hgroup>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/new">Add Creator</Link></li>
          </ul>
        </nav>
      </header>

      <main>
        {element}
      </main>
    </>
  )
}