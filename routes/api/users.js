//@ login&register
const express = require('express')
const router = express.Router()
const User = require('../../models/Users')
const md5 = require('md5')
const gravatar = require('gravatar')
const jwt = require('jsonwebtoken')
const keys = require('../../config/keys')
const passport = require('passport')
// $route get api/users/test
// @desc 获取json数据
// @access public
router.get('/test', (req, res) => {
  res.json({
    'msg': 'json数据'
  })
})
// $route get api/users/register
// @desc 获取json数据
// @access public
router.post('/register', (req, res) => {
  // 查询邮箱是否已经注册
  User.findOne({
      email: req.body.email
    })
    .then((user) => {
      if (user) {
        return res.status(400).json('邮箱被占用')
      }
      let avatar = gravatar.url(req.body.email, {
        s: '200',
        r: 'pg',
        d: 'mm'
      });
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        identify: req.body.identify,
        password: req.body.password,
        date: req.body.date
      })
      newUser.password = md5(newUser.password)
      newUser.save()
        .then(user => res.json(user))
        .catch(err => console.log(err))
    })
})
// $route get api/users/login
// @desc token
// @access private
router.post('/login', (req, res) => {
  let email = req.body.email
  let password = req.body.password
  User.findOne({
      email
    })
    .then(user => {
      if (!user) {
        return res.status(404).json("用户不存在")
      } else {
        //用户的密码匹配
        if (md5(password) === user.password) {
          //设置jwt
          let rule = {
            id: user.id,
            name: user.name,
            avatar: user.avatar,
            identify: user.identify
          }
          jwt.sign(rule, keys.secretKey, {
            expiresIn: 3600
          }, (err, token) => {
            if (err) throw err
            //返回token
            res.json({
              success: true,
              token: 'Bearer ' + token
            })
          })
        } else {
          return res.json("密码错误")
        }
      }
    })
})
// $route get api/users/current
// @desc token
// @access private

router.get('/current', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email,
    identify: req.user.identify
  })
})
module.exports = router