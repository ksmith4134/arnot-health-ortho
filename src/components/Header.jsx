import Image from 'next/image';
import Link from 'next/link';
import Logo from '../../public/svg/Logo.svg';
import { RxHamburgerMenu, RxCaretDown, RxCross1 } from 'react-icons/rx';
import { forwardRef } from 'react';
import DesktopSubMenu from './navigation/DesktopSubMenu';
import MobileSubMenu from './navigation/MobileSubMenu';

const Header = forwardRef(function Header(props, ref) {

    const {
        subMenu,
        toggleSubMenu,
        mobileMainMenu,
        toggleMobileMainMenu,
    } = props

    return (
        <nav className='w-full bg-white sticky z-10 top-0 md:relative'> {/* sticky top-0 z-10 */}
            <div className='max-w-5xl mx-auto px-8 py-4 flex flex-row justify-between items-center md:items-end'>

                {/* LOGO */}
                <Link href="/" className='flex-none'>
                    <Image src={Logo} alt="logo" className='w-40 lg:w-48' />
                </Link>

                <div className='hidden md:flex flex-col items-end justify-between mb-2 -mr-6'>

                    {/* TEMPORARY LINK: USED DURING DEV */}
                    <Link className='mb-1 px-4 text-sm text-arnotPeach font-semibold' href={'/tests/component-reference'}>Components Reference</Link>

                    {/* DESKTOP: MAIN NAV LINKS */}
                    <div className='hidden md:flex justify-start items-center'>
                        
                        <Link href={'/'} className='hidden lg:block px-4 last:mr-0 mr-3 py-2 text-md text-arnotBlue font-semibold hover:underline hover:underline-offset-8 hover:decoration-arnotBlue/50'>Home</Link>

                        { nav.map(item => (
                            <div key={item.id} className='px-4 last:mr-0 mr-3 py-2 relative hover:underline hover:underline-offset-8 hover:decoration-arnotBlue/50'>
                                <div className='flex items-center space-x-2 text-arnotBlue hover:cursor-pointer' onClick={() => toggleSubMenu(item.id)}>
                                    <div className='text-md font-semibold'>{item.label}</div>
                                    <RxCaretDown className={`${subMenu === item.id ? 'rotate-180' : ''} transition ease-in-out duration-200`} />
                                </div>
                                { subMenu === item.id && 
                                    <DesktopSubMenu ref={ref} subMenu={item.subMenu} closeMenu={toggleSubMenu} />
                                }
                            </div>
                        ))}

                        <Link href={'/team'} className='px-4 last:mr-0 mr-3 py-2 text-md font-semibold text-arnotBlue hover:underline hover:underline-offset-8 hover:decoration-arnotBlue/50'>Our Team</Link>

                        <Link href={'/contact'} className='px-4 last:mr-0 mr-3 py-2 text-md font-semibold text-arnotBlue hover:underline hover:underline-offset-8 hover:decoration-arnotBlue/50'>Contact</Link>

                    </div>
                </div>
                
                {/* MOBILE: MAIN NAV LINKS */}
                <div className='block md:hidden'>
                    { mobileMainMenu ? 
                        <RxCross1 className='text-3xl hover:cursor-pointer' onClick={toggleMobileMainMenu} />
                     : 
                        <RxHamburgerMenu className='text-3xl hover:cursor-pointer' onClick={toggleMobileMainMenu} />
                    }
                </div>
            </div>

            { mobileMainMenu && 
                <div className='absolute z-50 block md:hidden w-full h-full min-h-screen overflow-y-scroll px-8 py-6 bg-slate-50'>

                    <div className='flex flex-col'>
                        
                        <Link href={'/'} className='py-2 text-md text-arnotBlue font-semibold hover:underline hover:underline-offset-8 hover:decoration-arnotBlue/50' onClick={toggleMobileMainMenu}>Home</Link>

                        { nav.map(item => (
                            <div key={item.id} className='py-2'>
                                <div className='flex justify-between items-center text-arnotBlue hover:cursor-pointer' onClick={() => toggleSubMenu(item.id)}>
                                    <div className='text-md font-semibold'>{item.label}</div>
                                    <RxCaretDown className={`text-xl ${subMenu === item.id ? 'rotate-180' : ''} transition ease-in-out duration-200`} />
                                </div>
                                { subMenu === item.id && 
                                    <MobileSubMenu ref={ref} subMenu={item.subMenu} closeMenu={toggleSubMenu} toggleMobileMainMenu={toggleMobileMainMenu} />
                                }
                            </div>
                        ))}

                        <Link href={'/all-resources'} className='py-2 text-md font-semibold text-arnotBlue hover:underline hover:underline-offset-8 hover:decoration-arnotBlue/50' onClick={toggleMobileMainMenu}>All Resources</Link>

                        <Link href={'/team'} className='py-2 text-md font-semibold text-arnotBlue hover:underline hover:underline-offset-8 hover:decoration-arnotBlue/50' onClick={toggleMobileMainMenu}>Our Team</Link>

                        <Link href={'/contact'} className='py-2 text-md font-semibold text-arnotBlue hover:underline hover:underline-offset-8 hover:decoration-arnotBlue/50' onClick={toggleMobileMainMenu}>Contact</Link>

                    </div>
                </div>
            }
        </nav>
    )
})

export default Header;

const nav = [
    {
        id: 1, 
        label: 'Patients',
        subMenu: {
            slug: '?index=Background',
            title: 'Find My Condition',
            linkLabel: 'All Resources',
            linkUrl: '/all-resources',
            target: '',
            linkIcon: 'stethoscope',
        }
    },
    {
        id: 2, 
        label: 'Professionals',
        subMenu: {
            slug: '?index=All%20Resources',
            title: 'Rehab & Discharge Protocols',
            linkLabel: 'All Resources',
            linkUrl: '/all-resources',
            target: '',
            linkIcon: 'stethoscope',
        }
    },
]