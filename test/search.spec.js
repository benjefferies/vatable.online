import {expect} from 'chai';
import Chromeless from 'chromeless'
import {v4} from 'uuid'
import search from './search'
import create from './create'

describe('Search vatable tests', () => {

  it('should find vatable items when vatable already created', async () => {
    // Given
    const chromeless = new Chromeless({remote: true,debug: true})
    const vatable = v4()
    await create(chromeless, vatable)

    // When
    const searchResults = await search(chromeless, searchTerm)

    // Then
    expect(searchResults).to.contain(vatable)
    await chromeless.end()
  });

  it('should show create vatable item when searching for new item', async () => {
    // Given
    const chromeless = new Chromeless({remote: true,debug: true})
    const vatable = v4()

    // When
    const searchResults = await search(chromeless, vatable)

    // Then
    expect(searchResults).to.contain('Create new vatable?')
    await chromeless.end()
  });

  it('should select vatable when found', async function() {
    //Given
    const chromeless = new Chromeless({remote: true,debug: true})
    const vatable = v4()
    await create(chromeless, vatable)

    // When
    const searchResults = await search(chromeless, vatable)
    await chromeless.click('div[name="laptop3"]').wait('#upVote')

    // Then
    expect(await chromeless.exists('#upVote')).to.be.true
    expect(await chromeless.exists('#downVote')).to.be.true
    await chromeless.end()
  });
})
