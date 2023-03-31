import LinkWrapper from "./LinkWrapper"

export default function LinkList(props) {

    const {
        id,
        accordion = false,
        links = [],
    } = props

    return (
        <div className='mt-4 mb-8'>
            {
                links.map((link) => (
                    <LinkWrapper key={link.id} title={link.title} url={link.url} target={link.target} showIcon={true} />
                ))
            }
        </div>
    )
}
