const Cars = require('./cars-model')
const db = require('../../data/db-config')
const vin = require('vin-validator')
const checkCarId = async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const car = await Cars.getById(req.params.id);
    if (car) {
      req.car = car; 
      next();
    } else {
      next({ status: 404, message: `car with id ${req.params.id} is not found` });
    }
  } catch (error) {
    next(error);
  }
}

const checkCarPayload = (req, res, next) => {
  // DO YOUR MAGIC

  if(!req.body.vin)
  return next({
    status:400,
    message: 'vin is missing'
  })
  if(!req.body.make) return next({
    status:400,
    message: 'make is missing'
  }) 
  if(!req.body.model) return next({
    status:400,
    message:'model is missing'
  }) 
  if(!req.body.mileage) return next({
    status:400,
    message: 'mileage is missing'
  }) 
  if(!req.body.title) return next({
    status:400,
    message:'title is missing'
  }) 
  if(!req.body.transmission)return next({
    status:400,
    message:'transmission is missing'
  })
  next()
}

const checkVinNumberValid = (req, res, next) => {
  // DO YOUR MAGIC
if (vin.validate(req.body.vin)){
  next()
}else{
  next({
    status:400,
    message:`vin ${req.body.vin} is invalid`
  })
}
}

const checkVinNumberUnique = async (req, res, next) => {
  // DO YOUR MAGIC
  try{
    const existing = await Cars.getByVin(req.body.vin)
    if(!existing){
      next()
    }else{
      next({
        status:400,
        message: `vin ${req.body.vin} already exist`
      })
    }
  }catch(err){
  next(err)
  }
}

module.exports = {
  checkCarId, checkCarPayload, checkVinNumberValid, checkVinNumberUnique
}