import { useEffect } from 'react'
import { useRouter } from 'next/router'
import LoadingSpinner from '@/components/LoadingSpinner'

export default function Body() {
    const router = useRouter()

    useEffect(() => {
        router.back()
    }, [])

    return (
        <LoadingSpinner />
    )
}