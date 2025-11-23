import express from 'express';
import cors from 'cors';
import 'dotenv/config.js';
import { loggerService } from './service/logger.service.js';


const app = express()

const corsOptions={
    origin:[
        'http://127.0.0.1:5173',
        'http://localhost:5173',
        'http://127.0.0.1:5174',
        'http://localhost:5174'
    ],
    credentials:true
}

app.use(cors(corsOptions));
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

import { spearRouter } from './api/spear/spear.routes.js';
// import { userRouter } from './api/user/user.routes.js';
import { authRouter } from './api/auth/auth.routes.js';
import { diveRouter } from './api/dive/dive.routes.js';


app.use("/api/spear",spearRouter)
app.use("/api/dive",diveRouter)
// app.use("/api/user",userRouter)
app.use("/api/auth",authRouter)


//* For SPA (Single Page Application) - spear all routes and send to the index.html
// app.get('/*all', (req, res) => {
//     res.sendFile(path.resolve('public/index.html'))
// })

const port = process.env.PORT || 3030;
app.listen(port, () =>
    loggerService.info(`Server listening on port http://localhost:${port}/`)
)
