import { useNavigate } from 'react-router-dom'
import SideBar from '@components/menu/AccommodationManagement/SideBar'

import AddOptionForm from '../../common/AddOptionForm'
import {
  breakfastOptionCountAtom,
  extOptionCountAtom,
} from '@state/accommodationManagement/accommodation'
import PictureForm from '../../common/PictureForm'
import SaleDateForm from '../../common/SaleDateForm'
import { ACCOMMODATION_LIST_URL } from '@constant/locationURLs'
import Area1 from '../Area1'
import Area2 from '../Area2'
import { sidebarOpenAtom } from '@state/common/common'
import { useRecoilValue } from 'recoil'
import { loadItem } from '@util/common/localStorage'
import { Suspense } from 'react'
import CompanyListSelect from '../CompanyListSelect'
import { readCompanyByNoSelector } from '@state/company/company'

export default function AccommodationForm({
  register,
  handleSubmit,
  onSubmit,
  reset,
  formType,
  getValues,
  watch,
  acNo,
}) {
  const sidebarOpen = useRecoilValue(sidebarOpenAtom)
  let navigate = useNavigate()

  const {
    authorities: [{ authority }],
    cpNo,
  } = loadItem('user')
  const isSuperAdmin = authority === 'ROLE_SUPERMASTER'
  console.log(isSuperAdmin)

  const parameter = {
    cpNo: cpNo,
  }
  const result = useRecoilValue(readCompanyByNoSelector(parameter))
  const company = result?.data?.data

  const daum = window.daum
  const searchAddress = () => {
    new daum.Postcode({
      oncomplete: function (data) {
        Promise.resolve(data)
          .then((o) => {
            const { address } = data
            reset({ ...getValues(), address1: address })

            return new Promise((resolve, reject) => {
              const geocoder = new daum.maps.services.Geocoder()

              geocoder.addressSearch(address, (result, status) => {
                if (status === daum.maps.services.Status.OK) {
                  const { x, y } = result[0]

                  resolve({ positionY: y, positionX: x })
                } else {
                  reject()
                }
              })
            })
          })
          .then((result) => {
            const { positionY, positionX } = result
            reset({ ...getValues(), positionX, positionY })
          })
      },
    }).open()
  }

  return (
    <>
      {/* <!-- S:Container --> */}
      <div id='container' className='split'>
        {/* <!-- S:lnb --> */}
        <SideBar active={0} />
        {/* <!-- E:lnb --> */}
        {/* <!-- S:content --> */}
        <div className='content2' style={{ marginLeft: sidebarOpen ? '250px' : '65px' }}>
          <div className='titWrap'>
            <h3>숙소등록관리</h3>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* 히든 */}
            <input type={'hidden'} {...register('cpNo')} />
            <input type={'hidden'} {...register('nickname')} />
            <input type={'hidden'} {...register('homepage')} />
            <input type={'hidden'} {...register('email')} />
            <input type={'hidden'} {...register('fax')} />
            <input type={'hidden'} {...register('address2')} />
            <input type={'hidden'} {...register('options')} />
            <input type={'hidden'} {...register('addPersionFee')} />
            <input type={'hidden'} {...register('addBreakfastFee')} />
            <input type={'hidden'} {...register('addExtFee')} />
            <input type={'hidden'} {...register('useYn')} />
            <input type={'hidden'} {...register('openYn')} />

            <div className='writeArea v1'>
              <section>
                <dl>
                  <dt>회사명</dt>
                  <dd>
                    {isSuperAdmin && formType === '등록' ? (
                      <Suspense
                        fallback={
                          <select>
                            <option>회사명선택</option>
                          </select>
                        }
                      >
                        <CompanyListSelect register={register} />
                      </Suspense>
                    ) : (
                      <input
                        type='text'
                        disabled
                        {...register('cpName')}
                        defaultValue={company.name}
                      />
                    )}
                  </dd>
                </dl>
                <dl>
                  <dt>등급</dt>
                  <dd>
                    <select {...register('type')}>
                      <option value={'호텔'}>호텔</option>
                      <option value={'모텔'}>모텔</option>
                      <option value={'펜션'}>펜션</option>
                    </select>
                  </dd>
                </dl>
                <dl>
                  <dt>숙소명</dt>
                  <dd>
                    <input
                      type='text'
                      placeholder='숙소명을 입력해주세요'
                      className='w70'
                      {...register('name')}
                      style={{ minWidth: '350px', width: '30%' }}
                    />
                  </dd>
                </dl>
                <dl>
                  <dt>전화번호</dt>
                  <dd>
                    <input type='text' placeholder='전화번호를 입력해주세요' {...register('tel')} />
                  </dd>
                </dl>
                {/* <dl>
                  <dt>SMS연락처</dt>
                  <dd>
                    <input type='text' placeholder='SMS연락처를 입력해주세요' />
                  </dd>
                </dl> */}
                {/* <dl>
                  <dt>우편번호</dt>
                  <dd>
                    <input type='text' placeholder='우편번호를 입력해주세요' />
                  </dd>
                </dl> */}
                <dl>
                  <dt>주소</dt>
                  <dd>
                    <input
                      type='text'
                      className='w50'
                      {...register('address1')}
                      readOnly
                      onClick={searchAddress}
                    />
                    {/* <button type='button'>좌표불러오기</button> */}
                  </dd>
                </dl>
                <dl>
                  <dt>위도</dt>
                  <dd>
                    <input
                      type='text'
                      placeholder='위도를 입력해주세요'
                      {...register('positionX')}
                      readOnly
                    />
                  </dd>
                </dl>
                <dl>
                  <dt>경도</dt>
                  <dd>
                    <input
                      type='text'
                      placeholder='경도를 입력해주세요'
                      {...register('positionY')}
                      readOnly
                    />
                  </dd>
                </dl>
                {/* <dl>
                  <dt>오픈년도</dt>
                  <dd>
                    <input type='text' placeholder='오픈년도를 입력해주세요' />
                  </dd>
                </dl> */}
                <dl>
                  <dt>계좌번호</dt>
                  <dd>
                    <input
                      type='text'
                      placeholder='계좌번호를 입력해주세요'
                      {...register('bankAccount')}
                    />
                  </dd>
                </dl>
              </section>
              <SaleDateForm register={register} reset={reset} getValues={getValues} top={'698'} />

              <section>
                <Area1 register={register} watch={watch} reset={reset} getValues={getValues} />
                <Suspense
                  fallback={
                    <dl>
                      <dt>지역2</dt>
                      <dd>
                        <select>
                          <option>지역선택</option>
                        </select>
                      </dd>
                    </dl>
                  }
                >
                  <Area2 register={register} watch={watch} reset={reset} getValues={getValues} />
                </Suspense>
              </section>
              <section>
                <dl>
                  <dt>기타옵션</dt>
                  <dd>
                    <div className='opt-box'>
                      <ul>
                        <li>
                          <span className='check'>
                            <input id='check01' type='checkbox' {...register('check1')} />
                            <label htmlFor='check01'>조식</label>
                          </span>
                        </li>
                        <li>
                          <span className='check'>
                            <input id='check02' type='checkbox' {...register('check2')} />
                            <label htmlFor='check02'>취사기능</label>
                          </span>
                        </li>
                        <li>
                          <span className='check'>
                            <input id='check03' type='checkbox' {...register('check3')} />
                            <label htmlFor='check03'>풀빌라</label>
                          </span>
                        </li>
                        <li>
                          <span className='check'>
                            <input id='check04' type='checkbox' {...register('check4')} />
                            <label htmlFor='check04'>월풀(자쿠지)</label>
                          </span>
                        </li>
                        <li>
                          <span className='check'>
                            <input id='check05' type='checkbox' {...register('check5')} />
                            <label htmlFor='check05'>화장실2개이상</label>
                          </span>
                        </li>
                        <li>
                          <span className='check'>
                            <input id='check06' type='checkbox' {...register('check6')} />
                            <label htmlFor='check06'>단독(독채)형</label>
                          </span>
                        </li>
                        <li>
                          <span className='check'>
                            <input id='check07' type='checkbox' {...register('check7')} />
                            <label htmlFor='check07'>복층형</label>
                          </span>
                        </li>
                        <li>
                          <span className='check'>
                            <input id='check08' type='checkbox' {...register('check8')} />
                            <label htmlFor='check08'>순수온돌방</label>
                          </span>
                        </li>
                        <li>
                          <span className='check'>
                            <input id='check09' type='checkbox' {...register('check9')} />
                            <label htmlFor='check09'>바베큐</label>
                          </span>
                        </li>
                        <li>
                          <span className='check'>
                            <input id='check10' type='checkbox' {...register('check10')} />
                            <label htmlFor='check10'>수영장</label>
                          </span>
                        </li>
                        <li>
                          <span className='check'>
                            <input id='check11' type='checkbox' {...register('check11')} />
                            <label htmlFor='check11'>인터넷</label>
                          </span>
                        </li>
                        <li>
                          <span className='check'>
                            <input id='check12' type='checkbox' {...register('check12')} />
                            <label htmlFor='check12'>노트북대여</label>
                          </span>
                        </li>
                        <li>
                          <span className='check'>
                            <input id='check13' type='checkbox' {...register('check13')} />
                            <label htmlFor='check13'>픽업유무</label>
                          </span>
                        </li>
                        <li>
                          <span className='check'>
                            <input id='check14' type='checkbox' {...register('check14')} />
                            <label htmlFor='check14'>세미나실</label>
                          </span>
                        </li>
                        <li>
                          <span className='check'>
                            <input id='check15' type='checkbox' {...register('check15')} />
                            <label htmlFor='check15'>노래방</label>
                          </span>
                        </li>
                        <li>
                          <span className='check'>
                            <input id='check16' type='checkbox' {...register('check16')} />
                            <label htmlFor='check16'>애완동물입장가능</label>
                          </span>
                        </li>
                        <li>
                          <span className='check'>
                            <input id='check17' type='checkbox' {...register('check17')} />
                            <label htmlFor='check17'>카페</label>
                          </span>
                        </li>
                        <li>
                          <span className='check'>
                            <input id='check18' type='checkbox' {...register('check18')} />
                            <label htmlFor='check18'>장애인시설</label>
                          </span>
                        </li>
                        <li>
                          <span className='check'>
                            <input id='check19' type='checkbox' {...register('check19')} />
                            <label htmlFor='check19'>통나무숙소</label>
                          </span>
                        </li>
                        <li>
                          <span className='check'>
                            <input id='check20' type='checkbox' {...register('check20')} />
                            <label htmlFor='check20'>산책로</label>
                          </span>
                        </li>
                        <li>
                          <span className='check'>
                            <input id='check21' type='checkbox' {...register('check21')} />
                            <label htmlFor='check21'>골프연습장</label>
                          </span>
                        </li>
                        <li>
                          <span className='check'>
                            <input id='check22' type='checkbox' {...register('check22')} />
                            <label htmlFor='check22'>체험학습장(텃밭)</label>
                          </span>
                        </li>
                      </ul>
                    </div>
                  </dd>
                </dl>
              </section>
              <section>
                <dl className='rowAdd'>
                  <dt>조식 추가</dt>
                  <dd>
                    <div className='row tit'>
                      <div>제목</div>
                      <div>추가요금('숫자'만표시)</div>
                      <div>
                        <span className='hdn'>추가/삭제</span>
                      </div>
                    </div>
                    <div className='row'>
                      <div>
                        <input type='text' {...register('adultBreakfastName')} readOnly />
                      </div>
                      <div>
                        <input type='text' {...register('adultBreakfastPrice')} />
                        <span className='won'>원</span>
                      </div>
                      <div></div>
                    </div>
                    <div className='row'>
                      <div>
                        <input type='text' {...register('childBreakfastName')} readOnly />
                      </div>
                      <div>
                        <input type='text' {...register('childBreakfastPrice')} />
                        <span className='won'>원</span>
                      </div>
                      <div></div>
                    </div>
                    <div className='row'>
                      <div>
                        <input type='text' {...register('infantBreakfastName')} readOnly />
                      </div>
                      <div>
                        <input type='text' {...register('infantBreakfastPrice')} />
                        <span className='won'>원</span>
                      </div>
                      <div></div>
                    </div>
                    <AddOptionForm
                      register={register}
                      firstInputName={'addBreakfastName'}
                      secondInputName={'addBreakfastPrice'}
                      optionCountAtom={breakfastOptionCountAtom}
                    />
                  </dd>
                </dl>
                <dl className='rowAdd'>
                  <dt>기타사항</dt>
                  <dd>
                    <div className='row tit'>
                      <div>제목</div>
                      <div>추가요금('숫자'만표시)</div>
                      <div>
                        <span className='hdn'>추가/삭제</span>
                      </div>
                    </div>
                    <AddOptionForm
                      register={register}
                      firstInputName={'addExtName'}
                      secondInputName={'addExtPrice'}
                      optionCountAtom={extOptionCountAtom}
                    />
                  </dd>
                </dl>
              </section>
              <section>
                <dl className='rowAdd v1'>
                  <dt>체크인/아웃</dt>
                  <dd>
                    <div className='row tit'>
                      <div>체크인</div>
                      <div>체크아웃</div>
                    </div>
                    <div className='row'>
                      <div>
                        <input type='text' {...register('checkinTime')} />
                      </div>
                      <div style={{ marginRight: '0' }}>
                        <input type='text' {...register('checkoutTime')} />
                      </div>
                    </div>
                  </dd>
                </dl>
                <dl className='rowAdd v1'>
                  <dt>숙소 한줄설명</dt>
                  <dd>
                    <div className='row'>
                      <div style={{ maxWidth: 'initial', marginRight: '0' }}>
                        <input type='text' style={{ width: '63%' }} {...register('shortDesc')} />
                      </div>
                    </div>
                  </dd>
                </dl>
                <dl>
                  <dt>숙소안내</dt>
                  <dd>
                    <textarea {...register('description')} style={{ width: '63%' }}></textarea>
                  </dd>
                </dl>
                <dl>
                  <dt>안내/유의사항</dt>
                  <dd>
                    <textarea {...register('notice')} style={{ width: '63%' }}></textarea>
                  </dd>
                </dl>
              </section>
              {/* <section>
                <dl className='rowAdd'>
                  <dt>기본 취소수수료</dt>
                  <dd>
                    <div className='row tit'>
                      <div>입실일까지의 기간</div>
                      <div>취소수수료율</div>
                      <div>
                        <span className='hdn'>추가/삭제</span>
                      </div>
                    </div>
                    <div className='row'>
                      <div className='txt'>
                        <input type='text' />
                        <span>일전까지 취소시</span>
                      </div>
                      <div className='txt'>
                        <input type='text' />
                        <span>% 의 취소수수료 발생</span>
                      </div>
                      <div>
                        <button type='button' className='btn plus'>
                          <span className='hdn'>추가</span>
                        </button>
                        <button type='button' className='btn minus'>
                          <span className='hdn'>삭제</span>
                        </button>
                      </div>
                    </div>
                    <div className='row'>
                      <div className='txt'>
                        <input type='text' />
                        <span>일전까지 취소시</span>
                      </div>
                      <div className='txt'>
                        <input type='text' />
                        <span>% 의 취소수수료 발생</span>
                      </div>
                      <div>
                        <button type='button' className='btn plus'>
                          <span className='hdn'>추가</span>
                        </button>
                        <button type='button' className='btn minus'>
                          <span className='hdn'>삭제</span>
                        </button>
                      </div>
                    </div>
                  </dd>
                </dl>
                <dl>
                  <dt>결제대기기한(T/L) 기준</dt>
                  <dd>
                    <select>
                      <option>예약일선택</option>
                    </select>
                  </dd>
                </dl>
                <dl>
                  <dt>기본 결제대기기한(T/L)</dt>
                  <dd>
                    <input type='text' defaultValue={'3'} />
                    <span className='mgl_10'>일</span>
                    <span className='ex'>
                      (로부터 기한까지 입금하지 않는 경우 예약을 자동으로 취소합니다.)
                    </span>
                  </dd>
                </dl>
              </section> */}
              <section>
                <dl>
                  <dt>태그</dt>
                  <dd>
                    <input
                      type='text'
                      className='w70'
                      style={{ minWidth: 'initial', width: '63%' }}
                    />
                    <p className='ex mgt_5'>
                      ","로 분리하세요. (예 : 커플형펜션,가족형펜션,서귀포,바닷가전망,수영장 등)
                    </p>
                  </dd>
                </dl>
              </section>
              {formType === '수정' && (
                <PictureForm
                  formType={formType}
                  watch={watch}
                  register={register}
                  group={'ACCMD'}
                  rtNo={'0'}
                  acNo={acNo}
                />
              )}
            </div>
            <div className='center mgt_30'>
              <button type='submit' className='btn btn-large purple'>
                {formType}
              </button>
              <button
                type='button'
                className='btn btn-large line1'
                onClick={() => cancel(navigate)}
              >
                취소
              </button>
            </div>
          </form>
        </div>
        {/* <!-- E:content --> */}
      </div>
      {/* <!-- E:Container --> */}
    </>
  )
}

const cancel = (navigate) => {
  navigate(ACCOMMODATION_LIST_URL)
}
