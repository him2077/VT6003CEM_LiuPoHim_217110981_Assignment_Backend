const {validateDog} = require('../controllers/validation');
const Router = require('koa-router')
const auth = require('../controllers/auth');
const bodyParser = require('koa-bodyparser')
const model = require('../models/dogs')
const likes = require('../models/likes');
const prefix = '/api/v1/dogs';
const router = Router({prefix: prefix});
const request = require('request')

router.get('/', getAll)
router.post('/', bodyParser(),validateDog, createDog)
router.get('/user/:id([0-9]{1,})', getByUserId)
router.get('/:id([0-9]{1,})', getById)
router.put('/:id([0-9]{1,})',bodyParser(), validateDog,updateDog)
router.del('/:id([0-9]{1,})', deleteDog)
router.get('/searchDog', getSearch)

router.get('/:id([0-9]{1,})/likes', likesCount);
router.post('/:id([0-9]{1,})/likes/lc', likesCheck);
router.post('/:id([0-9]{1,})/likes', auth, likePost);
router.del('/:id([0-9]{1,})/likes', auth, dislikePost);


async function getAll(ctx) {

  const {page=1, limit=100 , order='id'} = ctx.request.query;
  const result = await model.getAll(page, limit, order);
  if (result.length) {
    const body = result.map(post => {
      // extract the post fields which wants to send back
      const {id, name, gender, breed, description, age, imageurl, userid} = post;
      // add links to the post for HATEOAS compliance
      // clients can follow these to find related resources
      const links = {
       likes: `https://${ctx.host}${prefix}/${post.id}/likes`,
       self: `https://${ctx.host}${prefix}/${post.id}`
        
      }
      return {id, name, gender, breed, description, age, imageurl, userid, links};
    });
    ctx.body = body;
    
  }
}

async function getSearch(ctx, next){

  let {limit=20, page=1, fields="", order='id'} = ctx.request.query;

  limit = parseInt(limit);
  page = parseInt(page);
  
  limit = limit > 100 ? 100 : limit;
  limit = limit < 1 ? 20 : limit;
  page = page < 1 ? 1 : page;
 let result="";
  console.log('fields: ', fields);
  if (fields!=""){
    fields = fields.replaceAll('_', ' ');
      console.log('After fields: ', fields);
    result= await model.getSearch(fields)
  }
  else
    result= await model.getAll(limit, page, order);
  if (result.length) {
    const body = result.map(post => {
      // extract the post fields we want to send back (summary details)
      const {id, name, gender, breed, description, age, imageurl, userid} = post;
      // add links to the post summaries for HATEOAS compliance
      // clients can follow these to find related resources
      const links = {
       likes: `https://${ctx.host}${prefix}/${post.id}/likes`,
       self: `https://${ctx.host}${prefix}/${post.id}`
        
      }
      return {id, name, gender, breed, description, age, imageurl, userid, links};
    });
    ctx.body = body;
    
  }
  
}

async function getById(ctx) {
  let id = ctx.params.id
  let dog = await model.getById(id)
  if (dog.length) {
    ctx.body = dog[0]
  }
}
async function getByUserId(ctx) {
  let id = ctx.params.id
  let dogs = await model.getByUserId(id)
    if (dogs.length) {
    const body = dogs.map(post => {
      // extract the post fields we want to send back (summary details)
      const {id, name, gender, breed, description, age, imageurl, userid} = post;
      // add links to the post summaries for HATEOAS compliance
      // clients can follow these to find related resources
      const links = {
       likes: `https://${ctx.host}${prefix}/${post.id}/likes`,
       self: `https://${ctx.host}${prefix}/${post.id}`
        
      }
      return {id, name, gender, breed, description, age, imageurl, userid, links};
    });
    ctx.body = body;
    
  }
}
async function createDog(ctx) {
  const body = ctx.request.body
  let result = await model.add(body)
  if (result) {
    ctx.status = 201
    ctx.body = result
  } else {
    ctx.status=201
    ctx.body = "{}"
  }
}

async function updateDog(ctx) {
  // TODO edit an existing Dog
   const body = ctx.request.body
   let id = ctx.params.id
 // console.log("route-Dog " , body)
 // console.log("route-id ",id)
  let result = await model.update(body,id)
  console.log(" result", result)
  if (result) {
    ctx.status = 201
    ctx.body = `Dog with id ${id} updated` 
  } 
}

async function deleteDog(ctx) {
  // TODO delete an existing Dog
   let id = ctx.params.id
  let dog = await model.deleteById(id)
  ctx.status=201
    ctx.body = `Dog with id ${id} deleted`
}

async function likesCount(ctx) {
  // For you TODO: add error handling and error response code
  const id = ctx.params.id;
  const result = await likes.count(id);
  ctx.body = result ? result : 0;
}

async function likesCheck(ctx) {
  // For you TODO: add error handling and error response code
  const uid = ctx.state.user.id;
  const id = parseInt(ctx.params.id);
  const result = await likes.findLikeCheck(id,uid);
  ctx.body = result.exisiting ? {message: "exit"} : {message: "error"};
}
async function likePost(ctx) {
  // For you TODO: add error handling and error response code
  const uid = ctx.state.user.id;
  const id = parseInt(ctx.params.id);
  const result = await likes.like(id, uid);
  console.log(result);
  ctx.body = result.affectedRows ? {message: "liked"} : {message: "error"};
}

async function dislikePost(ctx) {
  // For you TODO: add error handling and error response code
  const uid = ctx.state.user.id;
  const id = parseInt(ctx.params.id);
  const result = await likes.dislike(id, uid);
  console.log(result);
  ctx.body = result.affectedRows ? {message: "disliked"} : {message: "error"};
}

module.exports = router;
