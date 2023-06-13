
import Image from "next/image"
import { ICONS } from "./Theme"
import defaultPic from '../../public/defaultVideoThumb.png'


export default function VideoFullWidth(props) {
    const { 
        url, 
        videoThumbnail, 
        openModal,
    } = props

    const playButton = ICONS['play']

    // defaultPic is blue bg with white arnot health logo
    const thumb = videoThumbnail ? videoThumbnail : defaultPic

    return (
        <div onClick={() => openModal(url)} className='w-full h-full relative block overflow-hidden rounded-md hover:cursor-pointer group'>
            <Image 
                src={thumb} alt='video thumbnail'
                width={1152} height={800}
                className='object-cover group-hover:scale-105 transition ease-in-out duration-500 aspect-video' 
            />
            <div className='absolute top-0 bottom-0 left-0 right-0 flex justify-center items-center'>
                <Image 
                    src={playButton} alt='play button'
                    className='w-20 lg:w-24 aspect-square lg:opacity-90 group-hover:opacity-100 transition ease-in-out duration-500 bg-gray-800/20 rounded-full border-2 border-white' 
                />
            </div>
        </div>
    )
}