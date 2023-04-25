import Image from 'next/image'
import Link from 'next/link'
import Logo from '../../public/svg/Logo.svg'

export default function Footer() {
  return (
    <div className='w-full mt-12'>{/* border-t-[1px] shadow-[0_0_10px_rgba(0,0,0,0.1)] */}
        <div className='max-w-5xl mx-auto px-8 pt-16 pb-24'>
            <Link href="/">
                <Image src={Logo} alt="logo" className='w-36' />
            </Link>
        </div>
    </div>
  )
}
