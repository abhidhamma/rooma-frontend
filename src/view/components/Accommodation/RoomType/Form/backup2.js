// import _ from 'lodash/fp'
// import { useEffect, useRef, useState } from 'react'

// export default function RoomSetting({
//   register,
//   numberOfRooms,
//   prefix,
//   roomNumber,
//   suffix,
//   reset,
//   getValues,
// }) {
//   const [roomCount, setRoomCount] = useState(1)
//   const [roomNameArray, setRoomNameArray] = useState([])
//   const selectRef = useRef(null)

//   useEffect(() => {
//     handleRoomNameArray(
//       roomCount,
//       roomNameArray,
//       setRoomNameArray,
//       prefix,
//       roomNumber,
//       suffix,
//       false,
//       reset,
//       getValues
//     )
//   }, [roomCount])

//   useEffect(() => {
//     handleRoomNameArray(
//       roomCount,
//       roomNameArray,
//       setRoomNameArray,
//       prefix,
//       roomNumber,
//       suffix,
//       true,
//       reset,
//       getValues
//     )
//   }, [prefix, roomNumber, suffix])

//   const increaseRoomCount = () => {
//     setRoomCount((prev) => (prev === 99 ? prev : prev + 1))
//     reset({
//       ...getValues(),
//       numberOfRooms: numberOfRooms === 99 ? numberOfRooms : numberOfRooms + 1,
//     })
//   }
//   const decreaseRoomCount = () => {
//     setRoomCount((prev) => (prev === 1 ? prev : prev - 1))
//     reset({
//       ...getValues(),
//       numberOfRooms: numberOfRooms === 1 ? numberOfRooms : numberOfRooms - 1,
//     })
//   }
//   const changeRoomCount = () => setRoomCount(Number(selectRef.current.value))

//   const { ref, ...rest } = register('numberOfRooms')
//   console.log('variables')
//   console.log(roomCount)
//   console.log(numberOfRooms)
//   console.log(prefix)
//   console.log(roomNumber)
//   console.log(suffix)
//   console.log(roomNameArray)

//   return (
//     <section>
//       <dl className='rowAdd'>
//         <dt>객실설정</dt>
//         <dd>
//           <div className='roomSetting'>
//             <div className='sell-num mgb_20'>
//               <span>판매가능객실</span>
//               <select
//                 {...rest}
//                 ref={(e) => {
//                   ref(e)
//                   selectRef.current = e
//                 }}
//                 value={roomCount}
//                 onChange={changeRoomCount}
//               >
//                 {makeOptions(99)}
//               </select>
//               <div>
//                 <button type='button' className='btn plus' onClick={increaseRoomCount}>
//                   <span className='hdn'>추가</span>
//                 </button>
//                 <button type='button' className='btn minus' onClick={decreaseRoomCount}>
//                   <span className='hdn'>삭제</span>
//                 </button>
//               </div>
//             </div>
//             <div className='word'>
//               <div className='row tit'>
//                 <div>앞단어</div>
//                 <div>시작방번호</div>
//                 <div>끝단어</div>
//               </div>
//               <div className='row'>
//                 <div>
//                   <input type='text' {...register('prefix')} />
//                 </div>
//                 <div>
//                   <input type='text' {...register('roomNumber')} />
//                 </div>
//                 <div>
//                   <input type='text' {...register('suffix')} />
//                 </div>
//               </div>
//             </div>
//             <p className='ex'>
//               숫자 객실명인 경우 간편하게 자동 지정해줍니다.
//               <br />
//               {`입력예: 1) '디럭스', 2) '102', 3) '호' => 디럭스102호, 디럭스103호, 디럭스104호, 디럭스105호...`}
//             </p>
//             <div className='roomName'>
//               {makeRooms(
//                 roomCount,
//                 setRoomCount,
//                 roomNameArray,
//                 setRoomNameArray,
//                 register,
//                 getValues
//               )}
//             </div>
//           </div>
//         </dd>
//       </dl>
//     </section>
//   )
// }

// const count = _.range(1)

// const makeOptions = (maxRoomCount) => {
//   const mapOption = _.map((number) => (
//     <option key={number} value={number}>
//       {number}개
//     </option>
//   ))
//   return _.flow(count, mapOption)(maxRoomCount + 1)
// }

// const makeRooms = (
//   roomCount,
//   setRoomCount,
//   roomNameArray,
//   setRoomNameArray,
//   register,
//   getValues
// ) => {
//   console.log('makeRooms called...')
//   console.log(roomCount)
//   console.log(roomNameArray)

//   const removeCurrentInput = (index) => {
//     console.log('removeCurrentInput called...')
//     console.log(index)

//     setRoomNameArray((prev) => prev.filter((value, i) => index !== i))
//     setRoomCount((prev) => (prev === 1 ? prev : prev - 1))
//   }

//   const mapRoom = _.map((number) => {
//     const roomName = `room${number}`
//     return (
//       <div key={number}>
//         <span>객실명{number}</span>
//         <input
//           type='text'
//           {...register(roomName)}
//           defaultValue={roomNameArray[number - 1]}
//           style={{ marginRight: '30px', padding: '0 10px' }}
//         />
//         {roomCount > 1 && (
//           <button
//             type='button'
//             className='delete'
//             style={{ right: '6px' }}
//             onClick={() => removeCurrentInput(number - 1)}
//           >
//             <span className='hidden'>삭제</span>
//           </button>
//         )}
//       </div>
//     )
//   })
//   return _.flow(count, mapRoom)(roomCount + 1)
// }

// const handleRoomNameArray = (
//   roomCount,
//   roomNameArray,
//   setRoomNameArray,
//   prefix,
//   roomNumber,
//   suffix,
//   isBatchChange,
//   reset,
//   getValues
// ) => {
//   console.log('handleRoomNameArray called...')
//   const tempArray = []

//   for (let i = 1; i <= roomCount; i++) {
//     const roomName = `room${i}`
//     console.log(roomName)
//     reset({ ...getValues(), [roomName]: undefined })
//   }

//   for (let i = 0; i < roomCount; i++) {
//     const defaultValue = `${prefix} ${
//       roomNumber === '' ? roomNumber : Number(roomNumber) + Number(i)
//     }${suffix}`
//     console.log(defaultValue)

//     //조건
//     /**
//      * 1.prefix, roomNumber, suffix가 수정되었을때는 항상 array가 변경되어야한다
//      */
//     if (isBatchChange) {
//       console.log('isBatchChange')
//       tempArray.push(defaultValue)
//     } else {
//       if (roomNameArray[i] === undefined) {
//         console.log('roomNameArray[i] === undefined')
//         tempArray.push(defaultValue)
//       } else {
//         console.log('else')
//         tempArray.push(roomNameArray[i])
//       }
//     }
//   }
//   console.log('roomNameArray changed...')
//   setRoomNameArray(tempArray)
// }
// //
