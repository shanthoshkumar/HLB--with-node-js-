var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var game = new Schema({
  optionid:{
    type:Number,required:true
  },
  team1:{
    type:String,required:true
  },
  team2:{
    type:String,required:true
  },
  selectTeam:{
    type:String,required:true
  },
  saltSecret: String
});

mongoose.model('Game',game)