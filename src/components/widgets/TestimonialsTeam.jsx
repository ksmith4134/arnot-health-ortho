import TestimonialsContent from './TestimonialsContent'
import { useState } from 'react'
import { CarouselControls } from '../Carousel'


export default function TestimonialsTeam(props) {

    const {
        reviews,
    } = props

    /* 
        reviews: [
            {id, doctor, profilePic, bodyPart, city, state, condition, reviewerName, reviewBody, reviewTitle, stars},
        ]
    */

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


    return (
        <div className='pt-24 pb-12' id='reviews'>
            <h2 className='font-bold text-2xl'>Reviews</h2>
            <div  className='mt-6 rounded-md p-8 sm:py-20 sm:px-12 bg-slate-50 border border-arnotBlue/20 flex flex-row items-center'>
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
            </div>
            <CarouselControls 
                selected={index}
                length={reviews.length}
                decrement={handleDecrement}
                increment={handleIncrement}
            />
        </div>
    )
}
