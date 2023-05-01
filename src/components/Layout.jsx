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

    const [ opened, setOpened ] = useState(null)
    const ref = useRef(null)

    const openMenu = (id) => {
        id === opened ? setOpened(null) : setOpened(id)
    }

    const closeMenus = (e) => {
        if(ref.current && opened && !ref.current.contains(e.target)){
            setOpened(null)
        }
    }

    return (
        <NavProvider>
            <div className={`${openSans.variable} font-sans relative`} onClick={closeMenus}>
                <Header ref={ref} opened={opened} handleClick={openMenu} />
                    { children }
                <Footer />
            </div>
        </NavProvider>
    )
}
