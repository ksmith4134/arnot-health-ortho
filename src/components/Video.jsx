import Image from 'next/image'
import defaultPic from '../../public/Same Day Surgery Tour.jpg'
import Download from './Download'
import LinkWrapper from './LinkWrapper'
import Prose from './Prose'
import { ICONS } from './Theme'

export default function Video(props) {

    const {
        orientation = 'row',
        title = '', 
        description = '', 
        videoUrl = 'https://www.youtube.com/embed/uUmAUxWFYCw', 
        image = '',
        asset = {}, // goes to either Download or LinkWrapper component
        handleClick = () => console.log('Video modal open')
    } = props

    const playButton = ICONS['play']

    // update the defaultPic to blue bg with arnot health logo
    const videoThumbnail = image ? image : defaultPic

    return (
        <div className={`flex ${orientation === 'row' ? 'lg:flex-row flex-col lg:space-x-8' : 'flex-col'} justify-center items-center`}>
            <div className={`${orientation === 'row' ? 'basis-6/12 flex-shrink' : 'w-full'}`}>
                <h2 className='text-2xl'>{title}</h2>
                <div className='mt-2'>
                    <Prose richText={description} />
                </div>
                { asset?.component === 'Download' && 
                    <Download title={asset.title} download={asset.download} fontSize={'small'} />
                }
                { asset?.component === 'Link' && 
                    <LinkWrapper title={asset.title} url={asset.link.url} target={asset.link.target} />
                }
            </div>
            <div className={`basis-6/12 ${orientation === 'row' ? 'mt-4 lg:mt-0 flex-shrink-0' : 'mt-4'}`}>
                <div onClick={() => handleClick(videoUrl)} className='w-full relative block overflow-hidden hover:cursor-pointer group'>
                    <Image 
                        src={videoThumbnail} alt='video thumbnail'
                        width={1000} height={600}
                        className='object-cover rounded-sm group-hover:scale-105 transition ease-in-out duration-500 aspect-video' 
                    />
                    <div className='absolute top-0 bottom-0 left-0 right-0 flex justify-center items-center'>
                        <Image 
                            src={playButton} alt='play button'
                            className='w-24 h-24 lg:w-16 lg:h-16 lg:w-20 lg:h-20 lg:opacity-80 group-hover:opacity-100 transition ease-in-out duration-500' 
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
