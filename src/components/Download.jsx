import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ICONS } from './Theme'

export default function Download(props) {

    const {
        title, 
        download,
        icon = 'pdf',
        fontSize = 'normal'
    } = props

    const router = useRouter()

    const AssetIcon = icon ? ICONS[icon] : null
    
    return (
        <Link href={download ? download : router.asPath} target='_blank' className='mt-4 flex items-center space-x-2 text-arnotRed hover:underline hover:underline-offset-4'>
            {AssetIcon && <AssetIcon className={`text-red-500 ${fontSize === 'small' ? 'text-2xl' : 'text-3xl'}`} />}
            {title && <p className={`${fontSize === 'small' ? 'text-sm' : ''}`}>{title}</p>}
        </Link>
  )
}
