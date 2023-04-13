import { Open_Sans } from 'next/font/google';
import Header from './Header';
import Footer from './Footer';

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
