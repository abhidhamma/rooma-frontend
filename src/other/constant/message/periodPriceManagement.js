import { makeAllEmptyMessage, makeUnselectedMessage } from './common'

export const ROOM_TYPE_UNSELECTED = makeUnselectedMessage('객실타입')
export const START_DATE_UNSELECTED = makeUnselectedMessage('변경시작일')
export const END_DATE_UNSELECTED = makeUnselectedMessage('변경마지막일')
export const PRICE_INPUT_EMPTY = makeAllEmptyMessage('객실요금')
