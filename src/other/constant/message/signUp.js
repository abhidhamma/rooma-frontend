import { makeDifferentMessage, makeEmptyMessage } from './common'

//empty
export const CPID_IS_EMPTY = makeEmptyMessage('업체아이디')
export const CPPW_IS_EMPTY = makeEmptyMessage('비밀번호')
export const CONFIRMCPPW_IS_EMPTY = makeEmptyMessage('비밀번호확인')
export const NAME_IS_EMPTY = makeEmptyMessage('업체명')
export const OWNERNAME_IS_EMPTY = makeEmptyMessage('대표명')
export const HP_IS_EMPTY = makeEmptyMessage('휴대폰번호')
export const EMAIL_IS_EMPTY = makeEmptyMessage('이메일')
export const ZIPCODE_IS_EMPTY = makeEmptyMessage('우편번호')
export const ADDRESS1_IS_EMPTY = makeEmptyMessage('주소')
export const ADDRESS2_IS_EMPTY = makeEmptyMessage('상세주소')

//different
export const PASSWORD_IS_DIFFERENT = makeDifferentMessage('비밀번호', '비밀번호확인')
