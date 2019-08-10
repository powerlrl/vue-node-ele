//@ login&register
const express = require('express')
const router = express.Router()
const Profile = require('../../models/Profiles')
const passport = require('passport')
// $route post api/profiles/add
// @desc 创建信息接口
// @access private
router.patch('/add',passport.authenticate('jwt', {session: false}),(req,res) => {
  const profileFields = {}
  if(req.body.type) profileFields.type = req.body.type
  if(req.body.describe) profileFields.describe = req.body.describe
  if(req.body.income) profileFields.income = req.body.income
  if(req.body.expend) profileFields.expend = req.body.expend
  if(req.body.cash) profileFields.cash = req.body.cash
  if(req.body.remark) profileFields.remark = req.body.remark
  new Profile(profileFields).save().then(profile => {
    return res.json(profile)
  })
})

// $route get api/profiles/
// @desc 获取全部信息
// @access private
router.get('/',passport.authenticate('jwt', {session: false}),(req,res) => {
  Profile.find()
    .then(profile => {
        if(!profile){
          return res.status(400).json('没有任何内容')
        }
        res.json(profile)
    })
    .catch(err => {
      return res.json(err)
    })
})
// $route get api/profiles/?id（前端传递过来的id）
// @desc 获取单个信息
// @access private
router.get('/:id',passport.authenticate('jwt', {session: false}),(req,res) => {
  Profile.findOne({_id: req.params.id})
      .then(profile => {
        if(!profile){
          return res.status(400).json('没有内容')
        }
        res.json(profile)
      })
      .catch(err => {
        res.status(400).json(err)
      })
})
// $route get api/profiles/edit/?id（前端传递过来的id）
// @desc 编辑数据
// @access private
router.patch('/edit/:id',passport.authenticate('jwt', {session: false}),(req,res) => {
  const profileFields = {}
  if(req.body.type) profileFields.type = req.body.type
  if(req.body.describe) profileFields.describe = req.body.describe
  if(req.body.income) profileFields.income = req.body.income
  if(req.body.expend) profileFields.expend = req.body.expend
  if(req.body.cash) profileFields.cash = req.body.cash
  if(req.body.remark) profileFields.remark = req.body.remark
    Profile.findByIdAndUpdate(
      {_id: req.params.id},
      {$set: profileFields},
      {new : true}
    ).then(profile => {
      res.json(profile)
    })
})
// $route get api/profiles/deleted/?id（前端传递过来的id）
// @desc 删除数据
// @access private
router.delete('/deleted/:id',passport.authenticate('jwt', {session: false}),(req,res) =>{
  Profile.findByIdAndDelete({_id: req.params.id})
    .then(profile => {
      profile.save().then(profile => {
        res.json(profile)
      })
    })
    .catch(err => {
      res.status(400).json('删除失败')
    })
})
module.exports = router