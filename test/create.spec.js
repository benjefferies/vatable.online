import {expect} from 'chai';
import Chromeless from 'chromeless'
import {v4} from 'uuid'
import create from './create'

describe('Create vatable tests', () => {

  it('should create new vatable items when vatable doesnt exist', async function() {
    // Given
    const chromeless = new Chromeless({remote: true,debug: true})
    const vatable = v4()

    // When
    const searchResults = await create(chromeless, vatable)

    // Then
    expect(await chromeless.exists('#upVote')).to.be.true
    expect(await chromeless.exists('#downVote')).to.be.true
    await chromeless.end()
  });

})
