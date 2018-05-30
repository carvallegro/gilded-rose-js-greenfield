const _ = require('lodash')

const MIN_QUALITY = 0
const MAX_QUALITY = 50

const updateItems = (items = []) => [
  ...sulfuras(items),
  ...update(notSulfuras(items))
]

const sulfuras = (items = []) => _.filter(items, {name: 'Sulfuras'})
const notSulfuras = (items = []) => _.xor(items, sulfuras(items))

const update = (items = []) => updateSellIn(items, items => [
  ...updateAgedBrie(items),
  ...updateStandard(items)
])

const updateSellIn = (items = [], then) => then(_.flatMap(items, i => ({
  ...i,
  sellIn: i.sellIn - 1
})))

const updateAgedBrie = items => _(items)
  .filter({name: 'Aged Brie'})
  .flatMap(updateBrieQuality)
  .value()

const updateBrieQuality = i => ({
  ...i,
  quality: Math.min(MAX_QUALITY, getNewBrieQuality(i))
})
const getNewBrieQuality = i =>
  i.sellIn > 0
    ? i.quality + 1
    : i.quality + 2

const updateStandard = items => _(items)
  .reject({name: 'Aged Brie'})
  .flatMap(updateStandardQuality)
  .value()

const updateStandardQuality = i => ({
  ...i,
  quality: Math.max(MIN_QUALITY, getNewQuality(i))
})

const getNewQuality = i =>
  i.sellIn > 0
    ? i.quality - 1
    : i.quality - 2

module.exports = {
  updateItems
}
