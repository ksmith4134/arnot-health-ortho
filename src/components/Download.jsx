import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ICONS } from './Theme'

export default function Download(props) {

    const {
        title, 
        url, 
        icon,
        fontSize = 'normal'
    } = props

    const router = useRouter()

    const AssetIcon = icon ? ICONS[icon] : null
    
    return (
        <div className=''>
            <Link href={url ? url : router.asPath} target='_blank' className='mt-4 flex items-center space-x-2'>
                {AssetIcon && <AssetIcon className='text-red-500 text-3xl' />}
                {title && <p className={`${fontSize === 'small' ? 'text-sm' : ''}`}>{title}</p>}
            </Link>
        </div>
  )
}
