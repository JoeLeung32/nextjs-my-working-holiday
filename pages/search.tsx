import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import search from '../search.json'
import { Logs } from '../types/Logs'
import Head from 'next/head'
import Link from 'next/link'
import SearchInput from '../components/searchInput'

const Search: NextPage = () => {
    const router = useRouter()
    const stringQuery = router.query
    let keyword : string = ''
    if (typeof stringQuery.q === 'string') {
        keyword = stringQuery.q
    } else if (typeof stringQuery.q === 'object') {
        keyword = stringQuery.q.join(' ')
    }
    let matchedResult: Logs[] = []
    if (keyword && keyword.length) {
        matchedResult = search.filter(md => {
            const title = md.title.toLowerCase()
            const isMatchedTitle = title.includes(keyword)
            return isMatchedTitle
        })
    }
    return (
        <div>
            <Head>
                <title>{`${keyword} - Search - MyWH`}</title>
            </Head>
            <h1>Search : <span>{keyword}</span></h1>
            <hr />
            <SearchInput value={keyword} />
            <hr />
            {matchedResult.length ? (
                <div>
                    <ul>
                        {matchedResult.map(({ id, title, date, slug }: Logs) => (
                            <li key={id}>
                                <Link href={`/blog/${slug}`}>
                                    <a>
                                        <strong>{title}</strong>
                                    </a>
                                </Link>
                                <div>{date}</div>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <div>No Data</div>
            )}
        </div>
    )
}

export default Search
