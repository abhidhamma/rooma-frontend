import { useRecoilCallback } from 'recoil'

const useApiCallback = (apiType) =>
  useRecoilCallback(({ snapshot, refresh }) => async (api) => {
    console.log(`useApiCallback ${apiType} Called...`)
    const release = snapshot.retain()
    let result = null
    try {
      result = await snapshot.getPromise(api)
    } catch (error) {
      throw error
    } finally {
      release()
    }

    return result
  })

export default useApiCallback
