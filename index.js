import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 4000;

// In-memory data store
const dateOptions = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
const dateSignature = new Date().toLocaleString("en-US", { timeZone: "Africa/Lagos", ...dateOptions });

let posts = [
  {
    id: 1,
    title: "The Rise of Decentralized Finance",
    content:
      "Decentralized Finance (DeFi) is an emerging and rapidly evolving field in the blockchain industry. It refers to the shift from traditional, centralized financial systems to peer-to-peer finance enabled by decentralized technologies built on Ethereum and other blockchains. With the promise of reduced dependency on the traditional banking sector, DeFi platforms offer a wide range of services, from lending and borrowing to insurance and trading.",
    author: "Chijindu Nwokeohuru",
    date: dateSignature,
  },
  {
    id: 2,
    title: "The Impact of Artificial Intelligence on Modern Businesses",
    content:
      "Artificial Intelligence (AI) is no longer a concept of the future. It's very much a part of our present, reshaping industries and enhancing the capabilities of existing systems. From automating routine tasks to offering intelligent insights, AI is proving to be a boon for businesses. With advancements in machine learning and deep learning, businesses can now address previously insurmountable problems and tap into new opportunities.",
    author: "Mia Williams",
    date: dateSignature,
  },
  {
    id: 3,
    title: "Sustainable Living: Tips for an Eco-Friendly Lifestyle",
    content:
      "Sustainability is more than just a buzzword; it's a way of life. As the effects of climate change become more pronounced, there's a growing realization about the need to live sustainably. From reducing waste and conserving energy to supporting eco-friendly products, there are numerous ways we can make our daily lives more environmentally friendly. This post will explore practical tips and habits that can make a significant difference.",
    author: "Samuel Green",
    date: dateSignature,
  },
  {
    id: 4,
    title: "The Future of Quantum Computing",
    content:
      "Quantum computing is poised to revolutionize the tech industry. With the ability to solve complex problems that are currently unsolvable by classical computers, quantum computers have the potential to transform fields such as cryptography, materials science, and artificial intelligence. This post explores the current state of quantum computing and its future prospects.",
    author: "Chijindu Nwokeohuru",
    date: dateSignature,
  },
  {
    id: 5,
    title: "Blockchain Beyond Cryptocurrency",
    content:
      "While blockchain technology is best known for its role in powering cryptocurrencies like Bitcoin, its potential applications extend far beyond digital currencies. From supply chain management to secure voting systems, blockchain technology offers a decentralized and transparent way to record transactions and data. This post delves into the various use cases of blockchain technology beyond cryptocurrency.",
    author: "Jane Doe",
    date: dateSignature,
  },
  {
    id: 6,
    title: "The Rise of Edge Computing",
    content:
      "Edge computing is an emerging paradigm that brings computation and data storage closer to the location where it is needed, improving response times and saving bandwidth. This post discusses the benefits of edge computing, its applications, and how it differs from traditional cloud computing.",
    author: "Chijindu Nwokeohuru",
    date: dateSignature,
  },
];

let lastId = 6;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// GET all posts
app.get("/posts", (req, res) => {
  console.log(posts);
  res.json(posts);
});

// GET a specific post by id
app.get("/posts/:id", (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ message: "Post not found" });
  res.json(post);
});

// POST a new post
app.post("/posts", (req, res) => {
  const newId = lastId += 1;
  const post = {
    id: newId,
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    date: new Date(),
  };
  lastId = newId;
  posts.push(post);
  res.status(201).json(post);
});

// PATCH a post when you just want to update one parameter
app.patch("/posts/:id", (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ message: "Post not found" });

  if (req.body.title) post.title = req.body.title;
  if (req.body.content) post.content = req.body.content;
  if (req.body.author) post.author = req.body.author;

  res.json(post);
});

// DELETE a specific post by providing the post id
app.delete("/posts/:id", (req, res) => {
  const index = posts.findIndex((p) => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Post not found" });

  posts.splice(index, 1);
  res.json({ message: "Post deleted" });
});

app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});
