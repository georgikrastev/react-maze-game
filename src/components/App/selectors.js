import { createGetSelector } from 'reselect-immutable-helpers'

export const getApp = ({ app }) => app
export const getAppLevelNumber = createGetSelector(getApp, 'playing')
export const getAppPosition = createGetSelector(getApp, 'position')
export const getAppModalStatus = createGetSelector(getApp, 'isModalOpened')
export const getAppLoadedFromStorage = createGetSelector(
	getApp,
	'isLoadedFromStorage'
)
