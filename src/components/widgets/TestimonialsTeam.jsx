import TestimonialsContent from './TestimonialsContent'
import { useState } from 'react'
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from 'react-icons/bs'
import { CarouselControls } from '../Carousel'


export default function TestimonialsTeam(props) {

    const {
        reviews
    } = props

    const [ index , setIndex ] = useState(0)

    const handleIncrement = () => {
        if(index === reviews.length-1){
            setIndex(0)
        } else {
            setIndex(index+1)
        }
    }

    const handleDecrement = () => {
        if(index === 0){
            setIndex(reviews.length-1)
        } else {
            setIndex(index-1)
        }
    }

    let media = [];
    for(let i = 0; i < reviews.length; i++) {
        media.push(i)
    }

    // id, doctor, profilePic, bodyPart, city, state, condition, reviewerName, reviewBody, reviewTitle, stars

    return (
        <div className='pt-24 pb-12' id='reviews'>
            <h2 className='font-bold text-2xl'>Reviews</h2>
            <div 
                className='mt-6 rounded-md p-8 sm:py-20 sm:px-12 bg-white border border-arnotBlue/20 flex flex-row items-center group'
            >
                <BsArrowLeftCircleFill onClick={handleDecrement} className='hidden md:block text-2xl md:text-6xl opacity-0 group-hover:opacity-100 text-slate-300 hover:text-arnotBlue/70 hover:cursor-pointer transition ease-in-out duration-200' />
                { reviews.map((review, i) => (
                    <div key={review.id} className={`max-w-md mx-auto ${i === index ? 'block' : 'hidden'} trasition ease-in-out duration-1000`}>
                        <TestimonialsContent 
                            title={review.reviewTitle}
                            body={review.reviewBody}
                            bodyPart={review.bodyPart}
                            name={review.reviewerName}
                            city={review.city}
                            state={review.state}
                            displayBodyIcon={true}
                        />
                    </div>
                ))}
                <BsArrowRightCircleFill onClick={handleIncrement} className='hidden md:block text-2xl md:text-6xl opacity-0 group-hover:opacity-100 text-slate-300 hover:text-arnotBlue/70 hover:cursor-pointer transition ease-in-out duration-300' />
            </div>
            <div className='mt-6 flex flex-row justify-center items-end'>
                {
                    media.map((i) => (
                        <div key={i} className={`w-6 h-[3px] mx-1 ${i === index ? 'bg-arnotBlue' : 'bg-gray-300 '} rounded-full`}></div>
                    ))
                }
            </div>
            <div className='block md:hidden'>
                <CarouselControls 
                    selected={index}
                    length={reviews.length}
                    decrement={handleDecrement}
                    increment={handleIncrement}
                />
            </div>
        </div>
    )
}
