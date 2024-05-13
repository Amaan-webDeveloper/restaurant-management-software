const asyncHandler = (func) => async (req, res, next) => {

    try {
        await func(req, res, next)
    } catch (error) {
        
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message,
            error
        })
    }
    // return (req, res, next) => {
    //     Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err))
    // }




}
export {asyncHandler}




// const asyncHandler = (fn) => async (req, res, next) => {
//     try {
//         await fn(req, res, next)
//     } catch (error) {
//         res.status(err.code || 500).json({
//             success: false,
//             message: err.message
//         })
//     }
// }