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
        icons = null,
        openModal,
        profile,
        videoUrl,
        kicker = [],
        title = '',
        subTitle = '',
        buttonLabel = '',
        images = null,
        url = '',
        controlsMargin = 'large',
    } = props

    const router = useRouter()
    const [ index , setIndex ] = useState(0)
    
    const goToProfile = (id) => {
        router.push(`/team/${id}`, '', { scroll: false })
    }
    
    const playVideo = (url) => {
        openModal(url)
    }

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

    const marginTop = CAROUSEL_CONTROLS.margin[controlsMargin]

    return (
        <>
            <div className='relative overflow-hidden w-full sm:h-[660px] bg-gray-200'>

                {/* Image */}
                { images && 
                    <div className='hidden sm:block absolute right-0 w-3/4 h-full z-0 opacity-50 md:opacity-100'>
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
                <div className='max-w-6xl h-full mx-auto px-8 py-24 sm:py-0 flex justify-start items-center'>
                    <div className='z-20'>
                        <TitleBlock
                            alignBlock={'left'}
                            kicker={kicker}
                            title={title}
                            subTitle={subTitle}
                        />
                        { buttonLabel && 
                            <div className='mt-12'>
                                <ButtonPrimary label={buttonLabel} url={url} scroll={false} />
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

            {/* Image */}
            { images && 
                <>
                    <div className='block sm:hidden w-full aspect-[3/2] relative overflow-hidden'>
                        <Image 
                            src={images[index]} 
                            alt="hero image" 
                            fill={true} 
                            sizes='100vw'
                            quality={100} 
                            priority={true} 
                            className='object-cover p-8'
                        />
                    </div>
                    <div className={`${images.length > 1 && '-mt-8 sm:mt-0'}`}>
                        <CarouselControls marginTop={marginTop} selected={index} length={images.length} increment={handleIncrement} decrement={handleDecrement} />
                    </div>
                </>
            }
        </>
    )
}