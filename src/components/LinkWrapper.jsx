import React from 'react'
import Link from 'next/link'
import { BiLinkExternal } from 'react-icons/bi'

export default function LinkWrapper(props) {

    const {
        id,
        title,
        url,
        target,
        showIcon = true,
    } = props

    return (
        <Link href={url} tagret={target} className='mt-4 text-arnotBlue text-sm flex items-center space-x-2 hover:underline hover:underline-offset-4'>
            { showIcon && <BiLinkExternal className='text-lg' /> }
            <div>{title}</div>
        </Link>
    )
}
