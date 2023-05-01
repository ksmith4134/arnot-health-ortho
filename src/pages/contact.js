import InfoBox from '@/components/InfoBox'
import Link from 'next/link'
// import Locations from '@/components/widgets/Locations'
import GoogleMapDuex from '@/components/widgets/GoogleMapDuex'
import { getStoryblokApi, renderRichText } from '@storyblok/react'


export default function Contact(props) {
    
    const {
        locations = []
    } = props

    // console.log('locations', locations)

    return (
        <div className='max-w-5xl mx-auto px-8 min-h-screen mt-20'>
            <InfoBox textSize={'medium'} richText={'<p>In case of an emergency, pelase call <b>911</b> or the Posion Control Hotline at <b>1-800-222-1222</b></p>'} />

            <div className='max-w-2xl'>
                <h2 className='mt-16 font-bold text-2xl'>Contact Your Provider</h2>
                <p className='mt-4'>If you have any questions regarding your care, appointment schedule, or test results, please contact your provider&apos;s office directly at <span className='font-bold'>(607) 734-4110</span>.</p>
            </div>

            <div className='max-w-2xl'>
                <h2 className='mt-16 font-bold text-2xl'>Patient Portal</h2>
                <p className='mt-4'>If you have questions regarding the patient portal such as how to sign up or login, please visit the link at the main Arnot website: <Link href={'https://www.arnothealth.org/myarnothealth'} target='_blank' className='font-bold text-arnotBlue underline underline-offset-4'>Patient Portal FAQ</Link></p>
            </div>

            <GoogleMapDuex locations={locations} />
        </div>
    )
}

export async function getStaticProps() {

    const storyblokApi = getStoryblokApi();
    
    const locationResponse = await storyblokApi.get(`cdn/stories`, {
        version: 'draft',
        starts_with: 'locations',
    });

    const locations = locationResponse.data.stories.map(item => ({
        id: item.id,
        city: item.content.city,
        state: item.content.state,
        url: item.content.googleMapsURL.url,
        image: item.content.mapImage.filename,
        name: item.content.name,
        street: item.content.street,
        zip: item.content.zip,
    }))

    return {
        props: {
            locations,
        },
        revalidate: 3600,
    }
}
