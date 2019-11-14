import {INITIALIZE_APP} from './constants'
import {levels} from '../../data/data'

export const initializeApp = () => ({
    type: INITIALIZE_APP,
    payload: levels
})