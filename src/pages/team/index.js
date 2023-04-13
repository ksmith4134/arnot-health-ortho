import React from 'react'
import Hero from '@/components/Homepage/Hero'
import Team from '@/components/Team/Team'

export default function TeamHome() {
  return (
    <div>
        <Hero 
            kicker={''}
            title={'It\'s what we do'}
            subTitle={'Our team of experienced orthopedic physicians and advanced practice providers are here to help you every step of the way. Learn more about our team members below.'}
            buttonLabel={'Meet the Team'}
            image={''}
            // media={['/HeroTest.jpg', '/HeroTest.jpg', '/HeroTest.jpg']}
            carousel={true}
            url={'#'}
        />
    </div>
  )
}
