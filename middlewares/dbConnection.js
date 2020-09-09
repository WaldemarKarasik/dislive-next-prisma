

module.exports = async function(req,res,next) {
    try {

        return next()
    } catch(e) {
        console.log(e)
        return next()
    }
}