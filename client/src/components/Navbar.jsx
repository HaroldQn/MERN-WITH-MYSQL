import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div className='bg-zinc-700 p-4 flex justify-between px-20 py-4'>
      <Link to="/" className='text-md text-white font-bold'>
        <h1>React MySQL</h1>
      </Link>


      <ul className='flex gap-x-2'>
        <li>
          <Link to="/" className='bg-slate-200 px2 py-1'>Home</Link>
        </li>
        <li>
          <Link to="/new" className='bg-teal-200 px2 py-1'>Create Tasks</Link>
        </li>
      </ul>
    </div>
  )
}

export default Navbar
