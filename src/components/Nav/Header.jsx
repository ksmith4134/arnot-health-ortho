import Image from 'next/image'
import Link from 'next/link'
import Logo from '../../../public/svg/Logo.svg'
import { useRouter } from 'next/router'

export default function Header() {

    const router = useRouter()

    return (
        <div className='w-full'>
            <div className='max-w-5xl mx-auto px-8 py-6 flex justify-between items-end'>
                <Link href="/">
                    <Image src={Logo} alt="logo" className='w-36' />
                </Link>
                <div className='flex justify-start items-center'>
                    {
                        nav.map((item) => (
                            <div key={item.id} className='pl-12 text-md text-arnotBlue font-semibold'>
                                { item.url
                                    ? <Link href={item.url}>{item.label}</Link>
                                    : <div>{item.label}</div>
                                }
                            </div>
                        ))
                    }
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