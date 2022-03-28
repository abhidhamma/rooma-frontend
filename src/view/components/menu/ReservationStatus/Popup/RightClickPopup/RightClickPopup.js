import { rightClickPopupAtom } from '@state/reservationStatus/reservationStatus'
import { useRecoilValue } from 'recoil'

export default function RightClickPopUp() {
  const css = useRecoilValue(rightClickPopupAtom)
  return (
    <div class='state-select' style={{ ...css }}>
      <ul>
        <li>
          <a href='#'>예약등록/변경</a>
        </li>
        <li>
          <a href='#'>입실</a>
        </li>
        <li>
          <a href='#'>퇴실</a>
        </li>
        <li>
          <a href='#'>객실잠금</a>
        </li>
        <li>
          <a href='#'>객실잠금해제</a>
        </li>
      </ul>
    </div>
  )
}
