import _ from 'lodash'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { getFormDataFromJson } from '@util/common/axiosUtil'
import useCreateAccommodationCallback from '@hook/apiHook/useCreateAccommodationCallback'
import { createAccommodationSelector } from '@state/accommodation/accommodation'
import AccommodationForm from './Form'
import { validateAccommodationInput } from '@util/validation/validateAccommodationInput'

export default function CreateAccommodation() {
  const createAccommodationCallback = useCreateAccommodationCallback('create Accommodation')
  let navigate = useNavigate()

  const defaultValues = {
    cpNo: '1',
    nickname: '롯데호텔',
    homepage: 'www.lottehotel.com',
    email: 'lottel@lotte.com',
    fax: '',
    address2: '1111번지',
    options: '',
    addPersionFee: '성인||20000//유아||10000',
    addBreakfastFee: '성인||20000//유아||10000',
    addExtFee: '바베큐||30000//고기||10000//숯||10000',
    useYn: 'Y',
    openYn: 'Y',
    name: '롯데호텔',
    tel: '070-1111-2222',
    address1: '제주도 서귀포시 중문',
    positionX: '1111',
    positionY: '2222',
    bankAccount: '하나은행 1111-2222',
    saleStartdate: '2022-03-02',
    saleEnddate: '2022-03-01',
    area1: '1',
    area2: '2',
    checkinTime: '15:00',
    checkoutTime: '11:00',
    description: '',
    notice: '',
  }
  const { register, handleSubmit } = useForm({ defaultValues })
  const onSubmit = _.flow(
    validateAccommodationInput,
    getFormDataFromJson,
    createAccommodation(createAccommodationCallback, navigate)
  )

  return (
    <AccommodationForm
      register={register}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      submitText={'등록'}
    />
  )
}

const createAccommodation = (createAccommodationCallback, navigate) => (formData) => {
  if (formData === false) {
    return
  }

  createAccommodationCallback(createAccommodationSelector(formData)).then((data) => {
    const { message } = data
    if (message === '성공') {
      alert('등록되었습니다.')
      navigate('/accommodationManagement/accommodation')
    } else {
      alert('오류가 발생했습니다. 잠시후에 다시 시도해주세요.')
    }
  })
}
