require(`../Class/Server.js`);
require(`../index.js`);

class ServerManagerMain 
{
	base ; // doit être la main classe pour avoir accer a tous les manager 
	ServerList = []
	constructor(Base) {
       
		this.base = Base;
		//mysql loading to cache
		Base.DbManager.queryAsync("SELECT * FROM accounts")

	}

	async LoadServerToCash(InfoDb)
	{
        const db = new Db()
	}

}

exports.ServerManagerMain = ServerManagerMain