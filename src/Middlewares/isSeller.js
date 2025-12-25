const isSeller = (req,res,next) => {
    try{
        if(req.user.role !== "seller")
        {
            throw new Error("Access Denied")
        }
        next()
    }
    catch(error){
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    isSeller
}