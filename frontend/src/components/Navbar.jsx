import './Navbar.css'

import { Link } from "react-router-dom"

const Navebar = () => {
    return <nav>
        <h2><Link to={"/"}>Memories</Link></h2>
        <ul>
            <li><Link to={"/"}>Home</Link></li>
            <li><Link to={"/add-memory"}>Add Memory</Link></li>
        </ul>
    </nav>
}

export default Navebar;