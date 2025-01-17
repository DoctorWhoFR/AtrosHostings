
const { Server } = require(`../Class/Server.js`);


class ServerManagerMain 
{
	base ; // doit être la main classe pour avoir accer a tous les manager 
	ServerList = []
	ServerId= 0;
	GameServerId= 0;
	constructor(Base) {
       
		this.base = Base;
		//mysql loading to cache
		this.base.DbManager.queryAsync("SELECT * FROM `dedicatedserver` ", (result)=> {
			
			result.forEach(object =>{
				this.LoadServerToCash(object)
			})
		})
	}

	LoadServerToCash(InfoDb)
	{	
		this.ServerId = InfoDb.Id
		this.ServerList[InfoDb.Id] = new Server(this.base, InfoDb.Id, InfoDb.Host, InfoDb.Password, InfoDb.Username, InfoDb.Puissance, InfoDb.UsedPuissance, false)
		
	}

	AddServerToCash(Host, Password, Username, Puissance)
	{	
		this.ServerId++
		this.ServerList[this.ServerId] = new Server(this.base, this.ServerId, Host, Password, Username, Puissance, 0, true)
		
	}

}

exports.ServerManagerMain = ServerManagerMain