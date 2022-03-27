import image from '@asset/images/@sample.png'
export default function PictureForm({ formType }) {
  return (
    <section>
      <dl>
        <dt>사진</dt>
        {formType === '등록' ? (
          <dd>
            <ul className='txtlist'>
              <li>사진은 등록후 수정페이지에서 추가할 수 있습니다.</li>
            </ul>
          </dd>
        ) : (
          <dd>
            <ul className='imgList'>
              {/* <li>
                <span>
                  <em>[대표]</em>대표이미지
                </span>
                <div className='thumnail'>
                  <img src={image} alt='' />
                </div>
              </li>
              <li>
                <span>추가이미지1</span>
                <div className='thumnail'>
                  <img src={image} alt='' />
                  <a href='#'>
                    <span className='hdn'>삭제</span>
                  </a>
                </div>
              </li>
              <li>
                <span>추가이미지2</span>
                <div className='thumnail'>
                  <img src={image} alt='' />
                  <a href='#'>
                    <span className='hdn'>삭제</span>
                  </a>
                </div>
              </li> */}
              <li>
                <div className='thumnail'>
                  <a href='#' className='thumnailAdd'>
                    <input type='file' />
                    <span className='추가'></span>
                  </a>
                </div>
              </li>
            </ul>
            <ul className='mgt_20 txtlist'>
              <li>- 권장 크기 : 1000 x 1000</li>
              <li>- 추가이미지는 최대 7개까지 설정할 수 있습니다.</li>
              <li>- 이미지는 JPG, PNG 형식의 파일로 이미지 1장당 3MB이하로 등록이 가능합니다.</li>
            </ul>
          </dd>
        )}
      </dl>
    </section>
  )
}
