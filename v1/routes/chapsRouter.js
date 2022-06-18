const express = require('express')
const router = express.Router();
const controller = require('../../controller')

router.post('/allChaps',controller.downloadAllChaps)
router.post('/videoDownload',controller.downloadVideo)
// router.post('/customChaps',controller.customChaps)
// router.post('/videoDownload',controller.downloadVid)

module.exports = router