import search from './search'

const create = (chromeless, createValue) => async function() {
  await search(chromeless, createValue)
  await chromeless.click(`div[name="Create new vatable?"]`)
}

export default create
