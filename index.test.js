// const {describe, it, expect} = require('jest')

const store = require('./index')

describe('The Gilded Rose store', () => {
  describe('Standard objects', () => {
    it('should modify sellIn by -1', () => {
      const param = [{name: 'Mighty Book', sellIn: 10, quality: 10}]
      expect(store.updateItems(param)).toHaveProperty('0.sellIn', 9)
    })

    it('should modify quality by -1', () => {
      const param = [{name: 'Mighty Book', sellIn: 10, quality: 10}]
      expect(store.updateItems(param)).toHaveProperty('0.quality', 9)
    })

    it('should rotten twice as much when object is expired', () => {
      const param = [{name: 'Mighty Book', sellIn: 1, quality: 10}]
      expect(store.updateItems(param)).toHaveProperty('0.quality', 8)
    })

    it('should never have quality below zero', () => {
      const param = [{name: 'Mighty Book', sellIn: 1, quality: 0}]
      expect(store.updateItems(param)).toHaveProperty('0.quality', 0)
    })
  })

  describe('Conjured Standard objects', () => {
    it('should modify sellIn by -1', () => {
      const param = [{name: 'Conjured Mighty Book', sellIn: 10, quality: 10}]
      expect(store.updateItems(param)).toHaveProperty('0.sellIn', 9)
    })

    it('should modify quality by -1', () => {
      const param = [{name: 'Conjured Mighty Book', sellIn: 10, quality: 10}]
      expect(store.updateItems(param)).toHaveProperty('0.quality', 8)
    })

    it('should rotten twice as much when object  is expired', () => {
      const param = [{name: 'Conjured Mighty Book', sellIn: 1, quality: 10}]
      expect(store.updateItems(param)).toHaveProperty('0.quality', 6)
    })

    it('should never have quality below zero', () => {
      const param = [{name: 'Conjured Mighty Book', sellIn: 1, quality: 0}]
      expect(store.updateItems(param)).toHaveProperty('0.quality', 0)
    })
  })

  describe('Aged Brie', () => {
    it('should augment quality the older it gets', () => {
      const param = [{name: 'Aged Brie', sellIn: 10, quality: 10}]
      expect(store.updateItems(param)).toHaveProperty('0.quality', 11)
    })

    it('should augment quality twice as much when it is expired', () => {
      const param = [{name: 'Aged Brie', sellIn: 0, quality: 10}]
      expect(store.updateItems(param)).toHaveProperty('0.quality', 12)
    })

    it('should never have a quality above 50', () => {
      const param = [{name: 'Aged Brie', sellIn: 0, quality: 50}]
      expect(store.updateItems(param)).toHaveProperty('0.quality', 50)
    })
  })

  describe('Backstage Passes', () => {
    it('Should increase quality by 1 when there is more than 10 days left', () => {
      const param = [{name: 'Backstage passes', sellIn: 20, quality: 10}]
      expect(store.updateItems(param)).toHaveProperty('0.quality', 11)
      expect(store.updateItems(param)).toEqual([{name: 'Backstage passes', sellIn: 19, quality: 11}])
    })
    it('Should increase quality by 2 when there is less than 10 days left', () => {
      const param = [{name: 'Backstage passes', sellIn: 9, quality: 10}]
      expect(store.updateItems(param)).toHaveProperty('0.quality', 12)
    })
    it('Should increase quality by 3 when there is less than 5 days left', () => {
      const param = [{name: 'Backstage passes', sellIn: 4, quality: 10}]
      expect(store.updateItems(param)).toHaveProperty('0.quality', 13)
    })
    it('Should drop quality to 0 once it is expired' , () => {
      const param = [{name: 'Backstage passes', sellIn: 1, quality: 10}]
      expect(store.updateItems(param)).toHaveProperty('0.quality', 0)
    })
  })

  describe('Sulfuras', () => {
    it('should never change', () => {
      const param = [{name: 'Sulfuras', sellIn: 10, quality: 80}]
      expect(store.updateItems(param)).toEqual(param)
    })
  })
})
