import {expect} from 'chai';
import Chromeless from 'chromeless'
import {v4} from 'uuid'
import search from './search'

describe('Create vatable tests', () => {

  it('should create new vatable items when vatable doesnt exist', async function() {
    this.timeout(3000)
    const chromeless = new Chromeless({debug: true})
    const vatable = v4()

    const searchResults = await search(chromeless, vatable)

    await chromeless.click(`div[name="Create new vatable?"]`).wait('#upVote')
    expect(await chromeless.exists('#upVote')).to.be.true
    expect(await chromeless.exists('#downVote')).to.be.true
    await chromeless.end()
  });

})
