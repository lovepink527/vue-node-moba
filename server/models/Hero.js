const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: { type: String },
    avatar: { type: String },
    title: { type: String },
    categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }],
    scores: {
        difficult: {
            type: Number
        },
        skills: {
            type: Number
        },
        attack: {
            type: Number
        },
        survive: {
            type: Number
        },
    },
    skills: [{
        icon: { type: String },
        name: { type: String },
        description: { type: String },
        tip: { type: String }
    }],
    item1: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'itme'
    }],
    item2: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'itme'
    }],
    usageTips: { type: String },
    battleTips: { type: String },
    teamTips: { type: String },
    partners: [{
        hero: { type: mongoose.SchemaTypes.ObjectId, ref: 'Hero' },
        description: { type: String },
        tips: { type: String }
    }]
})

module.exports = mongoose.model('Hero', schema)