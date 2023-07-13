import Accordion2 from '@/components/Accordion2'
import TitleBlock from '@/components/Shared/TitleBlock'
import { getStoryblokApi } from '@storyblok/react'
import LoadingSpinner from '@/components/LoadingSpinner'
import { useState, useEffect } from 'react'

export default function ProfessionalResources(props) {

    const {
        downloads = null,
    } = props;

    const [ contents, setContents ] = useState(null)
    const [ filter, setFilter ] = useState('All')

    // Create the filter buttons
    const bodyParts = [ 'All', 'Elbow', 'Foot / Ankle', 'Hand / Wrist', 'Hip', 'Knee', 'Shoulder', ]

    // Sort the downloads into the corresponding accordion dropdown
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

    // create the accordion
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

    // When a filter button is clicked
    // Filter all downloads and re-sort into accordion dropdowns
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
                <TitleBlock alignBlock={'left'} title={'All Resources'} subTitle={'Use the buttons below to filter down the results, then expand the appropriate dropdown category, and finally, click on the red link to download the corresponding PDF.'} />
            </div>

            {/* FILTERS */}
            <section className='mt-12'>
                <p className='text-arnotBlue font-bold uppercase text-sm'>Filters</p>
                <div className='mt-4 flex flex-row flex-wrap gap-2 sm:gap-6'>
                    { bodyParts.map(item => (
                        <div 
                            key={item} 
                            onClick={() => setFilter(item)} 
                            className={`
                                px-6 py-4 flex-grow text-center border rounded-md hover:cursor-pointer 
                                ${item === filter ? 
                                    'bg-arnotBlue/20 border-arnotBlue/40' : 
                                    'bg-slate-50 hover:bg-arnotBlue/10 hover:border-arnotBlue/40'
                                }
                            `}
                        >
                            {item}
                        </div>
                    ))}
                </div>
            </section>

            {/* ACCORDION */}
            <section className='mt-12'>
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

    // Storyblok limits a response to 100 stories. Additional results are paginated.
    // This initial API call is used to get the total number of All Downloads stories
    let initial = await storyblokApi.get('cdn/stories/', { 
        version: 'published',
        cv: 'CURRENT_TIMESTAMP',
        starts_with: 'all-downloads',
        page: 1, 
        per_page: 1, 
    })
    
    let per_page = 100;
    let requests = [];

    // Determine total pages by calculating (total stories / stories/page)
    let totalPages = Math.ceil(initial.headers.total / per_page);

    // Create the API calls for each page and push into an array
    for(let i = 1; i <= totalPages; i++) {
        // Push each call into an array
        requests.push(storyblokApi.get('cdn/stories/', { 
            version: 'published',
            cv: 'CURRENT_TIMESTAMP',
            starts_with: 'all-downloads',
            page: i, 
            per_page, 
        }))
    }

    // Resolve all API calls
    let responses = await Promise.all(requests)

    // Normalize the data and flatten into a single array
    const downloads = responses.map((item) => 
        item.data.stories.map((item) => {
            return {
                id: item.id,
                label: item.content.label,
                bodyParts: item.content.bodyPart,
                category: item.content.category,
                file: item.content.download.filename,
            }
        })).flat();

    return {
        props: {
            downloads,
        },
        revalidate: 3600,
    };
}