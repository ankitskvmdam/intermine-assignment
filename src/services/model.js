import a from '../model.json'

const modelEndpoints = {
    flymine: 'https://www.flymine.org/flymine/service/model?format=json',
    humanmine: 'https://www.humanmine.org/humanmine/service/model?format=json',
}

/**
 * Fetch model from InterMine server
 * 
 * @param {keyof modelEndpoints} mineName default is flymine.
 * @param {Function} cb callback function
 * @returns model
 */
export const fetchModel = (mineName, cb) => {
    const endpoint = modelEndpoints[mineName] || modelEndpoints.flymine

    cb(a)
}