const _ = require('lodash')

const MIN_QUALITY = 0
const MAX_QUALITY = 50

const AGED_BRIE = 'Aged Brie'
const SULFURAS = 'Sulfuras'
const BACKSTAGE_PASS = 'Backstage passes'

const SPECIAL_ITEMS = [AGED_BRIE, SULFURAS, BACKSTAGE_PASS]

const updateItems = items => [
  ...sulfuras(items),
  ...update(notSulfuras(items))
]

const sulfuras = items => _.filter(items, {name: SULFURAS})
const notSulfuras = items => _.xor(items, sulfuras(items))

const update = items => updateSellIn(items, items => [
  ...updateAgedBrie(items),
  ...updateBackstagePass(items),
  ...updateStandard(items)
])

const updateSellIn = (items, then) => then(_.flatMap(items, i => ({
  ...i,
  sellIn: i.sellIn - 1
})))

const updateAgedBrie = items => _(items)
  .filter({name: AGED_BRIE})
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

const updateBackstagePass = items => _(items)
  .filter({name: BACKSTAGE_PASS})
  .flatMap(i => ({
    ...i,
    quality: Math.min(MAX_QUALITY, getNewPassQuality(i))
  }))
  .value()

const getNewPassQuality = item => {
  if(item.sellIn <= 0) return 0
  if(item.sellIn < 5) return item.quality + 3
  if(item.sellIn < 10) return item.quality + 2
  return item.quality + 1
}

const updateStandard = items => _(items)
  .reject(i => SPECIAL_ITEMS.includes(i.name))
  .flatMap(updateStandardQuality)
  .value()

const updateStandardQuality = i => ({
  ...i,
  quality: Math.max(MIN_QUALITY, getNewQuality(i))
})

const getNewQuality = i =>
  (i.sellIn > 0 ? i.quality - 1 : i.quality - 2) - (i.name.includes('Conjured') ? 1 : 0)

module.exports = {
  updateItems
}
