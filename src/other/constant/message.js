//validationMessage
const makeEmptyMessage = (name) => `${name}을(를) 입력해주세요.`
//signIn
export const USERNAME_IS_EMPTY = makeEmptyMessage('아이디')
export const PASSWORD_IS_EMPTY = makeEmptyMessage('비밀번호')

//signUp
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

//Accommodation
export const ACCOMODATION_NAME_IS_EMPTY = makeEmptyMessage('숙소명')
export const TEL_IS_EMPTY = makeEmptyMessage('전화번호')
//주소 ADDRESS1_IS_EMPTY 사용
export const POSITIONY_IS_EMPTY = makeEmptyMessage('위도')
export const POSITIONX_IS_EMPTY = makeEmptyMessage('경도')
export const BANKACCOUNT_IS_EMPTY = makeEmptyMessage('계좌번호')
export const SALESTARTDATE_IS_EMPTY = makeEmptyMessage('판매시작일')
export const SALEENDDATE_IS_EMPTY = makeEmptyMessage('판매종료일')
export const AREA1_IS_EMPTY = makeEmptyMessage('지역1')
export const AREA2_IS_EMPTY = makeEmptyMessage('지역2')
export const CHECKINTIME_IS_EMPTY = makeEmptyMessage('체크인')
export const CHECKOUTTIME_IS_EMPTY = makeEmptyMessage('체크아웃')
export const DESCROPTION_IS_EMPTY = makeEmptyMessage('숙소안내')
export const NOTICE_IS_EMPTY = makeEmptyMessage('안내/유의사항')

//RoomType

//Room

const makeDifferentMessage = (name1, name2) => `${name1}와(과) ${name2}이(가) 다릅니다.`
//signUp
export const PASSWORD_IS_DIFFERENT = makeDifferentMessage('비밀번호', '비밀번호확인')
