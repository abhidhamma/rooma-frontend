import {
  createMember,
  deleteMember,
  readCompanyByNo,
  readCompanyList,
  readMemberList,
  updateCompany,
} from '@api/company'
import {
  CREATE_MEMBER_SELECTOR_KEY,
  DELETE_MEMBER_SELECTOR_KEY,
  READ_COMPANY_LIST_SELECTOR_KEY,
  READ_COMPANY_SELECTOR_KEY,
  READ_MEMBER_LIST_SELECTOR_KEY,
  UPDATE_COMPANY_SELECTOR_KEY,
} from '@constant/atomKeys'
import { getFormDataFromJson } from '@util/common/axiosUtil'
import { el } from 'date-fns/locale'
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
// export const readCompanyListSelector = selectorFamily({
//   key: READ_COMPANY_LIST_SELECTOR_KEY,
//   get: (formData) => async () => await readCompanyList(formData)
// })

export const readCompanyListSelector = selectorFamily({
  key: READ_COMPANY_LIST_SELECTOR_KEY,
  get: (readCompanyListParameter) => async () => {
    if (readCompanyListParameter.cpNo === undefined) {
      return { data: { data: { list: [] } } }
    } else {
      const formData = getFormDataFromJson(readCompanyListParameter)
      return await readCompanyList(formData)
    }
  },
})

export const updateCompanySelector = selectorFamily({
  key: UPDATE_COMPANY_SELECTOR_KEY,
  get: (formData) => async () => await updateCompany(formData),
})

export const createMemberSelector = selectorFamily({
  key: CREATE_MEMBER_SELECTOR_KEY,
  get: (formData) => async () => await createMember(formData),
})

export const deleteMemberSelector = selectorFamily({
  key: DELETE_MEMBER_SELECTOR_KEY,
  get: (formData) => async () => await deleteMember(formData),
})
export const readMemberListSelector = selectorFamily({
  key: READ_MEMBER_LIST_SELECTOR_KEY,
  get:
    ({ cpNo }) =>
    async () => {
      if (cpNo === undefined) {
        return { data: { data: [] } }
      } else {
        return await readMemberList({
          cpNo,
        })
      }
    },
})
