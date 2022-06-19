const express = require('express')
const router = express.Router();
const controller = require('../../controller')

router.post('/allChaps',controller.downloadAllChaps)
router.get('/allChaps',(req,res)=>{res.send( `<h1>All chaps </h1>`)})
router.post('/videoDownload',controller.downloadVideo)
// router.post('/customChaps',controller.customChaps)
// router.post('/videoDownload',controller.downloadVid)

module.exports = router