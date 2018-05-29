const _ = require('lodash')

const MIN_QUALITY = 0
const MAX_QUALITY = 50

const updateItems = (items = []) => {
  const splitBySulfuras = _.partition(items, {name: 'Sulfuras'})
  const sulfurasItems = splitBySulfuras[0]

  const itemsWithUpdatedSellIn = _(splitBySulfuras[1])
    .flatMap(updateSellIn)
    .value()

  const splitByAgedBrie = _.partition(itemsWithUpdatedSellIn, {name: 'Aged Brie'})

  const updatedAgedBries = _.flatMap(splitByAgedBrie[0], updateBrieQuality)

  const updatedStandard = _(splitByAgedBrie[1])
    .flatMap(updateStandardQuality)
    .value()
  return [
    ...sulfurasItems,
    ...updatedAgedBries,
    ...updatedStandard
  ]
}

const updateSellIn = i => ({
  ...i,
  sellIn: i.sellIn - 1
})

const updateBrieQuality = i => ({
  ...i,
  quality: Math.min(MAX_QUALITY, getNewBrieQuality(i))
})
const getNewBrieQuality = i =>
  i.sellIn > 0
    ? i.quality + 1
    : i.quality + 2

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
