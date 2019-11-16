import { createGetSelector } from 'reselect-immutable-helpers'

export const getLevel = ({ level }) => level
export const getLevelNumber = createGetSelector(getLevel, 'number')
export const getLevelSize = createGetSelector(getLevel, 'size')
