import useApiCallback from '@hook/apiHook/useApiCallback'
import { deleteMemberSelector, readMemberListSelector } from '@state/company/company'
import { getFormDataFromJson } from '@util/common/axiosUtil'
import { useParams } from 'react-router-dom'
import { useRecoilRefresher_UNSTABLE, useRecoilValue } from 'recoil'

export default function ReadMemberList({ cpNo }) {
  const deleteMemberCallback = useApiCallback('deleteMember')

  const {
    data: { data: memberList },
  } = useRecoilValue(readMemberListSelector({ cpNo }))
  const resetReadMemberList = useRecoilRefresher_UNSTABLE(readMemberListSelector({ cpNo }))

  const roleMap = {
    '01': '마스터',
    '02': '예약담당직원',
    '03': '정산담당직원',
    '04': '일반업무직원',
    '05': '청소직원',
  }
  const deleteMember = (mbNo) => {
    const confirm = window.confirm('직원아이디를 삭제하시겠습니까?')

    if (confirm) {
      deleteMemberCallback(deleteMemberSelector(getFormDataFromJson({ cpNo, mbNo }))).then(
        (result) => {
          const { message } = result
          if (message === '성공') {
            resetReadMemberList()
          }
        }
      )
    }
  }

  return (
    <>
      {memberList.map(({ mbNo, name, mbId, role, memo }) => (
        <tr key={mbNo}>
          <td className='center'>{mbId}</td>
          <td className='center'>{name}</td>
          <td className='center'>{roleMap[role]}</td>
          <td className='center'>{memo === '' || memo === null ? '-' : memo}</td>
          <td className='center'>
            <a href='#' className='btn del ' onClick={() => deleteMember(mbNo)}>
              삭제
            </a>
          </td>
        </tr>
      ))}
    </>
  )
}
