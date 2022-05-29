const db = require('../helpers/database')

//list all the dogs in the database
exports.getAll = async function getAll (page, limit, order) {
  // TODO: use page, limit, order to give pagination
  let query = "SELECT * FROM dogs;"
  let data = await db.run_query(query)  
  return data
}

//get a single dog by its id  
exports.getById = async function getById (id) {
  let query = "SELECT * FROM dogs WHERE ID = ?"
  let values = [id]
  let data = await db.run_query(query, values)
  return data
}

exports.deleteById = async function deleteById (id) {
  let query = "Delete FROM dogs WHERE ID = ?"
  let values = [id]
  let data = await db.run_query(query, values)
  return data
}

//create a new dog in the database
exports.add = async function add (dog) {  
  let keys = Object.keys(dog)
  let values = Object.values(dog)  
  keys = keys.join(',')   
  let parm = ''
  for(i=0; i<values.length; i++){ parm +='?,'}
  parm=parm.slice(0,-1)
  let query = `INSERT INTO dogs (${keys}) VALUES (${parm})`
  try{
    await db.run_query(query, values)  
    return {"status": 201}
  } catch(error) {
    return error
  }
}

exports.update = async function update (dog,id) {  
    
  //console.log("dog " , dog)
 // console.log("id ",id)
  let keys = Object.keys(dog)
  let values = Object.values(dog)  
  let updateString=""
  for(i=0; i<values.length;i++){updateString+=keys[i]+"="+"'"+values[i]+"'"+"," }
 updateString= updateString.slice(0, -1)
 // console.log("updateString ", updateString)
  let query = `UPDATE dogs SET ${updateString} WHERE ID=${id} RETURNING *;`
  try{
   await db.run_query(query, values)  
    return {"status": 201}
  } catch(error) {
    return error
  }
}


