const Category = require('../model/CategoriesModel');
const User = require('../model/UserModel'); 


async function getPages(req, res) {
    try {
        const data = await Category.aggregate([
            {
                $unwind: '$pages'
            },
            {
                $project: {
                    categoryName: '$categoryName',
                    author: '$pages.pageAuthor',
                    pageName: '$pages.pageName',
                    dateCreated:'$pages.dateCreated',
                    _id:'$pages._id'
                }
            }
        ]);

        res.json(data);
    } catch (error) {
        console.error("Error getting pages", error);
        res.status(500).send('Internal server error');
    }
}
async function addPage(req, res) {
  try {
    const { pageName, categoryName,username } = req.body;
    
    const foundCategory = await Category.findOne({ categoryName: categoryName });

    if (!foundCategory) {
      return res.status(404).send('Category not found');
    }

    const newPage = {
      pageName: pageName,
      pageAuthor: username,
    };

    foundCategory.pages.push(newPage);
    await foundCategory.save();

    res.status(201).send();
  } catch (error) {
    if (error.code === 11000) {
            
      res.status(400).send('Page name must be unique.');
    } else {
      res.status(500).send( 'Internal server error.');
    }
  }
}


async function updatePage(req, res) {
    try {
      const pageId = req.params.id;
      console.log(pageId);
      const { pageName,username } = req.body.updatedData;
      
      const updatedCategory = await Category.updateMany(
        {
          'pages': {
            $elemMatch: {
              '_id': pageId,
              'pageAuthor': username,
            },
          },
        },
        {
          $set: {
            'pages.$.pageName': pageName,
          },
        },
        { new: true }
      );
      
        console.log(updatedCategory)
      if (updatedCategory.modifiedCount===0) {
        return res
          .status(404)
          .send('You do not have permission to update it');
      }
      
      res.status(200).send();
    } catch (error) {
      console.error("Error updating page ", error);
      res.status(500).send('Internal server error');
    }
  }
  
async function deletePages(req, res) {
    try {
      const {pageIds,username} = req.body;
      const deletePages = await Category.updateMany(
        {
          'pages._id': { $in: pageIds },
          'pages.pageAuthor': username,
        },
        {
          $pull: {
            'pages': { _id: { $in: pageIds }, pageAuthor: username  },
          },
        },
        { new: true }
      );
  
      if (deletePages.modifiedCount === 0) {
        return res.status(404).send('You don\'t have permission to delete them.');
      }
  
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting pages ', error);
      res.status(500).send('Internal server error');
    }
  }
  

module.exports={getPages,addPage,updatePage,deletePages}