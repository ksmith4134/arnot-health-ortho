import { BODY_ICONS } from '../Theme'
import Image from 'next/image'
import Link from 'next/link';
import { useRouter } from 'next/router'

export default function IconCards() {

    const router = useRouter()

    const bodyIcons = Object.entries(BODY_ICONS).map(([label, icon]) => ({label, icon}));

    return (
        <div className='mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-8'>
            { bodyIcons.map((item, index) => (
                <Link 
                    key={index}
                    href='/#body-diagram'
                    scroll={false}
                    className='
                        mx-auto p-6 w-full h-full flex justify-center items-start md:items-center 
                        rounded-md text-center group border 
                        hover:shadow-lg hover:shadow-slate-50
                        hover:cursor-pointer transition-all duration-300'
                >
                    <div className='text-arnotBlue flex flex-col justify-center items-center'>
                        <Image 
                            src={`${item.icon.src}`} 
                            width={item.icon.width} 
                            height={item.icon.height} 
                            alt='icon' 
                            className='w-14 group-hover:scale-125 group-hover:translate-y-4 transition-all duration-300' 
                        />
                        <p className='mt-3 text-sm group-hover:opacity-0 transition-all duration-300'>
                            { 
                                item.label.split('-').map(item => item.charAt(0).toUpperCase()+item.slice(1)).join(' / ') 
                            }
                        </p>
                    </div>
                </Link>
            ))}
        </div>
    )
}
