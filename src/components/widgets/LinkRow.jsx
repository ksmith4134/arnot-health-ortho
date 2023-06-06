import { BODY_ICONS } from '../Theme'
import Image from 'next/image'
import { useRouter } from 'next/router'

export default function LinkRow() {

    const router = useRouter()

    const bodyIcons = Object.entries(BODY_ICONS).map(([label, icon]) => ({label, icon}));

    return (
        <div className='grid grid-cols-2 md:grid-cols-3 gap-8'>
            { bodyIcons.map((item, index) => (
                <div 
                    key={index}
                    onClick={() => router.push('#body-diagram')}
                    className='border border-arnotBlue/30 rounded-lg px-4 py-4 bg-arnotBlue/5 hover:bg-arnotBlue/10 hover:cursor-pointer'
                >
                    <div className='text-arnotBlue flex flex-row justify-start items-center'>
                        <Image 
                            src={`${item.icon.src}`} 
                            width={item.icon.width} 
                            height={item.icon.height} 
                            alt='icon' 
                            className='w-12 opacity-80' 
                        />
                        <p className='ml-4'>
                            { 
                                item.label.split('-').map(item => item.charAt(0).toUpperCase()+item.slice(1)).join(' / ') 
                            }
                        </p>
                    </div>
                </div>
            ))}
        </div>
    )
}
