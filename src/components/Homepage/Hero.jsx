import Image from 'next/image'
import { useState } from 'react'
import ButtonPrimary from '../Shared/ButtonPrimary'
import TitleBlock from '../Shared/TitleBlock'
import IconList from '../Shared/IconList'
import { CarouselControls } from '../Carousel'
import { useRouter } from 'next/router'
import { CAROUSEL_CONTROLS } from '../Theme'

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
        images = [],
        url = '',
        controlsMargin = 'large',
    } = props

    const router = useRouter()
    
    const goToProfile = (id) => {
        router.push(`/team/${id}`)
    }
    
    const playVideo = (url) => {
        openModal(url)
    }

    const marginTop = CAROUSEL_CONTROLS.margin[controlsMargin]

    const [ index , setIndex ] = useState(0)

    const handleIncrement = () => {
        if(index === images.length-1){
            setIndex(0)
        } else {
            setIndex(index+1)
        }
    }

    const handleDecrement = () => {
        if(index === 0){
            setIndex(images.length-1)
        } else {
            setIndex(index-1)
        }
    }

    return (
        <>
            <div className='relative overflow-hidden w-full h-[660px] bg-gray-200'>

                {/* Image */}
                { images && 
                    <div className='absolute right-0 w-3/4 h-full z-0 opacity-50 md:opacity-100'>
                        <Image 
                            src={images[index]} 
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

            <CarouselControls marginTop={marginTop} selected={index} length={images.length} increment={handleIncrement} decrement={handleDecrement} />
        </>
    )
}