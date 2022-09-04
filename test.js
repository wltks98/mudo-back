const {getData,createIndex,bulk} = require('./middlewares/elasticsearch')

async function b(){
    
    const c =await getData('올거지')
    console.log(c)
    console.log(c[0]._source.column1)
}


createIndex()

