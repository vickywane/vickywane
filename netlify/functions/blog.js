const { Pool } = require("pg");
const format = require("pg-format");
const fs = require("fs")
const path = require("path")

const rootFilePath = path.join(__dirname, "./root.crt")
const rootFile = fs.readFileSync(rootFilePath).toString()

const client = new Pool({
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT,
  user: process.env.USERNAME,
  ssl: {
    ca: rootFile
  }
});

exports.handler = async ({ queryStringParameters }, context) => {
  const { order } = queryStringParameters;

  try {
    
    // const clientPool = await client.connect();

    // const sqlStatement = format(
    //   "SELECT * FROM activities ORDER BY date_created %s",
    //   order || "ASC"
    // );

    // const { rows } = await clientPool.query(sqlStatement);
    
    return {
      statusCode: 200,
      body: JSON.stringify({ data: "rows" }),
    };
  } catch (e) {
    clientPool.release()

    return {
      statusCode: 500,
      body: JSON.stringify({
        response: "An internal server error occurred"
      }),
    };
  }
};
