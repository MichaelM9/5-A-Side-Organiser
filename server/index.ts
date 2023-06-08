import express, {Request, Response} from 'express'
const app = express()

app.get('/', function (req: Request, res: Response) {
  res.send('Hello World')
})

app.listen(5000, () => console.log("Application started on port: 5000"));
