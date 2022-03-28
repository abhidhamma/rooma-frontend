import useApiCallback from '@hook/apiHook/useApiCallback'
import {
  createRoomSelector,
  deleteRoomSelector,
  readRoomListSelector,
  updateRoomSelector,
} from '@state/accommodationManagement/room'
import { getFormDataFromJson } from '@util/common/axiosUtil'
import _ from 'lodash/fp'
import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useRecoilRefresher_UNSTABLE, useRecoilValue } from 'recoil'

export default function RoomSetting({
  register,
  roomTotalNum,
  prefix,
  roomNumber,
  suffix,
  reset,
  getValues,
  formType,
  watch,
}) {
  console.log('RoomSetting called...')
  const selectRef = useRef(null)
  const [tempInputValue, setTempInputValue] = useState('')

  let { roomTypeId } = useParams()
  const rtNo = roomTypeId
  const addRtNo = (data) => (rtNo !== undefined ? { ...data, rtNo } : false)

  const acNo = watch('acNo')
  const saleStartdate = watch('saleStartdate')
  const saleEnddate = watch('saleEnddate')

  const data = {
    cpNo: '1',
    name: '',
    startRow: '0',
    rowCount: '999',
  }
  const {
    data: {
      data: { list: roomList },
    },
  } = useRecoilValue(readRoomListSelector(getFormDataFromJson(addRtNo(data))))
  const resetReadRoomListSelector = useRecoilRefresher_UNSTABLE(
    readRoomListSelector(getFormDataFromJson(addRtNo(data)))
  )

  const createRoomCallback = useApiCallback('createRoomCallback')
  const updateRoomCallback = useApiCallback('updateRoomCallback')
  const deleteRoomCallback = useApiCallback('deleteRoomCallback')

  const createRoom = (defaultRoomName, createType) => {
    let createObject = {
      cpNo: '1',
      acNo,
      rtNo,
      saleStartdate,
      saleEnddate,
      name: defaultRoomName,
      useYn: 'Y',
      description: '',
    }
    createRoomCallback(createRoomSelector(getFormDataFromJson(createObject))).then((result) => {
      const { message } = result
      if (message === '성공') {
        if (createType === 'increaseButton') {
          reset({
            ...getValues(),
            roomTotalNum: roomTotalNum === 99 ? roomTotalNum : roomTotalNum + 1,
          })
          resetReadRoomListSelector()
        } else if (createType === 'selectChange') {
          resetReadRoomListSelector()
        }
      }
    })
  }

  const updateRoom = (targetRmNo, value) => {
    let getCurrentRoom = (targetRmNo) => roomList.find(({ rmNo }) => rmNo === targetRmNo)
    const addRequireValues = (currentRoom) => ({ ...currentRoom, name: value, useYn: 'Y' })

    updateRoomCallback(
      updateRoomSelector(getFormDataFromJson(addRequireValues(getCurrentRoom(targetRmNo))))
    ).then((result) => {
      const { message } = result
      if (message === '성공') {
        alert('변경되었습니다.')
        resetReadRoomListSelector()
      }
    })
  }

  const deleteRoom = (targetRmNo, roomTotalNum, deleteType, roomName) => {
    deleteRoomCallback(deleteRoomSelector(getFormDataFromJson({ rmNo: targetRmNo }))).then(
      (result) => {
        const { message } = result
        if (message === '성공') {
          if (deleteType === 'deleteButton') {
            // reset({ ...getValues(), roomTotalNum: Number(roomTotalNum) - 1, [roomName]: undefined })
            // resetRoomNames(roomTotalNum, getValues, reset)
            // resetReadRoomListSelector()
            window.location.reload()
          } else if (deleteType === 'decreaseRoomTotalNum') {
            reset({
              ...getValues(),
              roomTotalNum: roomTotalNum === 0 ? roomTotalNum : roomTotalNum - 1,
              [`room${roomTotalNum}`]: undefined,
            })
            resetReadRoomListSelector()
          } else if (deleteType === 'selectChange') {
            resetReadRoomListSelector()
          }
        }
      }
    )
  }

  useEffect(() => {
    handleRoomNameArray(roomTotalNum, prefix, roomNumber, suffix, 'INIT', reset, getValues)
  }, [])
  useEffect(() => {
    createRooms(roomTotalNum, reset, getValues)
  }, [roomTotalNum])

  useEffect(() => {
    handleRoomNameArray(roomTotalNum, prefix, roomNumber, suffix, 'CHANGE_NAMING', reset, getValues)
  }, [prefix, roomNumber, suffix])

  const createRooms = (roomTotalNum) => {
    if (formType === '수정') {
      const createLength = roomTotalNum - roomList.length
      if (createLength === 0) {
        return
      } else if (createLength > 0) {
        const isCreateRooms = window.confirm('새 객실을 만드시겠습니까?')

        if (isCreateRooms) {
          console.log('추가될 방 개수' + createLength)

          for (let i = roomList.length + 1; i <= roomTotalNum; i++) {
            const defaultRoomName = `${prefix}${
              roomNumber === '' ? roomNumber : Number(roomNumber) + Number(i)
            }${suffix}`
            console.log('버그예상위치')
            console.log(defaultRoomName)
            const createType = 'selectChange'
            createRoom(defaultRoomName, createType)
          }

          handleRoomNameArray(
            roomTotalNum,
            prefix,
            roomNumber,
            suffix,
            'CHANGE_ROOM_COUNT',
            reset,
            getValues
          )
        } else {
          reset({ ...getValues(), roomTotalNum: roomList.length })
        }
      } else if (createLength < 0) {
        const isDeleteRooms = window.confirm('객실을 삭제하시겠습니까?')

        if (isDeleteRooms) {
          console.log('삭제될 방 개수' + createLength * -1)

          for (let i = roomList.length; i > roomTotalNum; i--) {
            const rmNo = roomList[i - 1]?.rmNo
            console.log(rmNo)
            console.log(i)
            console.log(roomTotalNum)
            const deleteType = 'selectChange'
            deleteRoom(rmNo, roomTotalNum, deleteType)
          }

          handleRoomNameArray(
            roomTotalNum,
            prefix,
            roomNumber,
            suffix,
            'CHANGE_ROOM_COUNT',
            reset,
            getValues
          )
        } else {
          reset({ ...getValues(), roomTotalNum: roomList.length })
        }
      }
    } else {
      handleRoomNameArray(
        roomTotalNum,
        prefix,
        roomNumber,
        suffix,
        'CHANGE_ROOM_COUNT',
        reset,
        getValues
      )
    }
  }

  const increaseRoomCount = () => {
    reset({
      ...getValues(),
      roomTotalNum: roomTotalNum === 99 ? roomTotalNum : roomTotalNum + 1,
    })
    // if (formType === '수정') {
    //   const isCreate = window.confirm('새 객실을 만드시겠습니까?')

    //   if (isCreate) {
    //     const defaultRoomName = `${prefix}${
    //       roomNumber === '' ? roomNumber : Number(roomNumber) + Number(roomTotalNum)
    //     }${suffix}`
    //     const createType = 'increaseButton'
    //     console.log(defaultRoomName)
    //     createRoom(defaultRoomName, createType)
    //   }
    // } else {
    //   reset({
    //     ...getValues(),
    //     roomTotalNum: roomTotalNum === 99 ? roomTotalNum : roomTotalNum + 1,
    //   })
    // }
  }
  const decreaseRoomCount = () => {
    reset({
      ...getValues(),
      roomTotalNum: roomTotalNum === 0 ? roomTotalNum : roomTotalNum - 1,
    })
    // if (formType === '수정') {
    //   const lastRoom = roomList[roomList.length - 1]
    //   const isDelete = window.confirm(`${getValues(`room${roomTotalNum}`)}객실을 삭제하시겠습니까?`)
    //   if (isDelete) {
    //     const rmNo = lastRoom.rmNo
    //     const deleteType = 'decreaseRoomTotalNum'
    //     deleteRoom(rmNo, roomTotalNum, deleteType)
    //   }
    // } else {
    //   reset({
    //     ...getValues(),
    //     roomTotalNum: roomTotalNum === 0 ? roomTotalNum : roomTotalNum - 1,
    //   })
    // }
  }

  const setValue = (name) => (e) => {
    const value = e.target.value
    reset({
      ...getValues(),
      [name]: value,
    })
  }

  const { ref, ...rest } = register('roomTotalNum')

  const handleBlur = (roomName, rmNo) => (event) => {
    const currentInputValue = event.target.value
    if (tempInputValue !== currentInputValue) {
      const isUpdate = window.confirm('객실명을 변경하시겠습니까?')
      if (isUpdate) {
        updateRoom(rmNo, currentInputValue)
      } else {
        reset({ ...getValues(), [roomName]: tempInputValue })
      }
    }
  }

  const savePrevValue = (event) => setTempInputValue(event.target.value)

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
                defaultValue={roomTotalNum}
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
            {formType === '등록' && (
              <>
                <div className='word'>
                  <div className='row tit'>
                    <div>앞단어</div>
                    <div>시작방번호</div>
                    <div>끝단어</div>
                  </div>
                  <div className='row'>
                    <div>
                      <input
                        type='text'
                        {...register('prefix')}
                        onChange={setValue('prefix')}
                        placeholder={'디럭스'}
                      />
                    </div>
                    <div>
                      <input
                        type='text'
                        {...register('roomNumber')}
                        onChange={setValue('roomNumber')}
                        placeholder={'101'}
                      />
                    </div>
                    <div>
                      <input
                        type='text'
                        {...register('suffix')}
                        onChange={setValue('suffix')}
                        placeholder={'호'}
                      />
                    </div>
                  </div>
                </div>
                <p className='ex'>
                  숫자 객실명인 경우 간편하게 자동 지정해줍니다.
                  <br />
                  {`입력예: 1) '디럭스', 2) '102', 3) '호' => 디럭스102호, 디럭스103호, 디럭스104호, 디럭스105호...`}
                </p>
              </>
            )}
            <div className='roomName'>
              {makeRooms(
                roomTotalNum,
                register,
                getValues,
                reset,
                deleteRoom,
                updateRoom,
                formType,
                handleBlur,
                savePrevValue,
                roomList
              )}
            </div>
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

const resetRoomNames = (roomTotalNum, getValues, reset) => {
  //undefined인거 걸러내고 array에 넣어서 순서대로 담아준다
  const tempArr = []

  for (let i = 1; i <= roomTotalNum + 1; i++) {
    const roomName = `room${i}`
    if (getValues()[roomName] !== undefined) {
      tempArr.push(getValues()[roomName])
    }
  }

  for (let i = 1; i <= roomTotalNum; i++) {
    const roomName = `room${i}`
    reset({ ...getValues(), [roomName]: tempArr[i - 1] })
  }
}

const makeRooms = (
  roomTotalNum,
  register,
  getValues,
  reset,
  deleteRoom,
  updateRoom,
  formType,
  handleBlur,
  savePrevValue,
  roomList
) => {
  const removeCurrentInput = (roomName, formType, rmNo) => {
    if (formType === '등록') {
      reset({ ...getValues(), roomTotalNum: Number(roomTotalNum) - 1, [roomName]: undefined })
      resetRoomNames(roomTotalNum, getValues, reset)
    } else {
      const isDelete = window.confirm(`${getValues(roomName)}을(를) 삭제하시겠습니까?`)
      console.log(isDelete)
      if (isDelete) {
        const deleteType = 'deleteButton'
        deleteRoom(rmNo, roomTotalNum, deleteType, roomName)
      }
    }
  }

  const mapRoom = _.map((number) => {
    const roomName = `room${number}`
    console.log(roomList, number)
    const rmNo = roomList[number - 1]?.rmNo
    return (
      <div key={number}>
        <span>객실명{number}</span>
        <input
          type='text'
          {...register(roomName)}
          defaultValue={getValues[roomName]}
          style={{ marginRight: '30px', padding: '0 10px' }}
          onBlur={handleBlur(roomName, rmNo)}
          onFocus={savePrevValue}
        />
        <button
          type='button'
          className='delete'
          style={{ right: '6px' }}
          onClick={() => removeCurrentInput(roomName, formType, rmNo)}
        >
          <span className='hidden'>삭제</span>
        </button>
      </div>
    )
  })
  return _.flow(count, mapRoom)(Number(roomTotalNum) + 1)
}

const handleRoomNameArray = (roomTotalNum, prefix, roomNumber, suffix, type, reset, getValues) => {
  for (let i = 1; i <= roomTotalNum; i++) {
    const roomName = `room${i}`
    const value = getValues()[roomName]
    const defaultValue = `${prefix}${
      roomNumber === '' ? roomNumber : Number(roomNumber) + Number(i - 1)
    }${suffix}`

    //무조건 defalutValue를 넣는경우
    if (type === 'INIT') {
    } else if (type === 'CHANGE_NAMING') {
      reset({ ...getValues(), [roomName]: defaultValue })
    } else if (type === 'CHANGE_ROOM_COUNT') {
      if (value === undefined || value === '') {
        reset({ ...getValues(), [roomName]: defaultValue })
      } else if (value !== defaultValue) {
        reset({ ...getValues(), [roomName]: value })
      } else {
      }
    }
  }
}
