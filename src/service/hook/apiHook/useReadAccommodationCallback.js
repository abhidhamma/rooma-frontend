import { useRecoilCallback } from 'recoil'
import { defaultValuesAtom } from '@state/common/form'

const useReadAccommodationCallback = (apiType) =>
  useRecoilCallback(({ snapshot, refresh, set }) => async (api) => {
    console.log(`useReadAccommodationCallback ${apiType} Called...`)
    const release = snapshot.retain()

    try {
      console.log('useReadAccommodationCallback try')
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

export default useReadAccommodationCallback
