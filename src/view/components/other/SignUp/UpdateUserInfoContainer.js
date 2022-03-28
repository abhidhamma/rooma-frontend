import { useForm } from 'react-hook-form'
import SignUpForm from './SignUpForm'

export default function UpdateUserInfoContainer() {
  const defaultValues = {
    cpId: 'test',
    name: '제주도펜션',
    ownerName: '변경익',
    bizNum: '123456778',
    bankAccount: '하나은행 111-222-3333',
    homepage: 'test.com',
    email: 'test@test.com',
    tel: '064-1111-2222',
    fax: '1111-2222',
    hp: '010-0000-2222',
    address1: '제주도 서귀포시 서호동',
    address2: '유포리아산업단지 B동 000호',
    adminMemo: '',
    cpPw: '1234',
    confirmCpPw: '1234',
    zipcode: '11122',
  }
  const { register, handleSubmit } = useForm({ defaultValues })
  const onSubmit = () => {}
  return <SignUpForm register={register} handleSubmit={handleSubmit} onSubmit={onSubmit} />
}
