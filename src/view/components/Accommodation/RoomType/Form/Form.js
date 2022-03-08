import SideBar from '@components/Accommodation/SideBar'
import { useForm } from 'react-hook-form'
import RoomSetting from './RoomSetting'

export default function RoomTypeForm({ submitText }) {
  const defaultValues = {
    numberOfRooms: 0,
    prefix: '디럭스',
    roomNumber: '101',
    suffix: '호',
  }
  const { register, handleSubmit, watch, reset, getValues } = useForm({ defaultValues })
  return (
    <>
      {/* <!-- S:Container --> */}
      <div id='container' className='split'>
        {/* <!-- S:lnb --> */}
        <SideBar active={1} />
        {/* <!-- E:lnb --> */}
        {/* <!-- S:content --> */}
        <form>
          <div className='content2'>
            <div className='titWrap'>
              <h3>객실타입등록관리</h3>
            </div>
            <div className='writeArea v1'>
              <section>
                <dl>
                  <dt>사용여부</dt>
                  <dd>
                    <select className='auto'>
                      <option>사용</option>
                      <option>미사용</option>
                    </select>
                  </dd>
                </dl>
                <dl>
                  <dt>숙소명</dt>
                  <dd>
                    <select>
                      <option>숙소명선택</option>
                    </select>
                  </dd>
                </dl>
                <dl>
                  <dt>객실타입명</dt>
                  <dd>
                    <input type='text' placeholder='객실타입명을 입력해주세요' />
                  </dd>
                </dl>
              </section>
              <RoomSetting
                register={register}
                numberOfRooms={watch('numberOfRooms')}
                prefix={watch('prefix')}
                roomNumber={watch('roomNumber')}
                suffix={watch('suffix')}
                reset={reset}
                getValues={getValues}
              />
              <section>
                <dl>
                  <dt>판매시작일</dt>
                  <dd>
                    <input type='text' />
                    <span className='ex'>예) 2022-01-26</span>
                  </dd>
                </dl>
                <dl>
                  <dt>판매종료일</dt>
                  <dd>
                    <input type='text' />
                    <span className='ex'>
                      예) 2022-01-26 [선택입력] 입력하지 않으면 계속 판매로 간주합니다.
                    </span>
                  </dd>
                </dl>
              </section>
              <section>
                <dl>
                  <dt>객실구성</dt>
                  <dd>
                    <input type='text' />
                    <span className='ex'> (예 : 방2+거실+주방+욕조)</span>
                  </dd>
                </dl>
                <dl>
                  <dt>전망</dt>
                  <dd>
                    <select>
                      <option>바다전망</option>
                    </select>
                  </dd>
                </dl>
                <dl>
                  <dt>기준인원</dt>
                  <dd>
                    <select className='auto'>
                      <option>1명</option>
                    </select>
                    <input type='text' />
                    <span className='ex'>(예 : 조식포함 , 조식불포함 등 7자 이내)</span>
                  </dd>
                </dl>
                <dl>
                  <dt>최대인원</dt>
                  <dd>
                    <select className='auto'>
                      <option>1명</option>
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
                        <input type='text' />
                      </div>
                      <div>
                        <input type='text' />
                        <span className='won'>원</span>
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
                    <div className='row'>
                      <div>
                        <input type='text' />
                      </div>
                      <div>
                        <input type='text' />
                        <span className='won'>원</span>
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
              </section>
              <section>
                <dl>
                  <dt>기타옵션</dt>
                  <dd>
                    <div className='opt-box'>
                      <ul>
                        <li>
                          <span className='check'>
                            <input id='check01' type='checkbox' />
                            <label htmlFor='check01'>조식</label>
                          </span>
                        </li>
                        <li>
                          <span className='check'>
                            <input id='check02' type='checkbox' />
                            <label htmlFor='check02'>취사기능</label>
                          </span>
                        </li>
                        <li>
                          <span className='check'>
                            <input id='check03' type='checkbox' />
                            <label htmlFor='check03'>풀빌라</label>
                          </span>
                        </li>
                        <li>
                          <span className='check'>
                            <input id='check04' type='checkbox' />
                            <label htmlFor='check04'>월풀(자쿠지)</label>
                          </span>
                        </li>
                        <li>
                          <span className='check'>
                            <input id='check05' type='checkbox' />
                            <label htmlFor='check05'>화장실2개이상</label>
                          </span>
                        </li>
                        <li>
                          <span className='check'>
                            <input id='check06' type='checkbox' />
                            <label htmlFor='check06'>단독(독채)형</label>
                          </span>
                        </li>
                        <li>
                          <span className='check'>
                            <input id='check07' type='checkbox' />
                            <label htmlFor='check07'>복층형</label>
                          </span>
                        </li>
                        <li>
                          <span className='check'>
                            <input id='check08' type='checkbox' />
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
                    <input type='text' className='w100' />
                  </dd>
                </dl>
                <dl>
                  <dt>특이사항</dt>
                  <dd>
                    <input type='text' className='w100' />
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
                          <img src='../asset/images/@sample.png' alt='' />
                        </div>
                      </li>
                      <li>
                        <span>추가이미지1</span>
                        <div className='thumnail'>
                          <img src='../../../../asset/images/@sample.png' alt='' />
                          <a href='#'>
                            <span className='hdn'>삭제</span>
                          </a>
                        </div>
                      </li>
                      <li>
                        <span>추가이미지2</span>
                        <div className='thumnail'>
                          <img src='../../../../asset/images/@sample.png' alt='' />
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
              <button type='button' className='btn btn-large purple'>
                {submitText}
              </button>
              <button type='button' className='btn btn-large line1'>
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
