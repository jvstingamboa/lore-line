const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');
const url = 'mongodb+srv://COPdatabase:EjHV8xZLAVVNO22N@cluster0.siytudi.mongodb.net/?retryWrites=true&w=majority';

const client = new MongoClient(url);
client.connect();



const app = express();


app.use(cors());
app.use(bodyParser.json());
app.use((req, res, next) =>
{
res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader(
'Access-Control-Allow-Headers',
'Origin, X-Requested-With, Content-Type, Accept, Authorization'
);
res.setHeader(
'Access-Control-Allow-Methods',
'GET, POST, PATCH, DELETE, OPTIONS'
);
next();
});


// // justin told me to add this ?
// app.get("*", (req, res) => {
//   res.sendFile(path.join("/", "build", "index.html"));
// });

// Sign-Up
app.post('/api/register', async (req, res, next) =>
{
  var error = '';
  const { email, user, pass, confirm } = req.body;
  
  const db = client.db("test");
  const emailCheck = await db.collection('users').find({email:email}).toArray();
  if (emailCheck.length > 0)
    res.status(201).json({error:'Email already in use'});
  else
  {
    const userCheck = await db.collection('users').find({user:user}).toArray();
    if (userCheck.length > 0)
      res.status(202).json({error:'Username already in use'});
    else
    {
      await db.collection('users').insertOne({"email":email, "user":user, "pass":pass, "userID":0});
      res.status(200).json({error:''});
    }
  }
});

// login 
app.post('/api/login', async (req, res, next) =>
{
  var error = '';
  const { email, password } = req.body;

  const db = client.db("test");
  const results = await db.collection('users').find({email:email.toLowerCase(),pass:password}).toArray();

  var id = -1;
  var un = '';

  if (results.length > 0)
  {
    id = results[0].userID;
    un = results[0].user;
  }

  var ret = { id:id, username:un, error:''};
  res.status(200).json(ret);

});

// create and submit posts
app.post('/api/post', async (req, res, next)=>{
  var error = '';
  const {title, content, author } = req.body;
  const db = client.db("test");
  const result = await db.collection('posts').insertOne({ title, content, author});
  
  var ret = {title:title, error:''};
  res.status(200).json(ret);
});

// edit posts
app.post('/api/edit', async (req, res, next) => {
  const { id, title, content, author } = req.body;
  const db = client.db("test");
  const result = await db.collection('posts').updateOne({ postID: id },{ $set: { title, content, author } });
  //const result = await db.collection('posts').deleteOne({ _id: objectId });

  if (result.matchedCount > 0) {
    res.status(200).json({ error: '', message: 'Post updated successfully' });
  } else {
    res.status(404).json({ error: 'Post not found' });
  }
});

// Delete post
app.post('/api/delete', async (req, res, next) => {
  const postId = req.body.id;
  const db = client.db("test");
  const result = await db.collection('posts').deleteOne({ postID: postId });

  if (result.deletedCount > 0) {
    res.status(200).json({ error: '', message: 'Post deleted successfully' });
  } else {
    res.status(404).json({ error: 'Post not found' });
  }
});

// Search posts
app.post('/api/search', async(req, res, next) =>
{
//   incoming: search
//   outgoing: results[], error

  var error = "";

  const {query } = req.body;

    var _search = query.trim();

    const db = client.db("test");
    const results = await db.collection('posts').find({"title":{$regex:_search+'.*'}}).toArray();

    var _ret = [];
    for(var i = 0; i < results.length; i++){
        _ret.push(results[i]);
    }

    console.log(_ret);

    var ret = {results:_ret, error:error};
    res.status(200).json(ret);
});

app.post('/api/myPosts', async(req, res, next) =>
{
  var error = "";
  const { author } = req.body;
  const db = client.db("test");
  const results = await db.collection('posts').find({ author: author }).toArray();
  var ret = {results:results, error:error};
  res.status(200).json(ret);
});

// adds random posts to the home page
app.post('/api/random', async (req, res, next)=>{
  var error = '';
  const numberOfPosts = req.body.numberOfPosts || 1;
  const db = client.db("test");
  const randomPosts = await db.collection('posts').aggregate([
    { $sample: { size: 4 } }
  ]).toArray();
  var ret = {results:randomPosts, error:error};
  res.status(200).json(ret);
});

app.listen(5000); // start Node + Express server on port 5000
