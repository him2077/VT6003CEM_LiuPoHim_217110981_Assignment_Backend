
const db = require('../helpers/database')

exports.getAll = async function getAll (limit=10, page=1) {
  const offset = (page - 1) * limit;
  const query = "SELECT * FROM users LIMIT  ? OFFSET  ?;";
  const data = await db.run_query(query, [limit, offset]);
  return data;
}
exports.getSearch = async function getSearch (sfield,q) {
  
  const query = `SELECT ${sfield} FROM users WHERE ${sfield} LIKE '%${q}%' `;
  const data = await db.run_query(query);
  return data;
}

exports.getByUserId = async function getByUserId (id) {
  let query = "SELECT * FROM users WHERE ID = ?"
  let values = [id]
  let data = await db.run_query(query, values)
  return data
}

exports.add = async function add (data) {  
  let keys = Object.keys(data)
  let values = Object.values(data)  
  keys = keys.join(',')   
  let parm = ''
  for(i=0; i<values.length; i++){ parm +='?,'}
  parm=parm.slice(0,-1)
  let query = `INSERT INTO users (${keys}) VALUES (${parm})`
  try{
    await db.run_query(query, values)  
    return {"status": 201}
  } catch(error) {
    return error
  }
}

//get a single user by the (unique) username
exports.findByUsername = async function getByUsername(username) {
  const query = "SELECT * FROM users WHERE username = ?"
   let values = [username]
   let user = await db.run_query(query, values)
  return user;
}
