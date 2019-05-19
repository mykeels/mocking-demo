const { expect } = require('chai')
const createCategoryFactory = require('../create-category')
const ProductCategory = require('./mocks/product-category.mock')
const req = require('./mocks/req.mock')
const res = require('./mocks/res.mock')

describe('create-category', () => {
    const createCategory = createCategoryFactory({ ProductCategory })

    beforeEach(() => {
        req.errors = {}
        req.body = {}
        ProductCategory.categories = []
    })

    it('should respond with 400 if the request body validation fails', () => {
        createCategory({ ...req, body: { name: '' } }, res)
        expect(res.code).to.equal(400)
    })

    it('should respond with 409 if there is a name conflict', async () => {
        await createCategory({ ...req, body: { name: 'Grains' } }, res)

        // repeat
        await createCategory({ ...req, body: { name: 'Grains' } }, res)
        expect(res.code).to.equal(409)
    })

    it('should pass', async () => {
        await createCategory({ ...req, body: { name: 'Grains' } }, res)
        expect(res.code).to.equal(200)
    })

    it('should respond with 500 if saving a category fails', async () => {
        ProductCategory.categories = null
        await createCategory({ ...req, body: { name: 'Grains' } }, res)
        expect(res.code).to.equal(500)
        return
    })
})