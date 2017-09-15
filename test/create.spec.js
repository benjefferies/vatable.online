import {expect} from 'chai';
import Chromeless from 'chromeless'
import {v4} from 'uuid'
import search from './search'

describe('Create vatable tests', () => {

  it('should create new vatable items when vatable doesnt exist', async () => {
    // Given
    const chromeless = new Chromeless({debug: true})
    const vatable = v4()

    // When
    await search(chromeless, vatable)
    await chromeless.click(`div[name="Create new vatable?"]`)

    // Then
    expect(await chromeless.wait('#upVote').exists('#upVote')).to.be.true
    expect(await chromeless.wait('#downVote').exists('#downVote')).to.be.true
    chromeless.end()
  });

})
