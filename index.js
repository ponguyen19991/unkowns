const express = require('express')
const app = express()
var cors = require('cors')
const puppeteer = require('puppeteer')

app.use(express.urlencoded({
    extended: false
}))
app.use(express.json())
app.use(
    cors({})
)

const courses = [
    { id: 1, name: 'course1' },
    { id: 2, name: 'course2' }
]

const links = [
    
]


app.get('/api/courses', (req, res) => {
    res.send(courses)
})

app.get('/links/result', (req, res) => {
    res.send(links)
})

// app.post('/api/courses', (req, res) => {
//     console.log(req.body)
//     res.send('')
// })

app.use(function(req, res, next) { 
    res.header("Access-Control-Allow-Origin", "*"); 
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); 
    next(); });

app.post('/api/links',  async (req, res) => {
    // const schema = { 
    //     url: GetApiVideo()
    // }

    // const result = Joi.validate(req.body, schema)
    // if(result.error) {
    //     res.status(400).send(result.error.details[0].message)
    //     return
    // }

    
    // console.log(req.body.url);
    
    let result = await GetApiVideo(req.body.url);
    // console.log(result);
    res.send({"result": result})
})

// app.get('/api/courses/:id', (req, res) => {
//     res.send(req.params.id)
// })


app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) res.status(404).send('The course with the given ID was not found!!')
    res.send(course) 
})

app.get('/api/links/result/:id', (req, res) => {
    const link = links.find(c => c.id === parseInt(req.params.id))
    if (!links) res.status(404).send('The link with the given ID was not found!!')
    res.send(link) 
})

// app.get('/api/posts/:year/:month', (req, res) => {
//     res.send(req.params)
// })

// http://localhost:3000/api/posts/2021/12?sortBy=name => export: " sortBy: "name" "
// app.get('/api/posts/:year/:month', (req, res) => {
//     res.send(req.query)
// })

// PUPPERTEER
async function GetApiVideo(url) {
    await this.page.goto(url);
    let link = await this.page.evaluate(() => {return window.location.href});
    return new Promise(resolve => resolve(link));
}  

async function initPuppeteer() {
    const browser = await puppeteer.launch({
        args: ["--no-sandbox",
            "--disable-setuid-sandbox"]
    });
    this.page = await browser.newPage();
}

const port = process.env.PORT || 4000
app.listen(port, () => {    
        console.log(`Listent on port ${port}`);
        initPuppeteer();
    }
)