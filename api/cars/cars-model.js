const db = require('../../data/db-config')

const getAll = async () => {
  const rows = await db('cars')
return rows
}

const getById = async (id) => {
  // DO YOUR MAGIC
  const [record] = await db('cars')
  .select('id', 'vin', 'make', 'model', 'mileage', 'title', 'transmission')
  .where('id', '=', id)

  return record
}

const getByVin = (vin) =>{
  return db('cars').where('vin', vin).first()
}

const create = async (newCar) => {
  // DO YOUR MAGIC
  const [carsId] = await db('cars').insert(newCar)
  const car = await getById(carsId)
  return car
}

module.exports = {
  getAll,getById,getByVin,create
}