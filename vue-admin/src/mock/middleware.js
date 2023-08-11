module.exports = (req, res, next) => {
  // login
  console.log(req)
  if (req.url === '/login') {
    return res.status(200).json({
      code: 0,
      data: '94a08da1fecbb6e8b46990538c7b50b2',
      msg: '成功'
    })
  }
  next()
}
