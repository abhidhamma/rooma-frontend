import { makeUpdateAccommodationUrl } from '@constant/locationURLs'
import { readAccommodationListSelector } from '@state/accommodationManagement/accommodation'
import { currentPageAtom, totalCountAtom } from '@state/common/paging'
import { searchKeywordAtom } from '@state/common/search'
import { readCompanyByNoSelector, readCompanyListSelector } from '@state/company/company'
import { getFormDataFromJson } from '@util/common/axiosUtil'
import { loadItem } from '@util/common/localStorage'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useRecoilRefresher_UNSTABLE, useRecoilValue, useSetRecoilState } from 'recoil'
import UseYn from '../../common/UseYn'

export default function ReadAccommodationList() {
  const searchKeyword = useRecoilValue(searchKeywordAtom)
  const setTotalCount = useSetRecoilState(totalCountAtom)
  const currentPage = useRecoilValue(currentPageAtom)
  const user = loadItem('user')

  const rowCount = 7
  const currentIndex = (currentPage - 1) * rowCount

  const readAccommodationListParameter = {
    cpNo: user.cpNo === 1 ? '0' : user.cpNo,
    name: searchKeyword,
    startRow: `${currentIndex}`,
    rowCount: `${rowCount}`,
  }
  const {
    data: {
      data: { list, totalCount },
    },
  } = useRecoilValue(
    readAccommodationListSelector(getFormDataFromJson(readAccommodationListParameter))
  )
  const resetReadAccommodationListSelector = useRecoilRefresher_UNSTABLE(
    readAccommodationListSelector(getFormDataFromJson(readAccommodationListParameter))
  )

  const readCompanyListParameter = {
    cpNo: user.cpNo === 1 ? '0' : undefined,
    name: '',
    startRow: `0`,
    rowCount: `999`,
  }

  const {
    data: {
      data: { list: companyList },
    },
  } = useRecoilValue(readCompanyListSelector(readCompanyListParameter))

  const parameter = {
    cpNo: user.cpNo,
  }
  const result = useRecoilValue(readCompanyByNoSelector(parameter))
  const companyName = result?.data?.data?.name

  useEffect(() => {
    setTotalCount(totalCount)
    resetReadAccommodationListSelector()
    return () => {
      resetReadAccommodationListSelector()
    }
  }, [currentIndex, searchKeyword])
  console.log('list : ', list)
  console.log('companyList : ', companyList)
  return (
    <>
      {list.map((accommodation) => {
        const UPDATE_ACCOMMODATION_URL = makeUpdateAccommodationUrl(accommodation.acNo)
        const textWithLink = (text) => <Link to={UPDATE_ACCOMMODATION_URL}>{text}</Link>
        return (
          <tr key={accommodation.acNo}>
            <td>
              <span className='only check'>
                <input id='check2' type='checkbox' />
                <label htmlFor='check2'>
                  <span className='hidden'>전체선택</span>
                </label>
              </span>
            </td>
            <td>{textWithLink(accommodation.acNo)}</td>
            <td>
              {textWithLink(
                user.cpNo === 1
                  ? companyList.find((company) => company.cpNo === accommodation.cpNo).name
                  : companyName
              )}
            </td>
            <td>{textWithLink(accommodation.name)}</td>
            <td>{textWithLink(accommodation.address1)}</td>
            <td>{textWithLink(accommodation.type)}</td>
            <td>{textWithLink(accommodation.saleStartdate)}</td>
            <td>{textWithLink(accommodation.saleEnddate)}</td>
            <td>{textWithLink(accommodation.regId)}</td>
            <td>
              <UseYn type={'accommodation'} rowData={accommodation} />
            </td>
          </tr>
        )
      })}
    </>
  )
}
