import React from 'react'
import { ICONS } from '../Theme'

export default function Credentials(props) {
    
    const {
        credentials
    } = props

    // category, entries = []

    const Award = ICONS['award']
    
    return (
        <div className='w-full py-12 px-12 rounded-md border-arnotBlue bg-arnotBlue/10 border relative'>
            <h2 className='font-bold text-2xl'>Credentials</h2>
            <Award className='absolute top-8 right-4 w-40 h-40 text-arnotBlue/20' />
            <div className='mt-10'>
                { credentials.map((item, index) => (
                    <div key={index} className='mt-6'>
                        <div className='font-bold'>{item.category}</div>
                        { item.entries.map((item, index) => (
                            <div key={index}>{ item }</div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}
