import Image from 'next/image'
import ButtonPrimary from '../Shared/ButtonPrimary'
import TitleBlock from '../Shared/TitleBlock'
import IconList from '../Shared/IconList'
import { useRouter } from 'next/router'

export default function Hero(props) {
    
    const {
        icons = [],
        openModal,
        profile,
        videoUrl,
        kicker = [],
        title = '',
        subTitle = '',
        buttonLabel = '',
        image = '',
        url = '',
    } = props

    const router = useRouter()
    
    const goToProfile = (id) => {
        router.push(`/team/${id}`)
    }
    
    const playVideo = (url) => {
        openModal(url)
    }


    return (
        <div className='relative overflow-hidden w-full h-[660px] bg-gray-200'>
            
            {/* Image */}
            { image && 
                <div className='absolute right-0 w-3/4 h-full z-0 opacity-50 md:opacity-100'>
                    <Image 
                        src={image} 
                        alt="hero image" 
                        fill={true} 
                        sizes='100vw'
                        quality={100} 
                        priority={true} 
                        className='object-cover'
                    />
                </div>
            }

            {/* White Gradient */}
            <div className='absolute left-0 top-0 w-9/12 h-full z-10 bg-gradient-to-r from-white via-white'></div>

            {/* Text and Button */}
            <div className='max-w-6xl h-full mx-auto px-8 flex justify-start items-center'>
                <div className='z-20'>
                    <TitleBlock
                        alignBlock={'left'}
                        kicker={kicker}
                        title={title}
                        subTitle={subTitle}
                    />
                    { buttonLabel && 
                        <div className='mt-12'>
                            <ButtonPrimary label={buttonLabel} url={url} />
                        </div> 
                    }
                    { icons && 
                        <div className='mt-8 max-w-sm grid grid-cols-2 gap-4'>
                            <IconList items={icons} profile={profile} goToProfile={goToProfile} playVideo={playVideo} url={videoUrl} />
                        </div>
                    }
                </div>
            </div>

        </div>
    )
}