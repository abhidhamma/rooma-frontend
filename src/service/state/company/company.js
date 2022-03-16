import { readCompanyByNo } from '@api/company'
import { READ_COMPANY_SELECTOR_KEY } from '@constant/atomKeys'
import { selectorFamily } from 'recoil'

//selector
export const readCompanyByNoSelector = selectorFamily({
  key: READ_COMPANY_SELECTOR_KEY,
  get:
    ({ cpNo }) =>
    async () =>
      await readCompanyByNo({
        cpNo,
      }),
})
