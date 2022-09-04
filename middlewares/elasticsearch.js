const {Client} = require('@elastic/elasticsearch');
const client = new Client({node:'http://localhost:9200'});

exports.getData = async (str) =>{
    try{
        const body = await client.search({
            index: 'mudo3',
            body: {
                "query": {
                  "match": {
                      "keyword.nori": str
                  }                        
                }
            }
        })

        return body.hits.hits
    }
    catch(err){
        return err;
    }
}

exports.createIndex = async ()=>{
    await client.indices.create({
        index: 'mudo3',
        body: {
            "settings": {
                "analysis": {
                  "analyzer": {
                    "nori": {
                      "tokenizer": "nori_tokenizer"
                    }
                  }
                }
              },
              "mappings": {
                "properties": {
                  "keyword": {
                    "type": "text",
                    "fields": {
                      "nori": {
                        "type": "text",
                        "analyzer": "nori"
                      }
                    }
                  },
                  "key":{
                    "type": "text"
                  }
                }
              }
        }
    })
}

exports.bulk = async (data)=>{

    await client.index({
        index: 'mudo3',
        body: data
        
    })
 
 
}


