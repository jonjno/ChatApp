env = environment variable
to get the variable from env we need to require dotenv and config it
like const dotenv = require(dotenv) and dotenv.config(),,after this then we will get the env variable

for import item, go to package.json and type type:"module",then we can use import

when we write all routes on the server.js, it looks so bad ,so we will use middileware
app.use("/api/auth",autRoutes)

Now in the authrotes, all these function can become big,so avoid that we aill write all function logic in the controller
