import React from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
import defaultPic from '../../public/Same Day Surgery Tour.jpg'
import { ICONS } from './Theme'

export default function SideVideo(props) {

    // asset has a type (component name), icon, url, and title
    const {
        asset = {}, 
        title = '', 
        description = '', 
        videoUrl = 'https://www.youtube.com/watch?v=uUmAUxWFYCw', 
        image = '',
        handleClick = () => console.log('Video modal open')
    } = props

    const router = useRouter()

    const AssetIcon = (asset && asset.icon) && ICONS[asset.icon]
    const playButton = ICONS['play']

    // update the defaultPic to blue bg with arnot health logo
    const videoThumbnail = image ? image : defaultPic

    return (
        <div className="flex md:flex-row flex-col justify-center items-center md:space-x-8">
            <div className="basis-7/12">
                <h2 className="text-2xl">{title}</h2>
                <p className="mt-2 text-sm">{description}</p>
                {
                    asset && (
                        <Link href={asset.url ? asset.url : router.asPath} className="mt-4 flex items-center space-x-2">
                            {AssetIcon && <AssetIcon className="text-red-500 text-3xl" />}
                            {asset.title && <p className="text-sm font-semibold">{asset.title}</p>}
                        </Link>
                    )
                }
            </div>
            <div className="basis-5/12 mt-4 md:mt-0">
                <div onClick={() => handleClick(videoUrl)} className="aspect-video relative block overflow-hidden hover:cursor-pointer group">
                    <Image 
                        src={videoThumbnail}
                        alt="video thumbnail"
                        className="object-cover rounded-sm group-hover:scale-105 transition ease-in-out duration-500" 
                    />
                    <div className="absolute top-0 bottom-0 left-0 right-0 flex justify-center items-center">
                        <Image 
                            src={playButton} 
                            alt="play button"
                            className="w-24 h-24 md:w-16 md:h-16 lg:w-20 lg:h-20 md:opacity-80 group-hover:opacity-100 transition ease-in-out duration-500" 
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
