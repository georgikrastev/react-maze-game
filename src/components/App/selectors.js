import { createGetSelector } from 'reselect-immutable-helpers'

export const getApp = ({ app }) => app
export const getAppPosition = createGetSelector(getApp, 'position')
export const getAppDifficulty = createGetSelector(getApp, 'difficulty')
export const getAppModalStatus = createGetSelector(getApp, 'isModalOpened')
export const getAppAlertOpened = createGetSelector(getApp, 'isAlertOpened')
export const getAppLoadedFromStorage = createGetSelector(
	getApp,
	'isLoadedFromStorage'
)
