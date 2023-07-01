import Image from 'next/image'
import Link from 'next/link'
import Logo from '../../public/svg/Logo.svg'
import { FaRegCopyright } from 'react-icons/fa'
import { AiFillPhone } from 'react-icons/ai'
import { useNavContext } from './NavProvider';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const { navDropdown } = useNavContext()

    return (
        <div className='w-full mt-12 border-t-[1px] bg-slate-50/50'>
            <div className='max-w-6xl mx-auto px-8 pt-12 pb-16'>
                <div className='flex flex-col md:flex-row md:flex-wrap md:justify-evenly items-start gap-8'>
                    <div>
                        <Link href="/">
                            <Image src={Logo} alt="logo" className='w-48 -ml-2' />
                        </Link>
                        <div className='mt-4 inline-flex items-center gap-2 text-sm'>
                            <FaRegCopyright className='text-sm' />
                            <p className='text-sm'>{currentYear}, All Rights Reserved</p>
                        </div>
                        <div className='mt-4 text-xs'>
                            <Link href={'https://www.arnothealth.org/about/corporate-compliance'} target='_blank' className='hover:underline'>Corporate Compliance</Link>
                        </div>
                        <div className='mt-2 text-xs'>
                            <Link href={'https://www.arnothealth.org/privacy'} target='_blank' className='hover:underline'>Privacy</Link>
                        </div>
                    </div>
                    <div className='mt-3.5'>
                        <p className='border-b border-black font-semibold pb-1'>Contact</p>
                        <div className='mt-4 text-sm flex flex-col gap-2'>
                            <p>300 Hoffman St.</p>
                            <p>Elmira, NY 14905</p>
                            <div className='inline-flex items-center mt-2'>
                                <AiFillPhone />
                                <p className='ml-2 text-sm'>(607) 734-4110</p>
                            </div>
                        </div>
                    </div>
                    <div className='mt-3.5'>
                        <p className='border-b border-black font-semibold pb-1'>Helpful Links</p>
                        <div className='mt-4 text-sm flex flex-col gap-2'>
                            <Link href='/contact' className='hover:underline'><p>Contact</p></Link>
                            <Link href='/team' className='hover:underline'><p>Our Team</p></Link>
                            <Link href='/#body-diagram' className='hover:underline'><p>Find My Condition</p></Link>
                            <Link href='/all-resources' className='hover:underline'><p>All Resources</p></Link>
                        </div>
                    </div>
                    <div className='mt-3.5'>
                        <p className='border-b border-black font-semibold pb-1'>Find My Condition</p>
                        <div className='mt-4 text-sm flex flex-col gap-2'>
                            { navDropdown.map(item => (
                                <Link key={item.bodyPart} href='/#body-diagram' className='hover:underline'><p>{item.bodyPart}</p></Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
