import { modelEndpoints } from '../constants/model-tree'

/**
 * Fetch model from InterMine server
 * 
 * @param {keyof modelEndpoints} mineName default is flymine.
 * @param {Function} cb callback function
 * @returns model
 */
export const fetchModel = (mineName, cb) => {
    const endpoint = modelEndpoints[mineName] || modelEndpoints.HUMANMINE

    fetch(endpoint, {
        method: 'GET',
    })
    .then(res => res.json())
    .then(response => cb(response))
    .catch(err => cb(err))
    
}