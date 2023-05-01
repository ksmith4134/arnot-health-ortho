import Image from 'next/image';
import Link from 'next/link';
import Logo from '../../public/svg/Logo.svg';
import { RxHamburgerMenu, RxCaretDown } from 'react-icons/rx';
import { forwardRef } from 'react';
import SubMenu from './navigation/SubMenu';

const Header = forwardRef(function Header(props, ref) {

    const {
        opened,
        handleClick
    } = props

    return (
        <div className='w-full bg-white'> {/* sticky top-0 z-10 */}
            <div className='max-w-5xl mx-auto px-8 py-4 flex flex-row justify-between items-center md:items-end'>

                {/* LOGO */}
                <Link href="/" className='flex-none'>
                    <Image src={Logo} alt="logo" className='w-40 lg:w-48' />
                </Link>

                <div className='hidden md:flex flex-col items-end justify-between mb-2 -mr-6'>

                    {/* TEMPORARY LINK: USED DURING DEV */}
                    <Link className='mb-1 px-4 text-sm text-arnotPeach font-semibold' href={'/tests/component-reference'}>Components Reference</Link>

                    {/* MAIN NAV LINKS */}
                    <div className='hidden md:flex justify-start items-center'>
                        
                        <Link href={'/'} className='hidden lg:block px-4 last:mr-0 mr-3 py-2 text-md text-arnotBlue font-semibold hover:underline hover:underline-offset-8 hover:decoration-arnotBrown/50'>Home</Link>

                        { nav.map(item => (
                            <div key={item.id} className='px-4 last:mr-0 mr-3 py-2 relative hover:underline hover:underline-offset-8 hover:decoration-arnotBrown/50'>
                                <div className='flex items-center space-x-2  text-arnotBlue hover:cursor-pointer' onClick={() => handleClick(item.id)}>
                                    <div className='text-md font-semibold'>{item.label}</div>
                                    <RxCaretDown className={`${opened === item.id ? 'rotate-180' : ''} transition ease-in-out duration-200`} />
                                </div>
                                { opened === item.id && 
                                    <SubMenu ref={ref} subMenu={item.subMenu} closeMenu={handleClick} />
                                }
                            </div>
                        ))}

                        <Link href={'/team'} className='px-4 last:mr-0 mr-3 py-2 text-md font-semibold text-arnotBlue hover:underline hover:underline-offset-8 hover:decoration-arnotBrown/50'>Our Team</Link>

                        <Link href={'/contact'} className='px-4 last:mr-0 mr-3 py-2 text-md font-semibold text-arnotBlue hover:underline hover:underline-offset-8 hover:decoration-arnotBrown/50'>Contact</Link>

                    </div>
                </div>
                <div className='block md:hidden'>
                    <RxHamburgerMenu className='text-3xl' />
                </div>
            </div>
        </div>
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
            linkLabel: 'Patient Portal',
            linkUrl: 'https://www.arnothealth.org/myarnothealth',
            target: '_blank',
            linkIcon: 'stethoscope',
        }
    },
    {
        id: 2, 
        label: 'Professionals',
        subMenu: {
            slug: '?index=All%20Resources',
            title: 'Rehab & Discharge Protocols',
            linkLabel: 'See All',
            linkUrl: '/professional-resources',
            target: '',
            linkIcon: null,
        }
    },
]