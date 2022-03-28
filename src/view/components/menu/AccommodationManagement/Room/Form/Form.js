import SideBar from '@components/menu/AccommodationManagement/SideBar'
import { Suspense } from 'react'
import { useNavigate } from 'react-router-dom'
import AccommodationListSelect from '../../common/AccommodationListSelect'
import RoomTypeListSelect from '../../common/RoomTypeListSelect'
import PictureForm from '../../common/PictureForm'
import SaleDateForm from '../../common/SaleDateForm'

export default function RoomForm({
  formType,
  titleText,
  register,
  handleSubmit,
  onSubmit,
  watch,
  reset,
  getValues,
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
            <SaleDateForm
              register={register}
              reset={reset}
              getValues={getValues}
              top={'470'}
              left={'490'}
            />
            <PictureForm formType={formType} />
          </div>
          <div className='center mgt_30'>
            <button type='submit' className='btn btn-large purple'>
              {formType}
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
