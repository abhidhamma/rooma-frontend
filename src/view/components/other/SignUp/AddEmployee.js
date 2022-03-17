import _ from 'lodash'
import { useState } from 'react'

export default function AddEmployee({ register }) {
  const [employee, setEmployee] = useState(1)

  const increaseEmployee = () => {
    if (employee === 10) {
      alert('직원은 10명까지 등록 가능합니다.')
      return
    }
    setEmployee((prev) => prev + 1)
  }
  const decreaseEmployee = () => {
    if (employee === 1) {
      alert('직원은 1명미만으로 등록할 수 없습니다.')
      return
    }
    setEmployee((prev) => prev - 1)
  }

  const makeEmployeeDom = () => {
    const numberToArray = (employee) => _.range(0, employee, 1)
    const ArrayToDom = (array) =>
      _.map(array, (num) => (
        <div className='row' key={num}>
          <div>
            <input type='text' {...register(`employeeId${num}`)} />
          </div>
          <div>
            <input type='text' {...register(`employeePassword${num}`)} />
          </div>
          <div>
            <input type='text' {...register(`employeeName${num}`)} />
          </div>
          <div>
            {num === 0 && (
              <>
                <button type='button' className='btn plus' onClick={increaseEmployee}>
                  <span className='hdn'>추가</span>
                </button>
                <button type='button' className='btn minus' onClick={decreaseEmployee}>
                  <span className='hdn'>삭제</span>
                </button>
              </>
            )}
          </div>
        </div>
      ))
    const getEmployeeDom = _.flow([numberToArray, ArrayToDom])
    return getEmployeeDom(employee)
  }
  console.log(makeEmployeeDom())
  return (
    <section>
      <dl className='rowAdd'>
        <dt>직원 아이디 추가</dt>
        <dd>
          <div className='row tit'>
            <div>아이디 (영문 or 영문+숫자)</div>
            <div>비밀번호</div>
            <div>담당자명</div>
            <div>
              <span className='hdn'>추가/삭제</span>
            </div>
          </div>
          {/* <div className='row'>
                  <div>
                    <input type='text' {...register('employeeId1')} />
                  </div>
                  <div>
                    <input type='text' {...register('employeePassword1')} />
                  </div>
                  <div>
                    <input type='text' {...register('employeeName1')} />
                  </div>
                  <div>
                    <button type='button' className='btn plus' onClick={increaseEmployee}>
                      <span className='hdn'>추가</span>
                    </button>
                    <button type='button' className='btn minus' onClick={decreaseEmployee}>
                      <span className='hdn'>삭제</span>
                    </button>
                  </div>
                </div> */}
          {/* {makeEmployeeDom()} */}
        </dd>
      </dl>
    </section>
  )
}
