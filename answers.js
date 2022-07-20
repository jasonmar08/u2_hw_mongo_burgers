// create 5 burgers (at least 3 should be beef)
db.burger.insertMany([
  {
    protein: 'beef',
    cheese: 'yes',
    toppings: ['tomatoes', 'mayonnaise', 'onions', 'mustard']
  },
  {
    protein: 'beef',
    cheese: 'yes',
    toppings: ['relish', 'peanut butter', 'maple syrup', 'ketchup', 'mustard']
  },
  {
    protein: 'beef',
    cheese: 'no',
    toppings: ['onions', 'ramen', 'fried banana', 'tabasco', 'mushrooms']
  },
  {
    protein: 'elk',
    cheese: 'yes',
    toppings: ['french fries', 'guacamole', 'capers', 'pickles', 'maple syrup']
  },
  {
    protein: 'ostrich',
    cheese: 'no',
    toppings: [
      'Worstershire sauce',
      'pickled beets',
      'mango',
      'sriracha',
      'mushrooms'
    ]
  }
])
// find all the burgers
db.burger.find()
// show just the meat of each burger
db.burger.find({}, { protein: 1 })
// show just the toppings of each burger
db.burger.find({}, { toppings: 1 })
// show everything but the cheese
db.burger.find({}, { protein: 1, toppings: 1 })
// find all the burgers with beef
db.burger.find({ protein: 'beef' })
// find all the burgers that are not beef
db.burger.find({ protein: { $ne: 'beef' } })
// find the first burger with cheese
db.burger.findOne({ cheese: 'yes' })
// find one and update the first burger with cheese to have a property of 'double cheese'
db.burger.findOneAndUpdate(
  { cheese: 'yes' },
  { $set: { cheese: 'double cheese' } }
)
// find the burger you updated to have double cheese
db.burger.find({ cheese: 'double cheese' })
// find and update all the beef burgers to be 'veggie'
db.burger.updateMany({ protein: 'beef' }, { $set: { protein: 'veggie' } })
// delete one of your veggie burgers
// WRONG - dELETES ALL : db.burger.remove({meat: 'veggie'})
db.burger.deleteOne({ protein: 'veggie' })
// drop the collection
//Expected Output
//true
db.burger.drop()
// drop the database
//Expected Output
// {
//   "dropped": "burgers",
//   "ok": 1
// }
db.dropDatabase()
//
// Bonus
//recreate your burgers database and your burger collection
//copy paste your insert burgers from above to reseed your database
use burgers
db.burger.insertMany([
  {
    protein: 'beef',
    cheese: 'yes',
    toppings: ['tomatoes', 'mayonnaise', 'onions', 'mustard']
  },
  {
    protein: 'beef',
    cheese: 'yes',
    toppings: ['relish', 'peanut butter', 'maple syrup', 'ketchup', 'mustard']
  },
  {
    protein: 'beef',
    cheese: 'no',
    toppings: ['onions', 'ramen', 'fried banana', 'tabasco', 'mushrooms']
  },
  {
    protein: 'elk',
    cheese: 'yes',
    toppings: ['french fries', 'guacamole', 'capers', 'pickles', 'maple syrup']
  },
  {
    protein: 'ostrich',
    cheese: 'no',
    toppings: [
      'Worstershire sauce',
      'pickled beets',
      'mango',
      'sriracha',
      'mushrooms'
    ]
  }
])
// Change the name of the key cheese to 'pumpkinSpice'
db.burger.updateMany({}, {$rename: {'cheese': 'pumpkinSpice'}})
// find all the burgers with ketchup (or another topping you used at least once)
db.burger.find({toppings: 'mushrooms'})
// find all the burgers with pickles (or a topping you used more than once) and remove the pickles
db.burger.updateMany({}, {$pull: {toppings: {$in: ['mushrooms']}}})
// add a topping of 'eggs' to all the beef burgers
//note since this db is 'reset' there should be no veggie burgers, all beef burgers should still be intact
db.burger.updateMany({protein: {$eq: 'beef'}}, {$addToSet: {toppings: 'eggs'}})

db.burger.updateMany({protein: 'beef'}, {$addToSet: {toppings: 'eggs'}})
//Add a price to each burger, start with $5.00 for each burger
db.burger.updateMany({}, {$set: {price: '$5.00'}})