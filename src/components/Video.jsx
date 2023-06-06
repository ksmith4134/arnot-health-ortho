import Image from 'next/image'
import defaultPic from '../../public/defaultVideoThumb.png'
import Download from './Download'
import LinkWrapper from './LinkWrapper'
import Prose from './markdown/Prose'
import { ICONS } from './Theme'
import ButtonPrimary from './Shared/ButtonPrimary'

export default function Video(props) {

    const {
        orientation = 'row',
        verticalAlign = 'center',
        titleSize = '',
        title = '', 
        description = '', 
        videoUrl = 'https://www.youtube.com/embed/uUmAUxWFYCw', 
        image = '',
        asset = null, // renders Download, LinkWrapper, or Button components
        handleClick = () => console.log('Video modal open')
    } = props

    const renderAsset = (asset) => {
        switch (asset?.component) {
            case 'Download':
                return <Download title={asset.title} download={asset.download} fontSize={'normal'} />
            case 'Link':
                return <LinkWrapper title={asset.title} url={asset.link.url} target={asset.link.target} />
            case 'Button':
                return <ButtonPrimary label={asset.label} url={asset.url} type={'tertiary'} />
            default:
                break;
        }
    }
    
    const playButton = ICONS['play']

    // defaultPic is blue bg with white arnot health logo
    const videoThumbnail = image ? image : defaultPic

    return (
        <div className={`my-2 flex flex-col ${orientation === 'row' && 'lg:flex-row flex-col lg:space-x-12'} justify-center ${verticalAlign === 'start' ? 'items-start' : 'items-center'}`}>
            <div className={`${orientation === 'row' ? 'basis-6/12 flex-shrink' : 'w-full'}`}>
                <h2 className={`${titleSize === 'large' ? 'text-4xl font-bold' : 'text-2xl'}`}>{title}</h2>
                <div className={`${title ? 'mt-4' : 'mt-0'}`}>
                    <Prose richText={description} />
                </div>
                { asset && 
                    <div className='lg:mt-6 lg:mb-0 my-6'>
                        { renderAsset(asset) }
                    </div>
                }
            </div>
            <div className={`basis-6/12 ${orientation === 'row' ? 'mt-4 lg:mt-0 flex-shrink-0' : 'mt-4'}`}>
                <div onClick={() => handleClick(videoUrl)} className={`w-full relative block overflow-hidden rounded hover:cursor-pointer group ${verticalAlign === 'start' && 'mt-2'}`}>
                    <Image 
                        src={videoThumbnail} alt='video thumbnail'
                        width={1000} height={600}
                        className='object-cover rounded group-hover:scale-105 transition ease-in-out duration-500 aspect-video' 
                    />
                    <div className='absolute top-0 bottom-0 left-0 right-0 flex justify-center items-center'>
                        <Image 
                            src={playButton} alt='play button'
                            className='w-16 sm:w-20 md:w-24 aspect-square lg:opacity-80 group-hover:opacity-100 transition ease-in-out duration-500 bg-white/30 rounded-full' 
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
