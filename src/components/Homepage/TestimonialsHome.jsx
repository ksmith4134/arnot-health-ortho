import React from 'react'
import { useState } from 'react'
import ProfilePic from '../ProfilePic'
import IconImage from '../Shared/IconImage'
import FiveStars from '../Shared/FiveStars'
import TestimonialsContent from '../widgets/TestimonialsContent'
import TitleBlock from '../Shared/TitleBlock'

export default function TestimonialsHome(props) {

    const {
        testimonials = [],
        title = '',
    } = props

    const [ selected, setSelected ] = useState(0)
    const [ hovered, setHovered ] = useState(null)

    const handleHover = (index) => {
        setHovered(index)
    }

    const handleClick = (index) => {
        setSelected(index)
    }

    return (
        <div className='max-w-5xl px-8 mx-auto py-24'>
            {/* <h1 className='text-center text-4xl sm:text-5xl font-bold'>{title}</h1> */}
            <TitleBlock title={title} />
            <div className='mt-24 flex flex-col md:flex-row md:items-start'>
                {/* Profile Pics */}
                <div className='order-1 md:basis-5/12'>
                    {
                        testimonials.map((item, index) => (
                            <div key={item.id} className='first:mt-0 mt-12'>
                                <div 
                                    className={`
                                        flex flex-row items-center space-x-4 
                                        ${selected === index || hovered === index ? 
                                            'cursor-pointer text-arnotBlue grayscale-0' : 
                                            'text-gray-500 grayscale opacity-50'
                                        }
                                    `} 
                                    onMouseEnter={() => handleHover(index)} 
                                    onMouseLeave={() => handleHover(null)}
                                    onClick={() => handleClick(index)}
                                >
                                    <ProfilePic url={item.profilePic} size={'small'} />
                                    <div>
                                        <p className='font-bold text-lg'>Dr. {item.doctor}</p>
                                        <p className='text-md'>{item.condition}</p>
                                    </div>
                                </div>
                                <div className='block md:hidden'>
                                    <div className={`${selected === index ? 'block' : 'hidden'}`}>
                                        {
                                            testimonials.map((item, index) => (
                                                <div key={item.id} className={`mt-4 mb-16 py-8 border-b-2 ${selected === index ? 'block' : 'hidden'}`}>
                                                    <TestimonialsContent 
                                                        title={item.reviewTitle}
                                                        body={item.reviewBody}
                                                        bodyPart={item.bodyPart}
                                                        name={item.reviewerName}
                                                        city={item.city}
                                                        state={item.state}
                                                    />
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
                {/* Testimonial */}
                <div className='order-2 mt-16 md:mt-0 md:basis-7/12 hidden md:block'>
                    {
                        testimonials.map((item, index) => (
                            <div key={item.id} className={`${selected === index ? 'block' : 'hidden'}`}>
                                <TestimonialsContent 
                                    title={item.reviewTitle}
                                    body={item.reviewBody}
                                    bodyPart={item.bodyPart}
                                    name={item.reviewerName}
                                    city={item.city}
                                    state={item.state}
                                />
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
