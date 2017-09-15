import Chromeless from 'chromeless'

const search = (chromeless, searchValue) => chromeless.goto('http://localhost:3000')
  .wait('input[id="searchBar"]')
  .type(searchValue, 'input[id="searchBar"]')
  .wait('#autocomplete > div > div')
  .evaluate(() => {
    const values = [].map.call(
    document.querySelectorAll('#autocomplete > div > div'),
      div => div.innerHTML
    )
  return values
})

export default search
