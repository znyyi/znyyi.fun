const cors = require('cors')

module.exports = cors({
    origin:'http://localhost:8080',
    credentials:true   //允许跨域时携带cookie

});