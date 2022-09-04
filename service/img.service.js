const {getData,createIndex,bulk} = require('../middlewares/elasticsearch')
const {detection} = require('../middlewares/vision')

module.exports = class authService {

    //검색
    static getImg = async (dto,done) => {

        const {keyword}=dto
        
        try{
            let key = await getData(keyword)
            if(key.length>0){
                console.log(key[0]._source.keyword)
                done(null,{success: true,message:'조회 성공',url:`https://${process.env.bucket}.s3.${process.env.region}.amazonaws.com/${key[0]._source.key}`,key:key[0]._source.key})
            }
            else{
                done(null,{success: false,message:'검색 결과 없음'})
            }
        }catch(error){
            done(error,{success: false,message:error.message})
        }
    }

    //업로드
    static uploadImg = async (dto,done) => {

        const {files} = dto

        try{
            for(let file of files){
                let keyword=await detection(`https://${process.env.bucket}.s3.${process.env.region}.amazonaws.com/${file.key}`)
                
                if(keyword){
                    let keyword2=keyword.replace('무한도전', '')
                    keyword2=keyword2.replace('MBC', '')
                    bulk({key:file.key,keyword:keyword2}) 
                }
                else{
                    for(let i=0; i<2; i++){
                        let keyword=await detection(`https://${process.env.bucket}.s3.${process.env.region}.amazonaws.com/${file.key}`)
                        if(keyword){
                            let keyword2=keyword.replace('무한도전', '')
                            keyword2=keyword2.replace('MBC', '')
                            bulk({key:file.key,keyword:keyword2})
                            break;
                        }
                    }

                    console.log('인식 안됨')
                }
            }
            done(null,{success: true,message:'업로드 성공'})
        
        }catch(error){
            done(error,{success: false,message:error.message})
        }
    }

    
    
    
};



