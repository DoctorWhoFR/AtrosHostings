const express = require('express')
const app = express()
var request = require('request')
const uuidv1 = require('uuid/v1')
var unirest = require('unirest');

const { ServerManagerMain } = require('./ServerManager/ServerManagerMain');
const { Db } = require('./Class/Db');

fs = require('fs')
path = require('path')
node_ssh = require('node-ssh')

var jwt = require('jsonwebtoken')

class Main {
	ServerManager;
	DbManager;
	UserManager;

	constructor() {
	
		this.DbManager = new Db();
		this.ServerManager = new ServerManagerMain(this);
	}
	
}

new Main();