import { makeUpdateCompanyUrl } from '@constant/locationURLs'
import { currentPageAtom, totalCountAtom } from '@state/common/paging'
import { searchKeywordAtom } from '@state/common/search'
import { readCompanyListSelector } from '@state/company/company'
import { getFormDataFromJson } from '@util/common/axiosUtil'
import { formatyyMMddWithDot, stringToDate } from '@util/common/dateUtil'
import { loadItem } from '@util/common/localStorage'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useRecoilRefresher_UNSTABLE, useRecoilValue, useSetRecoilState } from 'recoil'

export default function ReadCompanyList() {
  const searchKeyword = useRecoilValue(searchKeywordAtom)
  const setTotalCount = useSetRecoilState(totalCountAtom)
  const currentPage = useRecoilValue(currentPageAtom)
  const user = loadItem('user')

  const rowCount = 7
  const currentIndex = (currentPage - 1) * rowCount

  const readCompanyListParameter = {
    cpNo: '0',
    name: '',
    startRow: `${currentIndex}`,
    rowCount: `${rowCount}`,
  }
  const {
    data: {
      data: { list, totalCount },
    },
  } = useRecoilValue(readCompanyListSelector(readCompanyListParameter))

  const resetReadCompanyListSelector = useRecoilRefresher_UNSTABLE(
    readCompanyListSelector(readCompanyListParameter)
  )

  useEffect(() => {
    setTotalCount(totalCount)
    resetReadCompanyListSelector()
  }, [currentIndex, searchKeyword])

  const goModify = (cpNo) => {
    window.location = makeUpdateCompanyUrl(cpNo)
  }
  console.log(list)
  return (
    <>
      {list.map((company) => {
        return (
          <tr key={company.cpNo}>
            <td>
              <span className='only check'>
                <input id='check2' type='checkbox' />
                <label htmlFor='check2'>
                  <span className='hidden'>전체선택</span>
                </label>
              </span>
            </td>
            <td>{company.cpNo}</td>
            <td>{company.cpId}</td>
            <td>{company.name}</td>
            <td>{company.ownerName}</td>
            <td>{company.hp}</td>
            <td>{company.tel}</td>
            <td>{company.fax}</td>
            <td>{formatyyMMddWithDot(new Date())}</td>
            <td>{formatyyMMddWithDot(stringToDate(company.regDate))}</td>
            <td>
              슈퍼어드민
              <br />
              (sa)
            </td>
            <td>
              <button type='button' className='modify' onClick={() => goModify(company.cpNo)}>
                수정
              </button>
            </td>
          </tr>
        )
      })}
    </>
  )
}
