import { useRecoilCallback } from 'recoil'
import { defaultValuesAtom } from '../state/common/form'

const useUpdateAccommodationCallback = (apiType) =>
  useRecoilCallback(({ snapshot, refresh, set }) => async (api) => {
    console.log(`useUpdateAccommodationCallback ${apiType} Called...`)
    const release = snapshot.retain()
    try {
      console.log('useUpdateAccommodationCallback try')
      const result = await snapshot.getPromise(api)

      set(defaultValuesAtom, () => result.data.data)
    } catch (error) {
      throw error
    } finally {
      release()
    }
  })

export default useUpdateAccommodationCallback
