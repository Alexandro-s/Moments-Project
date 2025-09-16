import { useState } from 'react'
import './Navbar.css'
import { IoMdMenu, IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom"
import imgLogo from "../assets/logo.jpg"

const Navebar = () => {
    const [showmenu, setShowmenu] = useState(false)

    const toggleMenu = () => {
        setShowmenu(!showmenu);
    }

    return (
        <header>

            <div className="logo-container">
                 <img src={imgLogo} alt="" className='logo' />
                 <h2><Link to={"/"}>Memories</Link></h2>
            </div>
            {/* Menu sanduíche lateral */}
            <nav className={`menu-sadwich ${showmenu ? "show" : ""}`}>
                <ul className='nave-list'>
                    <li><Link to={"/"} onClick={toggleMenu}>Home</Link></li>
                    <li><Link to={"/add-memory"} onClick={toggleMenu}>Add Memory</Link></li>
                    <li><Link to={"/"} onClick={toggleMenu}>Edit Memory</Link></li>
                </ul>            
            </nav>

            {/* Botão do menu */}
            <div className="btn-sadwich" onClick={toggleMenu}>
                {showmenu ? <IoMdClose /> : <IoMdMenu />}
            </div>
        </header>
    )
}

export default Navebar;
