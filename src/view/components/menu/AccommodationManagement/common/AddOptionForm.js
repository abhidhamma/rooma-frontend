import { numberToArray } from '@util/common/lodash'
import { useEffect } from 'react'
import { useRecoilState, useResetRecoilState } from 'recoil'

export default function AddOptionForm({
  register,
  firstInputName,
  secondInputName,
  optionCountAtom,
}) {
  const [optionCount, setOptionCount] = useRecoilState(optionCountAtom)
  const resetOptionCount = useResetRecoilState(optionCountAtom)

  useEffect(() => {
    return () => {
      resetOptionCount()
    }
  }, [])

  const increase = () =>
    setOptionCount((prevOptionCount) =>
      prevOptionCount === 10 ? prevOptionCount : prevOptionCount + 1
    )

  const decrease = () =>
    setOptionCount((prevOptionCount) =>
      prevOptionCount === 1 ? prevOptionCount : prevOptionCount - 1
    )
  return numberToArray(optionCount).map((number) => (
    <div className='row' key={number}>
      <div>
        <input type='text' {...register(`${firstInputName}${number}`)} />
      </div>
      <div>
        <input type='text' {...register(`${secondInputName}${number}`)} />
        <span className='won'>원</span>
      </div>
      <div>
        <button
          type='button'
          className='btn plus'
          onClick={increase}
          style={{ display: number === 1 ? 'inline-block' : 'none' }}
        >
          <span className='hdn'>추가</span>
        </button>
        <button
          type='button'
          className='btn minus'
          onClick={decrease}
          style={{ display: number === 1 ? 'inline-block' : 'none' }}
        >
          <span className='hdn'>삭제</span>
        </button>
      </div>
    </div>
  ))
}
