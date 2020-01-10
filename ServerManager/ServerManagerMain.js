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
		Base.DbManager.queryAsync("SELECT * FROM `dc_comments` ", async (result)=> {
		
			result.forEach(object =>{
				this.LoadServerToCash(object)
			})
		})
	}

	async LoadServerToCash(InfoDb)
	{	
		this.ServerId = InfoDb.Id
		this.ServerList.push(new Server(InfoDb.Id, InfoDb.Host, InfoDb.Password, InfoDb.Username, InfoDb.Puissance, InfoDb.UsedPuissance, false))
		
	}

}

exports.ServerManagerMain = ServerManagerMain