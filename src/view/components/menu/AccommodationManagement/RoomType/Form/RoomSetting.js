import _ from 'lodash/fp'
import { useEffect, useRef } from 'react'

export default function RoomSetting({
  register,
  numberOfRooms,
  prefix,
  roomNumber,
  suffix,
  reset,
  getValues,
}) {
  console.log('RoomSetting rendered...')
  const selectRef = useRef(null)

  useEffect(() => {
    handleRoomNameArray(numberOfRooms, prefix, roomNumber, suffix, 'INIT', reset, getValues)
  }, [])
  useEffect(() => {
    handleRoomNameArray(
      numberOfRooms,
      prefix,
      roomNumber,
      suffix,
      'CHANGE_ROOM_COUNT',
      reset,
      getValues
    )
  }, [numberOfRooms])

  useEffect(() => {
    handleRoomNameArray(
      numberOfRooms,
      prefix,
      roomNumber,
      suffix,
      'CHANGE_NAMING',
      reset,
      getValues
    )
  }, [prefix, roomNumber, suffix])

  const increaseRoomCount = () => {
    reset({
      ...getValues(),
      numberOfRooms: numberOfRooms === 99 ? numberOfRooms : numberOfRooms + 1,
    })
  }
  const decreaseRoomCount = () => {
    reset({
      ...getValues(),
      numberOfRooms: numberOfRooms === 0 ? numberOfRooms : numberOfRooms - 1,
    })
  }

  const { ref, ...rest } = register('numberOfRooms')
  console.log('variables')
  console.log(numberOfRooms)
  console.log(prefix)
  console.log(roomNumber)
  console.log(suffix)
  console.log(getValues())

  return (
    <section>
      <dl className='rowAdd'>
        <dt>객실설정</dt>
        <dd>
          <div className='roomSetting'>
            <div className='sell-num mgb_20'>
              <span>판매가능객실</span>
              <select
                {...rest}
                ref={(e) => {
                  ref(e)
                  selectRef.current = e
                }}
                value={numberOfRooms}
              >
                <option key={0} value={0}>
                  선택
                </option>
                {makeOptions(99)}
              </select>
              <div>
                <button type='button' className='btn plus' onClick={increaseRoomCount}>
                  <span className='hdn'>추가</span>
                </button>
                <button type='button' className='btn minus' onClick={decreaseRoomCount}>
                  <span className='hdn'>삭제</span>
                </button>
              </div>
            </div>
            <div className='word'>
              <div className='row tit'>
                <div>앞단어</div>
                <div>시작방번호</div>
                <div>끝단어</div>
              </div>
              <div className='row'>
                <div>
                  <input type='text' {...register('prefix')} />
                </div>
                <div>
                  <input type='text' {...register('roomNumber')} />
                </div>
                <div>
                  <input type='text' {...register('suffix')} />
                </div>
              </div>
            </div>
            <p className='ex'>
              숫자 객실명인 경우 간편하게 자동 지정해줍니다.
              <br />
              {`입력예: 1) '디럭스', 2) '102', 3) '호' => 디럭스102호, 디럭스103호, 디럭스104호, 디럭스105호...`}
            </p>
            <div className='roomName'>{makeRooms(numberOfRooms, register, getValues, reset)}</div>
          </div>
        </dd>
      </dl>
    </section>
  )
}

const count = _.range(1)

const makeOptions = (maxRoomCount) => {
  const mapOption = _.map((number) => (
    <option key={number} value={number}>
      {number}개
    </option>
  ))
  return _.flow(count, mapOption)(maxRoomCount + 1)
}

const makeRooms = (numberOfRooms, register, getValues, reset) => {
  console.log('makeRooms called...')
  const resetRoomNames = () => {
    //undefined인거 걸러내고 array에 넣어서 순서대로 담아준다
    const tempArr = []

    for (let i = 1; i <= numberOfRooms + 1; i++) {
      const roomName = `room${i}`
      if (getValues()[roomName] !== undefined) {
        tempArr.push(getValues()[roomName])
      }
    }

    for (let i = 1; i <= numberOfRooms; i++) {
      const roomName = `room${i}`
      reset({ ...getValues(), [roomName]: tempArr[i - 1] })
    }
  }

  const removeCurrentInput = (roomName) => {
    reset({ ...getValues(), numberOfRooms: Number(numberOfRooms) - 1, [roomName]: undefined })
    resetRoomNames()
  }

  const mapRoom = _.map((number) => {
    const roomName = `room${number}`
    return (
      <div key={number}>
        <span>객실명{number}</span>
        <input
          type='text'
          {...register(roomName)}
          defaultValue={getValues[roomName]}
          style={{ marginRight: '30px', padding: '0 10px' }}
        />
        <button
          type='button'
          className='delete'
          style={{ right: '6px' }}
          onClick={() => removeCurrentInput(roomName)}
        >
          <span className='hidden'>삭제</span>
        </button>
      </div>
    )
  })
  return _.flow(count, mapRoom)(Number(numberOfRooms) + 1)
}

const handleRoomNameArray = (numberOfRooms, prefix, roomNumber, suffix, type, reset, getValues) => {
  for (let i = 1; i <= numberOfRooms; i++) {
    const roomName = `room${i}`
    const value = getValues()[roomName]
    const defaultValue = `${prefix} ${
      roomNumber === '' ? roomNumber : Number(roomNumber) + Number(i - 1)
    }${suffix}`

    console.log(type)
    console.log(defaultValue)
    //무조건 defalutValue를 넣는경우
    if (type === 'INIT' || type === 'CHANGE_NAMING') {
      reset({ ...getValues(), [roomName]: defaultValue })
    } else if (type === 'CHANGE_ROOM_COUNT') {
      if (value === undefined || value === '') {
        reset({ ...getValues(), [roomName]: defaultValue })
      } else if (value !== defaultValue) {
      } else {
      }
    }
  }
}