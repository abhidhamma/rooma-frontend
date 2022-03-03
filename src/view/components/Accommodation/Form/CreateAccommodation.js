import _ from 'lodash'
import { useForm } from 'react-hook-form'
import { getFormDataFromJson } from '../../../../other/util/common/axiosUtil'
import useCreateAccommodationCallback from '../../../../service/hook/useCreateAccommodationCallback'
import { createAccommodationSelector } from '../../../../service/state/accommodation'
import AccommodationForm from './Form'

export default function CreateAccommodation() {
  const createAccommodationCallback = useCreateAccommodationCallback('create Accommodation')

  // const defaultValues = {
  //   cpNo: '1',
  //   nickname: '롯데호텔',
  //   homepage: 'www.lottehotel.com',
  //   email: 'lottel@lotte.com',
  //   fax: '',
  //   address2: '1111번지',
  //   options: '',
  //   addPersionFee: '성인||20000//유아||10000',
  //   addBreakfastFee: '성인||20000//유아||10000',
  //   addExtFee: '바베큐||30000//고기||10000//숯||10000',
  //   useYn: 'Y',
  //   openYn: 'Y',
  //   name: '롯데호텔',
  //   tel: '070-1111-2222',
  //   address1: '제주도 서귀포시 중문',
  //   positionX: '1111',
  //   positionY: '2222',
  //   bankAccount: '하나은행 1111-2222',
  //   saleStartdate: '2022-03-02',
  //   saleEnddate: '2022-03-01',
  //   area1: '1',
  //   area2: '2',
  //   checkinTime: '15:00',
  //   checkoutTime: '11:00',
  //   description: '',
  //   notice: '',
  // }
  const { register, handleSubmit } = useForm()
  const onSubmit = _.flow(getFormDataFromJson, createAccommodationSelector, createAccommodationCallback)

  return <AccommodationForm register={register} handleSubmit={handleSubmit} onSubmit={onSubmit} />
}
