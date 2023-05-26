import { ICONS, BODY_ICONS } from '../Theme'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'

export default function LinkRow(props) {

    const {
        body,
    } = props

    const router = useRouter()

    const bodyIcons = Object.keys(BODY_ICONS)
    const test = Object.values(BODY_ICONS).map(item => item.src)

    console.log('test', test)

    return (
        <div className='grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-8'>
            {bodyIcons.map((icon, index) => (
                <div key={index} className='border border-arnotBlue/30 rounded-lg p-4 hover:cursor-pointer hover:bg-arnotBlue/5 flex justify-center items-center'>
                    <div className='text-arnotBlue'>
                        <Image src={BODY_ICONS[icon]} alt='icon' className='w-14' />
                    </div>
                </div>
            ))}
        </div>
    )
}
