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
            { url ? 
                <Image 
                    src={url} 
                    alt="profile picture" 
                    fill={true}
                    priority={true}
                    sizes='10vw'
                    quality={100} 
                    className='object-cover' 
                /> : 
                <PlaceholderPic className='w-full h-full text-arnotBlue/80' />
            }
        </div>
    )
}
