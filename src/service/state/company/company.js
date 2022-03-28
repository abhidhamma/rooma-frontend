import { readCompanyByNo, readCompanyList } from '@api/company'
import { READ_COMPANY_LIST_SELECTOR_KEY, READ_COMPANY_SELECTOR_KEY } from '@constant/atomKeys'
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
export const readCompanyListSelector = selectorFamily({
  key: READ_COMPANY_LIST_SELECTOR_KEY,
  get: (formData) => async () => await readCompanyList(formData),
})
