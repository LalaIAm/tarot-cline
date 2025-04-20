import { Link } from "react-router-dom";
import { Button } from "./Button";
import { MoonIcon, SunIcon, MenuIcon } from 'lucide-react'
import { useState } from 'react' 

const Header = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <header className='py-4 border-b bg-background/80 backdrop-blur-sm fixed top-0 left-0 right-0 z-50'>
            <div className='container flex items-center justify-between'>
                <Link to='/' className='flex items-center gap-2'>
                <span className='text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 text-transparent bg-clip-text'>TarotLyfe</span></Link>
            </div>
        </header>
    )
}