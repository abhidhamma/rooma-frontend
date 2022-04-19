import SideBar from '@components/menu/AccommodationManagement/SideBar'
import { Suspense } from 'react'
import { useNavigate } from 'react-router-dom'
import AccommodationListSelect from '../../common/AccommodationListSelect'
import RoomSetting from './RoomSetting'
import AddOptionForm from '../../common/AddOptionForm'
import {
  breakfastConfigOptionCountAtom,
  etcConfigOptionCountAtom,
} from '@state/accommodationManagement/roomType'
import PictureForm from '../../common/PictureForm'
import SaleDateForm from '../../common/SaleDateForm'
import { ROOMTYPE_LIST_URL } from '@constant/locationURLs'

export default function RoomTypeForm({
  register,
  handleSubmit,
  onSubmit,
  formType,
  titleText,
  watch,
  reset,
  getValues,
  rtNo,
  acNo,
}) {
  console.log('RoomTypeForm called...')
  console.log(watch('roomTotalNum'))
  let navigate = useNavigate()

  return (
    <>
      {/* <!-- S:Container --> */}
      <div id='container' className='split'>
        {/* <!-- S:lnb --> */}
        <SideBar active={1} />
        {/* <!-- E:lnb --> */}
        {/* <!-- S:content --> */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <input type={'hidden'} {...register('cpNo')} />
          <input type={'hidden'} {...register('originPrice')} />
          <input type={'hidden'} {...register('salePrice')} />
          <input type={'hidden'} {...register('providerPrice')} />
          <input type={'hidden'} {...register('roomTypeCd')} />
          <input type={'hidden'} {...register('roomMakeConfig')} />
          <input type={'hidden'} {...register('roomShortDesc')} />
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
                    <input
                      type='text'
                      placeholder='객실타입명을 입력해주세요'
                      {...register('roomTypeName')}
                    />
                  </dd>
                </dl>
              </section>
              <SaleDateForm register={register} reset={reset} getValues={getValues} top={'413'} />
              <RoomSetting
                register={register}
                roomTotalNum={Number(watch('roomTotalNum'))}
                prefix={watch('prefix')}
                roomNumber={watch('roomNumber')}
                suffix={watch('suffix')}
                reset={reset}
                getValues={getValues}
                formType={formType}
                watch={watch}
              />

              <section>
                <dl>
                  <dt>객실구성</dt>
                  <dd>
                    <input type='text' {...register('roomComposition')} />
                    <span className='ex'> (예 : 방2+거실+주방+욕조)</span>
                  </dd>
                </dl>
                <dl>
                  <dt>전망</dt>
                  <dd>
                    <select {...register('viewType')}>
                      <option value={'바다전망'}>바다전망</option>
                      <option value={'산전망'}>산전망</option>
                    </select>
                  </dd>
                </dl>
                <dl>
                  <dt>기준인원</dt>
                  <dd>
                    <select className='auto' {...register('basicPersonNum')}>
                      <option value={'1'}>1명</option>
                      <option value={'2'}>2명</option>
                      <option value={'3'}>3명</option>
                      <option value={'4'}>4명</option>
                    </select>
                    <input type='text' {...register('addPersionConfig')} />
                    <span className='ex'>(예 : 조식포함 , 조식불포함 등 7자 이내)</span>
                  </dd>
                </dl>
                <dl>
                  <dt>최대인원</dt>
                  <dd>
                    <select className='auto' {...register('maxPersionNum')}>
                      <option value={'1'}>1명</option>
                      <option value={'2'}>2명</option>
                      <option value={'3'}>3명</option>
                      <option value={'4'}>4명</option>
                    </select>
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
                      firstInputName={'addBreakfastConfigName'}
                      secondInputName={'addBreakfastConfigPrice'}
                      optionCountAtom={breakfastConfigOptionCountAtom}
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
                      firstInputName={'addEtcConfigName'}
                      secondInputName={'addEtcConfigPrice'}
                      optionCountAtom={etcConfigOptionCountAtom}
                    />
                  </dd>
                </dl>
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
                      </ul>
                    </div>
                  </dd>
                </dl>
                <dl>
                  <dt>객실편의시설</dt>
                  <dd>
                    <input type='text' className='w100' {...register('convInfo')} />
                  </dd>
                </dl>
                <dl>
                  <dt>특이사항</dt>
                  <dd>
                    <input type='text' className='w100' {...register('etcInfo')} />
                  </dd>
                </dl>
              </section>
              {formType === '수정' && (
                <PictureForm
                  formType={formType}
                  watch={watch}
                  register={register}
                  group={'ROOMTYPE'}
                  rtNo={rtNo}
                  acNo={acNo}
                />
              )}
            </div>
            <div className='center mgt_30'>
              <button type='submit' className='btn btn-large purple'>
                {formType}
              </button>
              <button
                onClick={() => cancel(navigate)}
                type='button'
                className='btn btn-large line1'
              >
                취소
              </button>
            </div>
          </div>
          {/* <!-- E:content --> */}
        </form>
      </div>

      {/* <!-- E:Container --> */}
    </>
  )
}
const cancel = (navigate) => {
  navigate(ROOMTYPE_LIST_URL)
}
