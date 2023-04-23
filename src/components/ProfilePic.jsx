import Image from 'next/image'
import { ICONS, PROFILE_PIC } from './Theme'

export default function ProfilePic(props) {
    const {
        url = '',
        size = 'medium'
    } = props

    const PlaceholderPic = ICONS['profile']

    const picSize = PROFILE_PIC.size[size]

    return (
        <div className={`${picSize} rounded-full relative overflow-hidden`}>
            { url 
                ? <Image src={url} alt="profile picture" fill quality={100} priority className='object-cover' />
                : <PlaceholderPic className='w-full h-full text-arnotBlue/80' />
            }
        </div>
    )
}
