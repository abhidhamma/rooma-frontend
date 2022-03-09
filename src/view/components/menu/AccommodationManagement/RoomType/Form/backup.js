// import _ from 'lodash/fp'
// import { useRef, useState } from 'react'

// const count = _.range(1)
// const makeOptions = (maxRoomCount) => {
//   const mapOption = _.map((number) => (
//     <option key={number} value={number}>
//       {number}개
//     </option>
//   ))
//   return _.flow(count, mapOption)(maxRoomCount + 1)
// }

// const makeRooms = (roomCount, setRoomCount, prefix, roomNumber, suffix, register) => {
//   console.log('실행')
//   console.log(prefix)
//   const removeCurrentInput = () => {
//     setRoomCount((prev) => prev - 1)
//   }

//   const mapRoom = _.map((number) => (
//     <div key={number}>
//       <span>객실명{number}</span>
//       <input
//         type='text'
//         {...register(`room${number}`)}
//         value={`${prefix} ${
//           roomNumber === '' ? roomNumber : Number(roomNumber) + Number(number - 1)
//         }${suffix}`}
//         style={{ marginRight: '30px' }}
//       />
//       <button
//         type='button'
//         className='delete'
//         style={{ right: '6px' }}
//         onClick={removeCurrentInput}
//       >
//         <span className='hidden'>삭제</span>
//       </button>
//     </div>
//   ))
//   return _.flow(count, mapRoom)(roomCount + 1)
// }

// export default function RoomSetting({ register, numberOfRooms, prefix, roomNumber, suffix }) {
//   const [roomCount, setRoomCount] = useState(1)
//   const selectRef = useRef(null)

//   const increaseRoomCount = () => setRoomCount((prev) => (prev === 99 ? prev : prev + 1))
//   const decreaseRoomCount = () => setRoomCount((prev) => (prev === 1 ? prev : prev - 1))
//   const changeRoomCount = () => setRoomCount(Number(selectRef.current.value))

//   const { ref, ...rest } = register('numberOfRooms')
//   console.log(roomCount)
//   console.log(numberOfRooms)
//   console.log(prefix)
//   console.log(roomNumber)
//   console.log(suffix)
//   console.log(selectRef.current)

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
//               {makeRooms(roomCount, setRoomCount, prefix, roomNumber, suffix, register)}
//             </div>
//           </div>
//         </dd>
//       </dl>
//     </section>
//   )
// }
