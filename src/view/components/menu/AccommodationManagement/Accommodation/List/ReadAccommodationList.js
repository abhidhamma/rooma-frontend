import { makeUpdateAccommodationUrl } from '@constant/locationURLs'
import { readAccommodationListSelector } from '@state/accommodation/accommodation'
import { currentPageAtom, totalCountAtom } from '@state/common/paging'
import { searchKeywordAtom } from '@state/common/search'
import { getFormDataFromJson } from '@util/common/axiosUtil'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useRecoilRefresher_UNSTABLE, useRecoilValue, useSetRecoilState } from 'recoil'
import UseYn from '../../common/UseYn'

export default function ReadAccommodationList() {
  const searchKeyword = useRecoilValue(searchKeywordAtom)
  const setTotalCount = useSetRecoilState(totalCountAtom)
  const currentPage = useRecoilValue(currentPageAtom)

  const rowCount = 7
  const currentIndex = (currentPage - 1) * rowCount

  const data = {
    cpNo: '1',
    name: searchKeyword,
    startRow: `${currentIndex}`,
    rowCount: `${rowCount}`,
  }
  const {
    data: {
      data: { list, totalCount },
    },
  } = useRecoilValue(readAccommodationListSelector(getFormDataFromJson(data)))
  const resetReadAccommodationListSelector = useRecoilRefresher_UNSTABLE(
    readAccommodationListSelector(getFormDataFromJson(data))
  )
  console.log('selector called!')
  console.log(list, totalCount)
  useEffect(() => {
    setTotalCount(totalCount)
    resetReadAccommodationListSelector()
  }, [currentIndex, searchKeyword])
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
            <td>{textWithLink('신라호텔')}</td>
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
