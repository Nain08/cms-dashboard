const Category = require('../model/CategoriesModel');
const User = require('../model/UserModel'); 

async function getCategories(req, res) {
    try {
        const data = await Category.find();
        res.json(data);
    } catch (error) {
        console.error("Error getting categories ", error);
        res.status(500).send('Internal server error');
    }
}

async function addCategory(req, res) {
    try {
        const { categoryName } = req.body;
        
        const newCategory = await Category.create({
            categoryName: categoryName,
            
        });
        res.status(201).json(newCategory);
    } catch (error) {
        if (error.code === 11000) {
            
            res.status(400).send('Category name must be unique.');
          } else {
            res.status(500).send( 'Internal server error.');
          }
    }
}

async function updateCategory(req, res) {
    try {
        const categoryId = req.params.id;
        const { categoryName } = req.body;
        const updatedCategory = await Category.findByIdAndUpdate(
            categoryId,
            { $set: { categoryName: categoryName } },
            { new: true }
        );

        if (!updatedCategory) {
            return res.status(404).json({ error: 'Category not found' });
        }

        await updatedCategory.save()
        console.log('Updated Category:', updatedCategory);

        res.status(200).json(updatedCategory);
    } catch (error) {
        console.error('Error updating category', error);
        res.status(500).send('Internal server error');
    }
}


async function deleteCategories(req, res) {
    try {
        const categoryIds = req.body.categoryIds;

        if (!categoryIds || !Array.isArray(categoryIds) || categoryIds.length === 0) {
            return res.status(400).json({ error: 'Invalid category IDs provided' });
        }

        const deleteCategories = await Category.deleteMany({ _id: { $in: categoryIds } });

        if (!deleteCategories.deletedCount) {
            return res.status(404).json({ error: 'Categories not found' });
        }

        res.status(204).send();
    } catch (error) {
        console.error("Error deleting categories", error);
        res.status(500).send('Internal server error');
    }
}




module.exports = { getCategories,addCategory, updateCategory, deleteCategories};
