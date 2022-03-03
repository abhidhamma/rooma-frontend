import { useRecoilCallback } from 'recoil'
import { defaultValuesAtom } from '../state/common/form'

const useCreateAccommodationCallback = (apiType) =>
  useRecoilCallback(({ snapshot, refresh, set }) => async (api) => {
    console.log(`useCreateAccommodationCallback ${apiType} Called...`)
    const release = snapshot.retain()
    let result = null
    try {
      console.log('useApiCallback try')
      result = await snapshot.getPromise(api)
    } catch (error) {
      throw error
    } finally {
      release()
    }
    return result
  })

export default useCreateAccommodationCallback
