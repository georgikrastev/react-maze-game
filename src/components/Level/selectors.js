import { createGetSelector } from 'reselect-immutable-helpers'

export const getLevel = ({ level }) => level
export const getLevelSize = createGetSelector(getLevel, 'size')
export const getLevelCells = createGetSelector(getLevel, 'cells')
export const getLevelStart = createGetSelector(getLevel, 'start')
export const getLevelEnd = createGetSelector(getLevel, 'end')
