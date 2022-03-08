import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
export const useGetAtom = (atom) => useRecoilValue(atom)
export const useSetAtom = (atom) => useSetRecoilState(atom)
export const useAtom = (atom) => useRecoilState(atom)
export const useGetSelector = (selector) => useRecoilValue(selector)
export const useSetSelector = (selector) => useSetRecoilState(selector)
export const useSelector = (selector) => useRecoilState(selector)
