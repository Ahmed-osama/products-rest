const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, `${new Date().toISOString()}-${file.originalname}`)
  },
})

const fileFilter = (req, file, cb) => {
  if (['image/jpeg', 'image/png'].includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(new Error('invalid file type'), false)
  }
}
module.exports = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 2,
  },
  fileFilter
})