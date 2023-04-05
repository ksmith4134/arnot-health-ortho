import { useState } from 'react'
import { BsArrowLeftCircle, BsArrowRightCircle } from 'react-icons/bs'

export default function Carousel(props) {

    const { 
        length,
        children,
        float = false,
    } = props

    const [ index , setIndex ] = useState(0)

    const handleIncrement = () => {
        if(index === length-1){
            setIndex(0)
        } else {
            setIndex(index+1)
        }
    }

    const handleDecrement = () => {
        if(index === 0){
            setIndex(length-1)
        } else {
            setIndex(index-1)
        }
    }

    return (
        <div className={`w-full mt-8 md:mt-1 ${float && `md:w-80 order-2 float-none md:float-right md:ml-12`}`}>
            { children[index] }
            <CarouselControls selected={index} length={length} increment={handleIncrement} decrement={handleDecrement} />
        </div>
    )
}

export function CarouselControls(props) {

    const {
        selected,
        length,
        decrement,
        increment
    } = props

    let media = [];
    for(let i = 0; i < length; i++) {
        media.push(i)
    }

    return (
        <div className='flex flex-row justify-center items-center space-x-4 mt-4 h-8'>
            <BsArrowLeftCircle onClick={decrement} className='text-2xl md:text-xl text-gray-400 hover:text-arnotBlue hover:cursor-pointer' />
            <div className='flex flex-row justify-center items-center'>
                {
                    media.map((index) => (
                        <div key={index} className={`w-6 h-[2px] mx-1 ${index === selected ? 'bg-arnotBlue' : 'bg-gray-300 '} rounded-full`}></div>
                    ))
                }
            </div>
            <BsArrowRightCircle onClick={increment} className='text-2xl md:text-xl text-gray-400 hover:text-arnotBlue hover:cursor-pointer' />
        </div>
    )
}