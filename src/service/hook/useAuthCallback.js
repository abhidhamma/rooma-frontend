import { useRecoilCallback } from 'recoil'
import { setCookie } from '../../other/util/common/cookie'
import { loadItem, saveItem } from '../../other/util/common/localStorage'
import { authResultAtom } from '../state/auth'
import { isLoggedInAtom } from '../state/common/common'
import { userAtom } from '../state/common/user'

const useAuthCallback = (authType) =>
  useRecoilCallback(
    ({ snapshot, set, reset }) =>
      async (authApi) => {
        console.log('useAuthCallback Called...')
        const release = snapshot.retain()

        try {
          const {
            data: { jwttoken, userDetails },
          } = await snapshot.getPromise(authApi)

          console.log('jwttoken')
          console.log(jwttoken)
          console.log('userDetails')
          console.log(userDetails)

          setCookie('jwttoken', jwttoken)
          saveItem('user', userDetails)

          set(userAtom, () => loadItem('user'))
          set(isLoggedInAtom, () => true)

          // set(authResultAtom, (prevState) => ({
          //   ...prevState,
          //   authSuccess: `Successful ${authType}!`,
          // }))
        } catch (error) {
          console.log('catch : ', error)
          // set(authResultAtom, (prevState) => ({
          //   ...prevState,
          //   authError: '에러',
          // }))
          return false
        } finally {
          release()
        }

        return true
      },
    [authResultAtom]
  )

export default useAuthCallback
