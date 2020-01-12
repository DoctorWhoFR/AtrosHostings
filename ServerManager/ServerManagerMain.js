require(`../index.js`);
const { Server } = require(`../Class/Server.js`);


class ServerManagerMain 
{
	base ; // doit être la main classe pour avoir accer a tous les manager 
	ServerList = []
	ServerId= 0;
	constructor(Base) {
       
		this.base = Base;
		//mysql loading to cache
		Base.DbManager.queryAsync("SELECT * FROM `accounts` ", (result)=> {
			console.log(result)
			result.forEach(object =>{
				this.LoadServerToCash(object)
			})
		})
	}

	LoadServerToCash(InfoDb)
	{	
		this.ServerId = InfoDb.Id
		this.ServerList[InfoDb.Id] = new Server(InfoDb.Id, InfoDb.Host, InfoDb.Password, InfoDb.Username, InfoDb.Puissance, InfoDb.UsedPuissance, false)
		
	}

	AddServerToCash(Host, Password, Username, Puissance)
	{	
		this.ServerId++
		this.ServerList[this.ServerId] = new Server(this.ServerId, Host, Password, Username, Puissance, 0, true)
		
	}

}

exports.ServerManagerMain = ServerManagerMain