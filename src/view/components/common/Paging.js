import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil'
import { currentPageAtom, totalCountAtom } from '@state/common/paging'
import { useEffect } from 'react'
import { searchKeywordAtom } from '@state/common/search'
export default function Paging() {
  console.log('paging...')
  const [currentPage, setCurrentPage] = useRecoilState(currentPageAtom)
  const resetCurrentPage = useResetRecoilState(currentPageAtom)
  const totalCount = useRecoilValue(totalCountAtom)
  const searchKeyword = useRecoilValue(searchKeywordAtom)
  console.log(totalCount)
  const pageLength = 5
  const totalPage = Math.ceil(totalCount / 7)
  console.log(totalCount, pageLength, totalPage)
  const pageStart = findStartPage(totalPage, pageLength, currentPage)
  const pagingArray = makePagingArray(pageStart, pageLength)
  const nextPageStart = pageStart + pageLength
  const prevPageStart = pageStart - pageLength

  useEffect(() => {
    resetCurrentPage()
  }, [searchKeyword])

  return (
    <div className='paging'>
      {currentPage !== 1 && (
        <a href='#' className='first' onClick={() => setCurrentPage(1)}>
          <span className='hdn'>맨처음페이지</span>
        </a>
      )}
      {prevPageStart >= 1 && (
        <a href='#' className='prev' onClick={() => setCurrentPage(prevPageStart + 4)}>
          <span className='hdn'>이전페이지</span>
        </a>
      )}
      {pagingArray.map(
        (num) =>
          num <= totalPage &&
          (num === currentPage ? (
            <a href='#' className='on' key={num}>
              {num}
            </a>
          ) : (
            <a href='#' onClick={() => setCurrentPage(num)} key={num}>
              {num}
            </a>
          ))
      )}
      {nextPageStart <= totalPage && (
        <a href='#' className='next' onClick={() => setCurrentPage(nextPageStart)}>
          <span className='hdn'>다음페이지</span>
        </a>
      )}
      {currentPage !== totalPage && (
        <a href='#' className='last' onClick={() => setCurrentPage(totalPage)}>
          <span className='hdn'>맨마지막페이지</span>
        </a>
      )}
    </div>
  )
}

const findStartPage = (totalPage, limit, currentPage) => {
  for (let i = 0; i <= totalPage; i++) {
    const startPage = i * limit + 1
    const endPage = (i + 1) * limit
    if (startPage <= currentPage && endPage >= currentPage) {
      return startPage
    }
  }
}

const makePagingArray = (pageStart, limit) => {
  const arr = []
  for (let i = pageStart; i <= pageStart + limit - 1; i++) {
    arr.push(i)
  }
  return arr
}
