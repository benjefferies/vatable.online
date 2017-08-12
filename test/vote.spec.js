import {expect} from 'chai';
import Chromeless from 'chromeless'
import {v4} from 'uuid'
import search from './search'

describe('Vote vatable tests', () => {

  it('should up vote vatable items when vatable hasnt been voted', async function() {
    // Given
    const chromeless = new Chromeless({remote: true,debug: true})
    const vatable = v4()

    // When
    const searchResults = await search(chromeless, vatable)
    await chromeless.click('div[name="Create new vatable?"]').wait('#upVote')
    await chromeless.click('#upVoteNumber').wait('#upVoteNumber[value="1 votes"]')

    // Then
    expect(await chromeless.exists('#upVoteNumber[value="1 votes]')).to.be.true
    await chromeless.end()
  });

  it('should not up vote vatable items when vatable already voted', async function() {
    // Given
    const chromeless = new Chromeless({remote: true,debug: true})
    const vatable = v4()
    const searchResults = await search(chromeless, vatable)
    await chromeless.click('div[name="Create new vatable?"]').wait('#upVote')
    await chromeless.click('#upVoteNumber').wait('#upVoteNumber[value="1 votes"]')

    // When
    const searchResults = await search(chromeless, vatable)
    await chromeless.click(`div[name="${vatable}"]`).wait('#upVote')
    await chromeless.click('#upVoteNumber').wait('#votedPopup')

    // Then
    expect(await chromeless.exists('#votedPopup')).to.be.true
    await chromeless.end()
  });

  it('should down vote vatable items when vatable hasnt been voted', async function() {
    // Given
    const chromeless = new Chromeless({remote: true,debug: true})
    const vatable = v4()

    // When
    const searchResults = await search(chromeless, vatable)
    await chromeless.click('div[name="Create new vatable?"]').wait('#downVote')
    await chromeless.click('#downVoteNumber').wait('#downVoteNumber[value="1 votes"]')

    // Then
    expect(await chromeless.exists('#downVoteNumber[value="1 votes]')).to.be.true
    await chromeless.end()
  });

  it('should not down vote vatable items when vatable already voted', async function() {
    // Given
    const chromeless = new Chromeless({remote: true,debug: true})
    const vatable = v4()
    const searchResults = await search(chromeless, vatable)
    await chromeless.click('div[name="Create new vatable?"]').wait('#downVote')
    await chromeless.click('#downVoteNumber').wait('#downVoteNumber[value="1 votes"]')

    // When
    const searchResults = await search(chromeless, vatable)
    await chromeless.click(`div[name="${vatable}"]`).wait('#downVote')
    await chromeless.click('#downVoteNumber').wait('#votedPopup')

    // Then
    expect(await chromeless.exists('#votedPopup')).to.be.true
    await chromeless.end()
  });

})
