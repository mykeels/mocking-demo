function ProductCategory (category = {}) {
    this.name = category.name

    this.save = () => {
        return new Promise((resolve, reject) => {
            this._id = ProductCategory.categories.length + 1
            ProductCategory.categories.push(this)
            resolve(this)
        })
    }
}

ProductCategory.categories = []

ProductCategory.findOne = ({ name }) => Promise.resolve(
    (ProductCategory.categories || []).find(category => category.name === name)
)

module.exports = ProductCategory

// const grains = new ProductCategory({ name: 'Grains' })

// grains.save().then(savedGrains => {
//     console.log(savedGrains)
// })
