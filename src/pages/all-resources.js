import Accordion2 from '@/components/Accordion2'
import TitleBlock from '@/components/Shared/TitleBlock'
import { getStoryblokApi } from '@storyblok/react'
import LoadingSpinner from '@/components/LoadingSpinner'
import { useState, useEffect } from 'react'

export default function ProfessionalResources(props) {

    const {
        downloads,
    } = props

    const [ contents, setContents ] = useState(null)
    const [ filter, setFilter ] = useState('All')

    /* Create the filter buttons */
    const bodyParts = [ 'All', 'Elbow', 'Foot / Ankle', 'Hand / Wrist', 'Hip', 'Knee', 'Shoulder', ]

    const sortDownloads = (downloads) => {
        const generalDownloads = downloads.filter(item => item.category === 'General Downloads');
        const dischargeInstructions = downloads.filter(item => item.category === 'Discharge Instructions');
        const rehabProtocols = downloads.filter(item => item.category === 'Rehab Protocols');

        const sortedDownloads = [
            {
                id: 0,
                label: 'General Downloads'+` (${generalDownloads.length})`,
                content: generalDownloads
            },
            {
                id: 1,
                label: 'Discharge Instructions'+` (${dischargeInstructions.length})`,
                content: dischargeInstructions
            },
            {
                id: 2,
                label: 'Rehab Protocols'+` (${rehabProtocols.length})`,
                content: rehabProtocols
            },
        ];

        return sortedDownloads;
    }

    const createAccordion = (content) => {
        const accordion = {
            id: 0,
            title: '',
            contents: content.map((dropdown) => {
                return {
                    component: 'Dropdown',
                    id: dropdown.id,
                    label: dropdown.label,
                    content: [
                        {
                            component: 'DownloadList',
                            accordion: true,
                            downloads: dropdown.content.map((download) => {
                                return {
                                    component: 'Download',
                                    id: download.id,
                                    title: download.label,
                                    download: download.file,
                                    bodyParts: download.bodyParts
                                }
                            })
                        }
                    ]
                }
            })
        };

        return accordion;
    }

    /* When a filter button is clicked
    ** Filter all downloads and re-sort into accordion dropdowns
    */
    useEffect(() => {
        let filteredDownloads = null;

        if(filter === 'All'){
            filteredDownloads = downloads;
        } else {
            filteredDownloads = downloads.filter(item => item.bodyParts.includes(filter))
        }

        const sortedDownloads = sortDownloads(filteredDownloads);

        const accordion = createAccordion(sortedDownloads);

        setContents(accordion.contents);

    }, [downloads, filter])


    return (
        <div className='max-w-6xl mx-auto px-8 min-h-screen mt-12'>
            <div className='mt-24'>
                <TitleBlock alignBlock={'left'} title={'All Resources'} subTitle={'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna'} />
            </div>

            {/* FILTERS */}
            <section className='mt-16 flex flex-row flex-wrap gap-2 sm:gap-6'>
                { bodyParts.map(item => (
                    <div key={item} onClick={() => setFilter(item)} className={`px-6 py-4 flex-grow text-center border rounded-md hover:cursor-pointer ${item === filter ? 'bg-arnotBlue/20 border-arnotBlue/40' : 'bg-slate-50 hover:bg-arnotBlue/20 hover:border-arnotBlue/40'}`}>
                        {item}
                    </div>
                ))}
            </section>

            {/* ACCORDION */}
            <section className='mt-16'>
                { contents ? 
                    <Accordion2 id={0} contents={contents} fontSize={'xLarge'} /> :
                    <LoadingSpinner />
                }
            </section>
        </div>
    )
}

export async function getStaticProps() {
   
    const storyblokApi = getStoryblokApi();

    const response = await storyblokApi.get(`cdn/stories`, {
        version: 'draft',
        starts_with: 'all-downloads',
    });

    const downloads = response.data.stories.map((item) => {
        return {
            id: item.id,
            label: item.content.label,
            bodyParts: item.content.bodyPart,
            category: item.content.category,
            file: item.content.download.filename,
        }
    })

    return {
        props: {
            downloads,
        },
        revalidate: 3600,
    };
}