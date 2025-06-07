const {getUser} = require('./repository_peserta')
const ambiluser = async()=> {
    const user = await getUser()
    return {
        msg:'success',
        data: user
    }
}

module.exports = {
    ambiluser
}