import Header from "./Nav/Header"
import Footer from "./Nav/Footer"
import { Open_Sans } from 'next/font/google'
import Breadcrumbs from "./Nav/Breadcrumbs"

const openSans = Open_Sans({
    subsets: ['latin'],
    variable: '--font-openSans',
})

export default function Layout({children}) {
  return (
    <div className={`${openSans.variable} font-sans`}>
        <Header />
        <Breadcrumbs />
        { children }
        <Footer />
    </div>
  )
}
