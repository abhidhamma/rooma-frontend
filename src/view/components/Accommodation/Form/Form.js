import { useNavigate } from 'react-router-dom'
import SideBar from '../SideBar'

export default function AccommodationForm({ register, handleSubmit, onSubmit, submitText }) {
  let navigate = useNavigate()
  return (
    <>
      {/* <!-- S:Container --> */}
      <div id='container' className='split'>
        {/* <!-- S:lnb --> */}
        <SideBar />
        {/* <!-- E:lnb --> */}
        {/* <!-- S:content --> */}
        <div className='content2'>
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
                    <input type='text' defaultValue={'롯데호텔'} disabled />
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
                    <input type='text' placeholder='숙소명을 입력해주세요' className='w70' {...register('name')} />
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
                    <input type='text' className='w50' {...register('address1')} />
                    <button type='button'>좌표불러오기</button>
                  </dd>
                </dl>
                <dl>
                  <dt>위도</dt>
                  <dd>
                    <input type='text' placeholder='위도를 입력해주세요' {...register('positionX')} />
                  </dd>
                </dl>
                <dl>
                  <dt>경도</dt>
                  <dd>
                    <input type='text' placeholder='경도를 입력해주세요' {...register('positionY')} />
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
                    <input type='text' placeholder='계좌번호를 입력해주세요' {...register('bankAccount')} />
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
                    <span className='ex'>예) 2022-01-26 [선택입력] 입력하지 않으면 계속 판매로 간주합니다.</span>
                  </dd>
                </dl>
              </section>
              <section>
                <dl>
                  <dt>지역1</dt>
                  <dd>
                    <select {...register('area1')}>
                      <option value={'1'}>1</option>
                    </select>
                  </dd>
                </dl>
                <dl>
                  <dt>지역2</dt>
                  <dd>
                    <select {...register('area2')}>
                      <option value={'2'}>2</option>
                    </select>
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
                        <li>
                          <span className='check'>
                            <input id='check09' type='checkbox' />
                            <label htmlFor='check09'>바베큐</label>
                          </span>
                        </li>
                        <li>
                          <span className='check'>
                            <input id='check10' type='checkbox' />
                            <label htmlFor='check10'>수영장</label>
                          </span>
                        </li>
                        <li>
                          <span className='check'>
                            <input id='check11' type='checkbox' />
                            <label htmlFor='check11'>인터넷</label>
                          </span>
                        </li>
                        <li>
                          <span className='check'>
                            <input id='check12' type='checkbox' />
                            <label htmlFor='check12'>노트북대여</label>
                          </span>
                        </li>
                        <li>
                          <span className='check'>
                            <input id='check13' type='checkbox' />
                            <label htmlFor='check13'>픽업유무</label>
                          </span>
                        </li>
                        <li>
                          <span className='check'>
                            <input id='check14' type='checkbox' />
                            <label htmlFor='check14'>세미나실</label>
                          </span>
                        </li>
                        <li>
                          <span className='check'>
                            <input id='check15' type='checkbox' />
                            <label htmlFor='check15'>노래방</label>
                          </span>
                        </li>
                        <li>
                          <span className='check'>
                            <input id='check16' type='checkbox' />
                            <label htmlFor='check16'>애완동물입장가능</label>
                          </span>
                        </li>
                        <li>
                          <span className='check'>
                            <input id='check17' type='checkbox' />
                            <label htmlFor='check17'>카페</label>
                          </span>
                        </li>
                        <li>
                          <span className='check'>
                            <input id='check18' type='checkbox' />
                            <label htmlFor='check18'>장애인시설</label>
                          </span>
                        </li>
                        <li>
                          <span className='check'>
                            <input id='check19' type='checkbox' />
                            <label htmlFor='check19'>통나무숙소</label>
                          </span>
                        </li>
                        <li>
                          <span className='check'>
                            <input id='check20' type='checkbox' />
                            <label htmlFor='check20'>산책로</label>
                          </span>
                        </li>
                        <li>
                          <span className='check'>
                            <input id='check21' type='checkbox' />
                            <label htmlFor='check21'>골프연습장</label>
                          </span>
                        </li>
                        <li>
                          <span className='check'>
                            <input id='check22' type='checkbox' />
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
                      <div>
                        <input type='text' {...register('checkoutTime')} />
                      </div>
                    </div>
                  </dd>
                </dl>
                <dl>
                  <dt>숙소안내</dt>
                  <dd>
                    <textarea {...register('description')} defaultValue={''}></textarea>
                  </dd>
                </dl>
                <dl>
                  <dt>안내/유의사항</dt>
                  <dd>
                    <textarea {...register('notice')} defaultValue={''}></textarea>
                  </dd>
                </dl>
              </section>
              <section>
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
                    <span className='ex'>(로부터 기한까지 입금하지 않는 경우 예약을 자동으로 취소합니다.)</span>
                  </dd>
                </dl>
              </section>
              <section>
                <dl>
                  <dt>태그</dt>
                  <dd>
                    <input type='text' className='w70' />
                    <p className='ex mgt_5'>","로 분리하세요. (예 : 커플형펜션,가족형펜션,서귀포,바닷가전망,수영장 등)</p>
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
                          <img src='../images/@sample.png' alt='' />
                        </div>
                      </li>
                      <li>
                        <span>추가이미지1</span>
                        <div className='thumnail'>
                          <img src='../images/@sample.png' alt='' />
                          <a href='#'>
                            <span className='hdn'>삭제</span>
                          </a>
                        </div>
                      </li>
                      <li>
                        <span>추가이미지2</span>
                        <div className='thumnail'>
                          <img src='../images/@sample.png' alt='' />
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
                      <li>- 이미지는 JPG, PNG 형식의 파일로 이미지 1장당 3MB이하로 등록이 가능합니다.</li>
                    </ul>
                  </dd>
                </dl>
              </section>
            </div>
            <div className='center mgt_30'>
              <button type='submit' className='btn btn-large purple'>
                {submitText}
              </button>
              <button type='button' className='btn btn-large line1' onClick={() => cancel(navigate)}>
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
  navigate('/accommodation')
}
