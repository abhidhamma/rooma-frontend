import { READ_IMAGE_URL } from '@constant/apiURLs'
import useApiCallback from '@hook/apiHook/useApiCallback'
import {
  createImageSelector,
  deleteImageSelector,
  readImageListSelector,
} from '@state/accommodationManagement/image'
import { getFormDataFromJson } from '@util/common/axiosUtil'
import { useParams } from 'react-router-dom'
import { useRecoilRefresher_UNSTABLE, useRecoilValue } from 'recoil'
export default function PictureForm({ formType, watch, register, group, rtNo, acNo }) {
  const createImageCallback = useApiCallback('createImageCallback')
  const deleteImageCallback = useApiCallback('deleteImageCallback')

  const paramater = { group, rtNo, acNo }
  const {
    data: { data: imageList },
  } = useRecoilValue(readImageListSelector(paramater))
  const resetReadImageList = useRecoilRefresher_UNSTABLE(readImageListSelector(paramater))

  console.log(imageList)
  const imageUrl = (fileNo) => `${READ_IMAGE_URL}/${fileNo}`

  const createImage = (event) => {
    if (imageList.length > 6) {
      alert('7개까지 등록할 수 있습니다.')
      return
    }
    const file = event.target.files[0]
    const parameterWithFile = (file) => ({ ...paramater, file: file })
    const createImage = () => {
      createImageCallback(createImageSelector(getFormDataFromJson(parameterWithFile(file)))).then(
        (result) => {
          console.log(result)
          resetReadImageList()
        }
      )
    }
    createImage()
  }

  const deleteImage = (fileNo) => {
    deleteImageCallback(deleteImageSelector({ fileNo })).then((result) => {
      console.log(result)
      resetReadImageList()
    })
  }
  return (
    <section>
      <dl>
        <dt>사진</dt>
        {formType === '등록' ? (
          <dd>
            <ul className='txtlist'>
              <li>사진은 등록후 수정페이지에서 추가할 수 있습니다.</li>
            </ul>
          </dd>
        ) : (
          <dd>
            <ul className='imgList'>
              {imageList.map((image, index) => (
                <li key={image.fileNo}>
                  <span>
                    {index === 0 ? (
                      <>
                        <em>[대표]</em>대표이미지
                      </>
                    ) : (
                      `추가이미지${index}`
                    )}
                  </span>
                  <div className='thumnail'>
                    <img src={imageUrl(image.fileNo)} alt='' />
                    <a href='#' onClick={() => deleteImage(image.fileNo)}>
                      <span className='hdn'>삭제</span>
                    </a>
                  </div>
                </li>
              ))}
              {/* <li>
                <span>
                  <em>[대표]</em>대표이미지
                </span>
                <div className='thumnail'>
                  <img src={image} alt='' />
                </div>
              </li>
              <li>
                <span>추가이미지1</span>
                <div className='thumnail'>
                  <img src={image} alt='' />
                  <a href='#'>
                    <span className='hdn'>삭제</span>
                  </a>
                </div>
              </li>
              <li>
                <span>추가이미지2</span>
                <div className='thumnail'>
                  <img src={image} alt='' />
                  <a href='#'>
                    <span className='hdn'>삭제</span>
                  </a>
                </div>
              </li> */}
              <li>
                <span>
                  {imageList.length === 0 ? (
                    <>
                      <em>[대표]</em>대표이미지
                    </>
                  ) : (
                    `추가이미지${imageList.length}`
                  )}
                </span>
                <div className='thumnail'>
                  <a href='#' className='thumnailAdd'>
                    <input type='file' onChange={createImage} />
                    <span className='추가'></span>
                  </a>
                </div>
              </li>
            </ul>
            <ul className='mgt_20 txtlist'>
              <li>- 권장 크기 : 1000 x 1000</li>
              <li>- 추가이미지는 최대 7개까지 설정할 수 있습니다.</li>
              <li>- 이미지는 JPG, PNG 형식의 파일로 이미지 1장당 3MB이하로 등록이 가능합니다.</li>
            </ul>
          </dd>
        )}
      </dl>
    </section>
  )
}
