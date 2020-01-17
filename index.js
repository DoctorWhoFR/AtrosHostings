const express = require('express')
const app = express()
var request = require('request')
const uuidv1 = require('uuid/v1')
var unirest = require('unirest');

const { ServerManagerMain } = require('./ServerManager/ServerManagerMain');
const { RequestManagerMain } = require('./RequestManager/RequestManagerMain');
const { Db } = require('./Class/Db');

fs = require('fs')
path = require('path')
node_ssh = require('node-ssh')

var jwt = require('jsonwebtoken')



//------config part------

let WebServerApiPort = 666



class Main {
	Httpd;
	ServerManager;
	DbManager;
	UserManager;

	constructor() {	
		this.DbManager = new Db();
		this.Httpd = new RequestManagerMain(this, WebServerApiPort);
		this.ServerManager = new ServerManagerMain(this);
	}
	
}

new Main();