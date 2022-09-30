import type { NextPage } from 'next'
import search from '../search.json'
import { Logs } from '../types/Logs'
import Head from 'next/head'
import Link from 'next/link'
import SearchInput from '../components/searchInput'
import { useCallback, useState } from 'react'

const Search: NextPage = () => {
    const [matchedResult, setMatchedResult] = useState<Logs[]>([])
    const [searchString, setSearchString] = useState('')
    const gatedSetKeyword = useCallback((keyword: string) => {
        if (!keyword || !keyword.length) return
        const data = search.filter(md => {
            const title = md.title.toLowerCase()
            const isMatchedTitle = title.includes(keyword)
            return isMatchedTitle
        })
        setMatchedResult(data)
        setSearchString(keyword)
    }, [])

    return (
        <div>
            <Head>
                <title>{`${searchString} - Search - MyWH`}</title>
            </Head>
            <h1>Search : <span>{searchString}</span></h1>
            <hr />
            <SearchInput setSearchString={gatedSetKeyword} />
            <hr />
            {matchedResult.length ? (
                <div>
                    <ul>
                        {matchedResult.map(({ id, title, date, slug }: Logs) => (
                            <li key={id}>
                                <Link href={`/blog/${slug}/?q=${searchString}`}>
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
