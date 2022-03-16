import { searchKeywordAtom } from '@state/common/search'
import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useResetRecoilState, useSetRecoilState } from 'recoil'

export default function SearchBox({ linkTo, linkText, optionName }) {
  const setSearchKeyword = useSetRecoilState(searchKeywordAtom)
  const resetSearchKeyword = useResetRecoilState(searchKeywordAtom)
  const searchKeywordRef = useRef('')
  const handleSearchKeyword = () => setSearchKeyword(searchKeywordRef.current.value)
  const handleKeydown = (event) =>
    event.key === 'Enter' && setSearchKeyword(searchKeywordRef.current.value)
  useEffect(() => {
    return () => resetSearchKeyword()
  }, [])
  return (
    <div className='searchBox'>
      <select className='mgr_5'>
        <option>{optionName}</option>
      </select>
      <input
        type='text'
        placeholder='검색어를 입력하세요'
        className='mgr_5'
        ref={searchKeywordRef}
        onKeyDown={handleKeydown}
      />
      <button className='btn-search mgr_5' type='button' onClick={handleSearchKeyword}>
        <span className='hidden'>검색</span>
      </button>
      <Link to={linkTo} className={'btn btn-middle purple'}>
        {linkText}
      </Link>
    </div>
  )
}
