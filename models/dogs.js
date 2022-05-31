const db = require('../helpers/database')

//list all the dogs in the database
exports.getAll = async function getAll (page=1, limit=10, order = 'id') {
  const offset = (page - 1) * limit;
  const query = `SELECT * FROM dogs ORDER BY ${order} LIMIT  ? OFFSET ?;`;
  const data = await db.run_query(query, [limit, offset]);
  return data;
}

exports.getSearch = async function getSearch(fields, order = 'id') {
    let query = `SELECT * FROM dogs ${fields}`;
    query += ` ORDER BY ${order}`;
  
  const data = await db.run_query(query);
  return data;
}

//get a single dog by its id  
exports.getById = async function getById (id) {
  let query = "SELECT * FROM dogs WHERE id = ?"
  let values = [id]
  let data = await db.run_query(query, values)
  return data
}
//get all dogs posted by user
exports.getByUserId = async function getById (id) {
  let query = "SELECT * FROM dogs WHERE userid = ?"
  let values = [id]
  let data = await db.run_query(query, values)
  return data
}

exports.deleteById = async function deleteById (id) {
  let query = "Delete FROM dogs WHERE id = ?"
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
  for(i=0; i<values.length;i++)
  {
    updateString+=keys[i]+"="+"'"+values[i]+"'"+"," 
  }
    updateString= updateString.slice(0, -1)
 // console.log("updateString ", updateString)
  let query = `UPDATE dogs SET ${updateString} WHERE id=${id} RETURNING *;`
  try{
   await db.run_query(query, values)  
    return {"status": 201}
  } catch(error) {
    return error
  }
}


