import Image from 'next/image'
import { ICONS } from './Theme'

export default function ProfilePic(props) {
    const {
        url = '',
    } = props

    const PlaceholderPic = ICONS['profile']

    return (
        <div className='w-24 h-24 rounded-full relative overflow-hidden'>
            { url 
                ? <Image src={url} alt="profile picture" fill quality={100} priority className='object-cover' />
                : <PlaceholderPic className='w-full h-full text-arnotBlue/80' />
            }
        </div>
    )
}
