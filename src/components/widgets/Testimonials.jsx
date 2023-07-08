import { useState } from 'react'
import { CarouselControls } from '../Carousel'
import FiveStars from "../Shared/FiveStars"
import IconImage from "../Shared/IconImage"

export default function Testimonials(props) {

    const {
        reviews,
    } = props

    /* Reviews array */
    // reviews: [
    //     {id, doctor, profilePic, bodyPart, city, state, condition, reviewerName, reviewBody, reviewTitle, stars},
    // ]
    

    const [ index, setIndex ] = useState(0)

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
        <div>
            <div className='rounded-md p-8 bg-slate-50 border border-arnotBlue/20 flex flex-row items-center'>
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
                            textSize={'small'}
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

export function TestimonialsContent(props) {

    const {
        title,
        body,
        bodyPart,
        name,
        city,
        state,
        displayBodyIcon = false,
        textSize = ''
    } = props

    return (
        <div>
            { title && <div className={`font-bold ${textSize === 'small' ? '' : 'text-lg'}`}>{ title }</div> }
            <FiveStars />
            <div className={`mt-6 leading-6 line-clamp-[8] ${textSize === 'small' ? 'text-sm' : 'text-md'}`}>{ body }</div>
            <div className='first:mt-0 mt-8 flex flex-row items-center'>
                <div className={`${displayBodyIcon === true ? 'block pr-4' : 'hidden md:block md:pr-4'}`}>
                    <IconImage icon={bodyPart} type={'body'} size={'w-12 h-12'} />
                </div>
                <div className={`${textSize === 'small' && 'text-sm'}`}>
                    <p className='font-bold'>{ name }</p>
                    <p>{ city }, { state }</p>
                </div>
            </div>
        </div>
    )
}