import { Link } from 'react-router-dom'

export default function ButtonGroup({ addText, addHref }) {
  return (
    <div className='btnArea two mgt_20'>
      <div>
        <a href='#' className='btn btn-middle line1'>
          선택삭제
        </a>
        <a href='#' className='btn btn-middle line1'>
          선택복사
        </a>
        <a href='#' className='btn btn-middle line1'>
          선택이동
        </a>
      </div>
      <div>
        <Link to={addHref} className={'btn btn-middle purple'}>
          {addText}
        </Link>
      </div>
    </div>
  )
}
