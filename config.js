exports.DATABASE_URL = process.env.DATABASE_URL || 
                       global.DATABASE_URL || 
                       (process.env.NODE_ENV === 'production' ? 
                       //'mongodb://localhose/shopping-list' : 
                       'mongodb://<wangmeng255>:<SoundwaveLi00>@ds139985.mlab.com:39985/mongo_data/shopping-list':
                       'mongodb://localhost/shopping-list-dev');
exports.PORT = process.env.PORT || 8080;