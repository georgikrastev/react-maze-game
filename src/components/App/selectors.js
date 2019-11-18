import { createGetSelector } from 'reselect-immutable-helpers'

export const getApp = ({ app }) => app
export const getAppLevelNumber = createGetSelector(getApp, 'playing')
