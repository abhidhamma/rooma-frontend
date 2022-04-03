import { PAY_STATUS } from '@constant/constantVariable'
import { getKeyFromValue } from '@util/common/others'
import { useEffect, useState } from 'react'

const payStatusMap = {
  미결제: PAY_STATUS.NOTPAY,
  부분결제: PAY_STATUS.PARTIALPAY,
  결제완료: PAY_STATUS.PAYCOMPLETE,
  환불요청: PAY_STATUS.REFUNDREQUEST,
  환불완료: PAY_STATUS.REFUNDCOMPLETE,
  결제취소: PAY_STATUS.CANCEL,
}

export default function PayStatusSelect({ payStatus, reset, getValues }) {
  const [isCheckInButtonOpen, setIsCheckInButtonOpen] = useState(false)
  const [selectedText, setSelectedText] = useState(getKeyFromValue(payStatusMap, payStatus))

  const changeSelect = (text) => () => {
    setSelectedText(text)
    setIsCheckInButtonOpen(false)
  }

  useEffect(() => {
    reset({ ...getValues(), payStatus: payStatus })
  }, [])
  useEffect(() => {
    reset({ ...getValues(), payStatus: payStatusMap[selectedText] })
  }, [selectedText])

  return (
    <div className='reserv-state'>
      <a
        href='#'
        className={isCheckInButtonOpen ? 'c2 drop down' : 'c2 drop'}
        onClick={() => setIsCheckInButtonOpen(!isCheckInButtonOpen)}
      >
        {selectedText}
      </a>
      <ul className='category-menu c2' style={{ display: isCheckInButtonOpen ? 'block' : 'none' }}>
        <li>
          <a href='#' onClick={changeSelect('미결제')}>
            미결제
          </a>
        </li>
        <li>
          <a href='#' onClick={changeSelect('부분결제')}>
            부분결제
          </a>
        </li>
        <li>
          <a href='#' onClick={changeSelect('결제완료')}>
            결제완료
          </a>
        </li>
        <li>
          <a href='#' onClick={changeSelect('환불요청')}>
            환불요청
          </a>
        </li>
        <li>
          <a href='#' onClick={changeSelect('환불완료')}>
            환불완료
          </a>
        </li>
        <li>
          <a href='#' onClick={changeSelect('결제취소')}>
            결제취소
          </a>
        </li>
      </ul>
    </div>
  )
}
