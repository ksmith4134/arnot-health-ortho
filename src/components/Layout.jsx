import Header from '@/components/nav/Header'
import Footer from '@/components/nav/Footer';
import { Open_Sans } from 'next/font/google';

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
