import { Open_Sans } from 'next/font/google';
import { NavProvider } from "./NavProvider";
import { useState, useRef } from 'react';
import Header from './Header';
import Footer from './Footer';

const openSans = Open_Sans({
    subsets: ['latin'],
    variable: '--font-openSans',
})

export default function Layout({ children }) {

    const [ subMenu, setSubMenu ] = useState(null)
    const [ mobileMainMenu, setMobileMainMenu ] = useState(false)
    const ref = useRef(null)

    const toggleSubMenu = (id) => {
        id === subMenu ? setSubMenu(null) : setSubMenu(id)
    }

    const toggleMobileMainMenu = () => {
        setMobileMainMenu(!mobileMainMenu)
    }

    const closeMenus = (e) => {
        if(ref.current && subMenu && !ref.current.contains(e.target)){
            setSubMenu(null)
        }
    }

    return (
        <NavProvider>
            <div className={`${openSans.variable} font-sans relative`} onClick={closeMenus}>
                <Header 
                    ref={ref} 
                    subMenu={subMenu} 
                    toggleSubMenu={toggleSubMenu}
                    mobileMainMenu={mobileMainMenu}
                    toggleMobileMainMenu={toggleMobileMainMenu}
                />
                    { children }
                <Footer />
            </div>
        </NavProvider>
    )
}
