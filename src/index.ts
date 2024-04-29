import express from 'express';

import { pageRoute } from "./routes/page";
import { tableRoute } from "./routes/table";
import { userRoute } from "./routes/user";
import { searchRoute } from "./routes/search";

const port = process.env.PORT || 4009;
const prefix = process.env.API_PREFIX || '/v1';
const notionToken = process.env.NOTION_TOKEN;

// ----------------------------------------
const router = express.Router();
router.get(`/page/:pageId`, async (req, res) => {
  
  const resp = await pageRoute(req.params.pageId, notionToken);
  res.json(resp);
});

router.get("/table/:pageId", async (req, res) => {
  const resp = await tableRoute(req.params.pageId, notionToken);
  res.status(resp.status).json(resp.data);
});

router.get("/user/:userId", async (req, res) => {
  const resp = await userRoute(req.params.userId, notionToken);
  res.json(resp);
});

router.get("/search", async (req, res) => {
  const ancestorId = req.query.ancestorId as string || '';
  const query = req.query.query as string || '';
  const limit = Number(req.query.limit || 20);

  const resp = await searchRoute(ancestorId, query, limit, notionToken);
  res.status(resp.status).json(resp.data);
});

// ----------------------------------------
const app = express();

// all requests
app.use((req, res, next) => {
  console.log('req:', req.method, req.url);
  next();
});

app.use(prefix, router);

// 404
app.get('*', function(req, res){
  res.status(404).send('Endpoint not found.');
});

app.listen(port, () => {
  console.log(`server started on :${port}`);
});
