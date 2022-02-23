import addDays from 'date-fns/fp/addDays'

export default function makeDummyData(roomTypeCount) {
  const getRandomPrice = () => Math.floor(Math.random() * 15) + 2

  let idCount = 0
  const addOneDay = addDays(1)

  //다음 6개월, 이전 6개월 정보 만들기 (예약정보는 이번달만 존재)
  const makePriceData = () => {
    const priceData = []
    const minusSixMonth = addDays(-90)
    let tempDate = minusSixMonth(new Date())
    for (let i = 0; i < 180; i++) {
      //date를 1일로 만들고 i를 더한다
      const date = tempDate
      tempDate = addOneDay(tempDate)
      priceData.push({ id: idCount, price: getRandomPrice(), date })
      idCount += 1
    }
    return priceData
  }

  // const roomType = {
  //   roomTypeName: '디럭스더블',
  //   roomNumbers: ['101호', '102호'],
  //   monthPriceList: [makePriceData(), makePriceData()],
  // }

  const dummyData = []
  // for (let i = 0; i < roomTypeCount; i++) {
  //   dummyData.push({
  //     roomTypeName: '디럭스더블',
  //     roomNumbers: ['101호', '102호'],
  //     roomNumberData: [makePriceData(), makePriceData()],
  //   })
  // }
  dummyData.push({
    roomTypeName: '스탠다드',
    roomNumbers: ['101호', '102호'],
    roomNumberData: [makePriceData(), makePriceData()],
  })
  dummyData.push({
    roomTypeName: '슈페리어',
    roomNumbers: ['103호', '104호'],
    roomNumberData: [makePriceData(), makePriceData()],
  })
  dummyData.push({
    roomTypeName: '디럭스',
    roomNumbers: ['105호', '106호'],
    roomNumberData: [makePriceData(), makePriceData()],
  })
  dummyData.push({
    roomTypeName: '디럭스더블',
    roomNumbers: ['107호', '108호'],
    roomNumberData: [makePriceData(), makePriceData()],
  })
  dummyData.push({
    roomTypeName: '스위트룸',
    roomNumbers: ['109호', '110호'],
    roomNumberData: [makePriceData(), makePriceData()],
  })
  return dummyData
}
