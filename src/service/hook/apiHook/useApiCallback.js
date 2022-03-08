import { useRecoilCallback } from 'recoil'

const useApiCallback = (apiType) =>
  useRecoilCallback(({ snapshot, refresh, set }) => async (api) => {
    console.log(`useApiCallback ${apiType} Called...`)
    const release = snapshot.retain()
    try {
      console.log('useApiCallback try')
      const { data } = await snapshot.getPromise(api)

      return data
    } catch (error) {
      throw error
    } finally {
      release()
    }
  })

export default useApiCallback
