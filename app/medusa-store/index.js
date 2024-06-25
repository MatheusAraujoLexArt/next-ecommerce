const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const port = 9001;
const pool = new Pool({
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

app.use(cors());
app.use(bodyParser.json());

app.get('/search', async (req, res) => {
  const searchTerm = req.query.q;

  if (!searchTerm) {
    return res.status(400).json({ error: 'Missing search term' });
  }

  try {
    const client = await pool.connect();
    const query = `
      SELECT * FROM public.product
      WHERE title ILIKE $1
      ORDER BY id ASC
    `;
    const values = [`%${searchTerm}%`];
    const result = await client.query(query, values);
    client.release();
    res.json(result.rows);
  } catch (err) {
    console.error('Database connection error', err);
    res.status(500).json({ error: 'Database connection error' });
  }
});

app.listen(port, () => console.log(`Servidor Online na porta ${port}!`));

module.exports = app;


// const express = require("express")
// const cors = require("cors");
// const { GracefulShutdownServer } = require("medusa-core-utils")
// const app = express();

// app.use(cors());
// const loaders = require("@medusajs/medusa/dist/loaders/index").default;

// (async() => {
//   async function start() {
//     const directory = process.cwd()

//     try {
//       const { container } = await loaders({
//         directory,
//         expressApp: app
//       })
//       const configModule = container.resolve("configModule")
//       const port = process.env.PORT ?? configModule.projectConfig.port ?? 9000

//       const server = GracefulShutdownServer.create(
//         app.listen(port, (err) => {
//           if (err) {
//             return
//           }
//           console.log(`Server is ready on port: ${port}`)
//         })
//       )

//       // Handle graceful shutdown
//       const gracefulShutDown = () => {
//         server
//           .shutdown()
//           .then(() => {
//             console.info("Gracefully stopping the server.")
//             process.exit(0)
//           })
//           .catch((e) => {
//             console.error("Error received when shutting down the server.", e)
//             process.exit(1)
//           })
//       }
//       process.on("SIGTERM", gracefulShutDown)
//       process.on("SIGINT", gracefulShutDown)
//     } catch (err) {
//       console.error("Error starting server", err)
//       process.exit(1)
//     }
//   }

//   await start()
// })()
