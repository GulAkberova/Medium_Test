const express=require("express")
const port =5000

const app = express()
const userRoutes=require('./routes/user')
// const postRoutes=require('./routes/post')
// const likesRoutes=require('./routes/likes')
// const commentsRoutes=require('./routes/comments')
const authRoutes=require('./routes/auth')

app.use('/api/users',userRoutes)
// app.use('/api/post',postRoutes)
// app.use('/api/likes',likesRoutes)
// app.use('/api/comments',commentsRoutes)
app.use('/api/auth',authRoutes)

app.listen(port,()=>{
    console.log(`Server running on port ${port}`)
})