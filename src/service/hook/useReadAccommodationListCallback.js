import { useRecoilCallback } from 'recoil'
import { TOTAL_COUNT_ATOM } from '../../other/constant/atomKeys'
import { accommodationListAtom, readAccommodationListSelector } from '../state/accommodation'
import { totalCountAtom } from '../state/common/paging'

const useReadAccommodationListCallback = (apiType) =>
  useRecoilCallback(({ snapshot, refresh, set }) => async (api) => {
    console.log(`useReadAccommodationListCallback ${apiType} Called...`)
    const release = snapshot.retain()

    try {
      console.log('useReadAccommodationListCallback try')
      const result = await snapshot.getPromise(api)

      // 나중에 set할거 매개변수에 넣어서 명시해주는 방향으로 하자
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
