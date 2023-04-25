import TestimonialsContent from './TestimonialsContent'
import { useState } from 'react'
import { BsArrowLeftCircle, BsArrowRightCircle } from 'react-icons/bs'
import { CarouselControls } from '../Carousel'


export default function TestimonialsTeam(props) {

    const {
        reviews
    } = props

    const [ index , setIndex ] = useState(0)
    const [ hover, setHover ] = useState(null)

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

    const handleHover = (bool) => {
        setHover(bool)
    }

    let media = [];
    for(let i = 0; i < reviews.length; i++) {
        media.push(i)
    }

    // id, doctor, profilePic, bodyPart, city, state, condition, reviewerName, reviewBody, reviewTitle, stars

    return (
        <div className='max-w-5xl px-8 mx-auto pt-24 pb-12'>
            <div className='flex flex-row justify-between items-end'>
                <h2 className='font-bold text-2xl'>Reviews</h2>
                <div className='flex-row items-end hidden md:flex'>
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
            <div 
                className='mt-6 rounded-md border py-20 px-12 hover:bg-slate-50 flex flex-row items-center'
                onMouseOver={() => handleHover(true)}
                onMouseLeave={() => handleHover(false)}
            >
                { hover && <BsArrowLeftCircle onClick={handleDecrement} className='hidden md:block text-2xl md:text-6xl text-slate-300 hover:text-arnotBlue hover:cursor-pointer' /> }
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
                {hover && <BsArrowRightCircle onClick={handleIncrement} className='hidden md:block text-2xl md:text-6xl text-slate-300 hover:text-arnotBlue hover:cursor-pointer' /> }
            </div>
        </div>
    )
}
