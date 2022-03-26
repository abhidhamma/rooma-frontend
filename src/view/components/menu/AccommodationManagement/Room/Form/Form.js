import SideBar from '@components/menu/AccommodationManagement/SideBar'
import { Suspense } from 'react'
import { useNavigate } from 'react-router-dom'
import AccommodationListSelect from '../../common/AccommodationListSelect'
import RoomTypeListSelect from '../../common/RoomTypeListSelect'
import image from '@asset/images/@sample.png'

export default function RoomForm({
  submitText,
  titleText,
  register,
  handleSubmit,
  onSubmit,
  watch,
}) {
  let navigate = useNavigate()
  return (
    // <!-- S:Container -->
    <div id='container' className='split'>
      {/* <!-- S:lnb --> */}
      <SideBar active={2} />
      {/* <!-- E:lnb --> */}
      {/* <!-- S:content --> */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type={'hidden'} {...register('cpNo')} />
        <div className='content2'>
          <div className='titWrap'>
            <h3>{titleText}</h3>
          </div>
          <div className='writeArea v1'>
            <section>
              <dl>
                <dt>사용여부</dt>
                <dd>
                  <select className='auto' {...register('useYn')}>
                    <option value={'Y'}>사용</option>
                    <option value={'N'}>미사용</option>
                  </select>
                </dd>
              </dl>
              <dl>
                <dt>숙소명</dt>
                <dd>
                  <Suspense
                    fallback={
                      <select>
                        <option>숙소명선택</option>
                      </select>
                    }
                  >
                    <AccommodationListSelect register={register} />
                  </Suspense>
                </dd>
              </dl>
              <dl>
                <dt>객실타입명</dt>
                <dd>
                  <Suspense
                    fallback={
                      <select>
                        <option>객실타입명선택</option>
                      </select>
                    }
                  >
                    <RoomTypeListSelect register={register} watch={watch} />
                  </Suspense>
                </dd>
              </dl>
              <dl>
                <dt>객실명</dt>
                <dd>
                  <input type='text' placeholder='객실명을 입력해주세요' {...register('name')} />
                </dd>
              </dl>
            </section>
            <section>
              <dl>
                <dt>판매시작일</dt>
                <dd>
                  <input type='text' {...register('saleStartdate')} />
                  <span className='ex'>예) 2022-01-26</span>
                </dd>
              </dl>
              <dl>
                <dt>판매종료일</dt>
                <dd>
                  <input type='text' {...register('saleEnddate')} />
                  <span className='ex'>
                    예) 2022-01-26 [선택입력] 입력하지 않으면 계속 판매로 간주합니다.
                  </span>
                </dd>
              </dl>
            </section>
            <section>
              <dl>
                <dt>사진</dt>
                <dd>
                  <ul className='imgList'>
                    <li>
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
                    </li>
                    <li>
                      <span>추가이미지2</span>
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
                    <li>
                      - 이미지는 JPG, PNG 형식의 파일로 이미지 1장당 3MB이하로 등록이 가능합니다.
                    </li>
                  </ul>
                </dd>
              </dl>
            </section>
          </div>
          <div className='center mgt_30'>
            <button type='submit' className='btn btn-large purple'>
              {submitText}
            </button>
            <button onClick={() => cancel(navigate)} type='button' className='btn btn-large line1'>
              취소
            </button>
          </div>
        </div>
      </form>
      {/* <!-- E:content --> */}
    </div>
    // <!-- E:Container -->
  )
}
const cancel = (navigate) => {
  navigate('/accommodationManagement/room')
}
