const router=require('express').Router();
const {getAll,createCountry,updateCountry,deleteCountry}=require('../controllers/country')
const checkAuth=require('../middlewares/checkAuth')

router.get('/',checkAuth,getAll);
router.post('/',checkAuth,createCountry);
router.put('/:id',checkAuth,updateCountry);
router.delete('/:id',checkAuth,deleteCountry);
module.exports=router