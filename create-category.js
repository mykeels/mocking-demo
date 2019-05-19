
async function createCategory(req, res) {
    req.checkBody('name', 'empty name').isLength({ min: 1 }).trim().notEmpty()
    const err = req.validationErrors();
    if (err) {
        res.status(400).send({ success: false, message: 'there are some errors in your form', error: err })
        return
    }
    const { name } = req.checkBody
    const nameExists = await ProductCategory.findOne({ name })
    if (nameExists) {
        res.status(409).send({ success: false, message: 'categories with same names are not allowed' })
        return
    }
    let categoryForm = {}
    categoryForm = req.body

    const newCategory = new ProductCategory(categoryForm)

    if (typeof req.file !== 'undefined') {
        newCategory.categoryThumbnail = {
            name: req.file.public_id,
            url: req.file.url
        }
    }
    else {
        newCategory.categoryThumbnail = null
    }
    try {
        await newCategory.save()
    }
    catch (error) {
        res.status(500).send({ success: false, message: 'something went wrong', error })
        return
    }
    res.status(200).send({ success: true, category: newCategory })
}

module.exports = createCategory