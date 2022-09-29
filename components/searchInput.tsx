import type { NextPage } from 'next'
import { FormEvent, useState } from 'react'
import Link from 'next/link'

type Props = {
    value?: string
}

const SearchInput: NextPage<Props> = (props) => {
    const [keyword, setKeyword] = useState(props.value || '')
    const setter = (e: FormEvent<HTMLInputElement>) => {
        setKeyword(e.currentTarget.value)
    }
    return (
        <form>
            <input type={`text`} onChange={setter} value={keyword} />
            <Link href={{ pathname: '/search', query: { q: keyword.toLowerCase() } }}>
                <button>Search</button>
            </Link>
        </form>
    )
}

export default SearchInput
