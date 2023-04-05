import Image from 'next/image'
import Link from 'next/link'
import Logo from '../../../public/svg/Logo.svg'
import { FaAngleDown } from 'react-icons/fa'
import { RxHamburgerMenu } from 'react-icons/rx'
import { useRouter } from 'next/router'

export default function Header() {

    const router = useRouter()

    return (
        <div className='w-full border-b-[1px] shadow-md shadow-gray-200/20'> {/* md:border-none md:shadow-none */}
            <div className='max-w-5xl mx-auto px-8 py-6 flex justify-between items-center md:items-end'>
                <Link href="/" className='flex-none'>
                    <Image src={Logo} alt="logo" className='w-28 md:w-36' />
                </Link>
                <div className='hidden h-14 md:flex flex-col items-end justify-between space-y-2'>
                    <Link className='text-xs text-arnotPeach font-semibold' href={'/tests/component-reference'}>Components Reference</Link>
                    <div className='hidden md:flex justify-start items-center'>
                        {
                            nav.map((item) => (
                                <div key={item.id} className='pl-8 lg:pl-12 text-sm text-arnotBlue font-semibold'>
                                    { item.url
                                        ? <Link href={item.url}>{item.label}</Link>
                                        : <div>{item.label}</div>
                                    }
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className='block md:hidden'>
                    <RxHamburgerMenu className='text-3xl' />
                </div>
            </div>
        </div>
    )
}

export const nav = [
    {
        id: 0, 
        label: 'Home', 
        url: '/', 
        subMenu: null
    },
    {
        id: 1, 
        label: 'Patients', 
        url: null, 
        subMenu: {
            title: 'Find My Condition',
            headerLinkTitle: 'Patient Portal',
            headerLinkURL: 'https://www.arnothealth.org/myarnothealth',
            headerLinkIcon: 'stethoscope',
        }
    },
    {
        id: 2, 
        label: 'Professionals', 
        url: null,
        subMenu: {
            title: 'Rehab Protocols & Discharge Instructions',
            headerLinkTitle: 'See All',
            headerLinkURL: '/professional-resources',
            headerLinkIcon: null,
        }
    },
    {
        id: 3, 
        label: 'Our Team', 
        url: '/team', 
        subMenu: null
    },
    {
        id: 4, 
        label: 'Contact', 
        url: '/contact', 
        subMenu: null
    },
]