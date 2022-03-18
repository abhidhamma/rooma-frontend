import { useRecoilCallback } from 'recoil'
import { accommodationListAtom } from '@state/accommodationManagement/accommodation'
import { totalCountAtom } from '@state/common/paging'

const useReadAccommodationListCallback = (apiType) =>
  useRecoilCallback(({ snapshot, refresh, set, reset }) => async (api) => {
    console.log(`useReadAccommodationListCallback ${apiType} Called...`)
    const release = snapshot.retain()

    reset(accommodationListAtom)

    try {
      console.log('useReadAccommodationListCallback try')
      const result = await snapshot.getPromise(api)

      set(accommodationListAtom, () => result.data.data.list)
      set(totalCountAtom, () => result.data.data.totalCount)
    } catch (error) {
      throw error
    } finally {
      refresh(api)
      release()
    }
  })

export default useReadAccommodationListCallback
