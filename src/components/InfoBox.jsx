import React from 'react'
import Prose from './Prose'
import { FaInfoCircle } from 'react-icons/fa'

export default function InfoBox(props) {

    const { richText } = props

    return (
        <div className='w-full rounded-lg bg-arnotRed/20 p-4 flex justify-start items-start space-x-4'>
            <FaInfoCircle className='text-arnotRed w-10 h-10 flex-none' />
            <Prose richText={richText} />
        </div>
    )
}
