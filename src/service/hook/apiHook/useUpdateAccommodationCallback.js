import { useRecoilCallback } from 'recoil'
import { defaultValuesAtom } from '@state/common/form'

const useUpdateAccommodationCallback = (apiType) =>
  useRecoilCallback(({ snapshot, refresh, set }) => async (api) => {
    console.log(`useUpdateAccommodationCallback ${apiType} Called...`)
    const release = snapshot.retain()
    try {
      console.log('useUpdateAccommodationCallback try')
      const { data } = await snapshot.getPromise(api)

      set(defaultValuesAtom, () => data.data)
      return data
    } catch (error) {
      throw error
    } finally {
      refresh(api)
      release()
    }
  })

export default useUpdateAccommodationCallback
