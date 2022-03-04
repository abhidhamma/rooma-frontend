import { useRecoilCallback } from 'recoil'
import { defaultValuesAtom } from '../state/common/form'

const useCreateAccommodationCallback = (apiType) =>
  useRecoilCallback(({ snapshot, refresh, set }) => async (api) => {
    console.log(`useCreateAccommodationCallback ${apiType} Called...`)
    const release = snapshot.retain()

    try {
      console.log('useApiCallback try')
      const { data } = await snapshot.getPromise(api)
      console.log(data)
      return data
    } catch (error) {
      throw error
    } finally {
      release()
    }
  })

export default useCreateAccommodationCallback
