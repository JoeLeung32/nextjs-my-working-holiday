import type { NextPage } from 'next'
import { FormEvent, useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

type Props = {
    setSearchString?: Function
}

const SearchInput: NextPage<Props> = ({setSearchString}) => {
    const router = useRouter()
    const [keyword, setKeyword] = useState('')

    const handlerChange = (e: FormEvent<HTMLInputElement>) => {
        setKeyword(e.currentTarget.value)
    }

    useEffect(() => {
        let paramQ: string = ''
        const stringQuery = router.query
        if (typeof stringQuery.q === 'string') {
            paramQ = stringQuery.q
        } else if (typeof stringQuery.q === 'object') {
            paramQ = stringQuery.q.join(' ')
        }
        setKeyword(paramQ)
        if (typeof setSearchString === 'function') {
            setSearchString(paramQ)
        }
    }, [router])

    return (
        <form>
            <input type={`text`} onChange={handlerChange} value={keyword} />
            <Link href={{ pathname: '/search', query: { q: keyword.toLowerCase() } }}>
                <button>Search</button>
            </Link>
        </form>
    )
}

export default SearchInput
