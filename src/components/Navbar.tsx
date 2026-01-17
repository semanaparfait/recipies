import { Link } from 'react-router-dom'
import Button from './Button'

function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 cursor-pointer">
          <span className="text-3xl">🍳</span>
          <span className="text-2xl font-bold text-orange-600">RecipeApp</span>
        </Link>
        <div>
          <Link to="/account">
            <Button variant="primary">
              My Account
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar