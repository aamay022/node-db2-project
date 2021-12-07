// STRETCH
const cars = [
    {
        vin: '1111111',
        make:'tesla',
        model:'S',
        mileage: 1222,
        title: 'clean',
        transmission:'manual'
    }
]

exports.seed = function(knex){
    return knex('cars')
    .truncate().then(()=>{
        return knex('cars').insert(cars)
    })
}