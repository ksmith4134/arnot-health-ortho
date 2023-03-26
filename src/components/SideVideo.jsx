import React from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
import defaultPic from '../../public/Same Day Surgery Tour.jpg'
import { ICONS } from './Theme'

export default function SideVideo(props) {

    // asset has a type (component), icon, url, and title
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
        <div className="flex flex-row justify-center items-center space-x-8">
            <div className="basis-1/2">
                <h2 className="text-2xl">{title}</h2>
                <p className="mt-2 text-sm">{description}</p>
                {
                    asset && (
                        <Link href={asset.url ? asset.url : router.asPath} className="mt-4 flex items-center space-x-2">
                            {AssetIcon && <AssetIcon className="text-arnotRed text-3xl" />}
                            {asset.title && <p className="text-sm font-semibold">{asset.title}</p>}
                        </Link>
                    )
                }
            </div>
            <div className="basis-1/2">
                <div onClick={() => handleClick(videoUrl)} className="aspect-video relative block overflow-hidden rounded-md hover:cursor-pointer group">
                    <Image 
                        src={videoThumbnail}
                        alt="video thumbnail"
                        className="object-cover rounded-sm group-hover:scale-105 transition ease-in-out duration-500" 
                    />
                    <div className="absolute top-0 bottom-0 left-0 right-0 flex justify-center items-center">
                        <Image 
                            src={playButton} 
                            alt="play button"
                            className="w-24 h-24 opacity-80 group-hover:opacity-100 transition ease-in-out duration-500" 
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
