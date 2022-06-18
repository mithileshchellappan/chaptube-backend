var ytdl = require('ytdl-core')
const path = require('path')
const videoDownloader = require('../utils/videoDownloader')
const videoDownloaderService = async (url) =>{
    return new Promise(async(resolve,reject)=>{
        
           try{
            console.log('inside service')
            var videoId = ytdl.getURLVideoID(url)
            console.log(videoId)
            var destinationFolder = path.join(__dirname,'..','videos')
            var videoFile = path.join(destinationFolder,`${videoId}.mp4`)
            console.log('here')
            var result = await videoDownloader(destinationFolder,videoFile,url,videoId)
           resolve({...result,relativePath:path.relative(process.cwd(),result.message)})
           }catch (e){
               reject( {status:"error",message:e})
           }



        
    })

}

module.exports = videoDownloaderService
