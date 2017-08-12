import {expect} from 'chai';
import Chromeless from 'chromeless'
import {v4} from 'uuid'
import search from './search'

describe('Search vatable tests', () => {

  it('should find vatable items when searching for laptop', async () => {
    const chromeless = new Chromeless({debug: true})

    const searchResults = await search(chromeless, 'laptop')

    expect(searchResults).to.contain('laptop')
    await chromeless.end()
  });

  it('should show create vatable item when searching for new item', async () => {
    const chromeless = new Chromeless({debug: true})

    const searchResults = await search(chromeless, v4())
    console.log(JSON.stringify(searchResults));
    expect(searchResults).to.contain('Create new vatable?')
    await chromeless.end()
  });

  it('should select laptop when found', async function() {
    const chromeless = new Chromeless({debug: true})

    const searchResults = await search(chromeless, 'laptop')
    await chromeless.click('div[name="laptop3"]').wait('#upVote')
    expect(await chromeless.exists('#upVote')).to.be.true
    expect(await chromeless.exists('#downVote')).to.be.true
    await chromeless.end()
  });
})
