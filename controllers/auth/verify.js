const { NotFound } = require('http-errors')

const { User } = require('../../model')

const verify = async (req, res) => {
  const { verificationToken } = req.params
  const user = await User.findOne({ verificationToken })
  if (!user) {
    throw new NotFound('Verification token not found')
  }
  await User.findByIdAndUpdate(user._id, {
    verificationToken: null,
    verify: true,
  })

  return res.status(200).redirect(`${process.env.FRONTEND_URL}`)
}

module.exports = verify
