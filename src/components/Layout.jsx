import Header from "./nav/Header";
import Footer from "./nav/Footer";
import { Open_Sans } from 'next/font/google';
import Breadcrumbs from "./nav/Breadcrumbs";

const openSans = Open_Sans({
    subsets: ['latin'],
    variable: '--font-openSans',
})

export default function Layout({children}) {
  return (
    <div className={`${openSans.variable} font-sans`}>
        <Header />
        { children }
        <Footer />
    </div>
  )
}
