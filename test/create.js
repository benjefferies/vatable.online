import search from './search'

const create = (chromeless, createValue) => {
  await search(chromeless, createValue)
  chromeless.click(`div[name="Create new vatable?"]`)
    .wait('#upVote')
}

export default create
