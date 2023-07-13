
export default function Section({ children, page = false }) {
    return (
        <section className={`max-w-6xl px-8 py-12 sm:py-20 mx-auto ${page && 'min-h-screen'}`}>
            { children }
        </section>
    )
}
