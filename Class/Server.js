node_ssh = require('node-ssh')
 class Server {
	base
    ListGameServer = [] // index by GameServerId
	c_Id = 0
	c_host = "fezf"
	c_username = "ezfzef"
	c_password = "ezfzef"
	c_power = 1000
	c_used = 0
	ssh
	
	IsNew = false;
	IsDeprecated = false;
	constructor(Base, DB_Id, X_host, X_password, X_username, x_power, x_Used, newone) {
        this.base = Base
		this.c_Id = DB_Id
		this.c_host = X_host
		this.c_password = X_password
		this.c_username = X_username
		this.c_power = x_power
		this.c_used = x_Used
		this.ConnectSsh()
		this.IsNew = newone// ca c'est pour le loading du cache ou si on en ajoute un
	}

	ConnectSsh() {
		if (this.ssh != null)
            this.ssh = null
		this.ssh = new node_ssh()
        
		this.ssh.connect({
			host: this.c_host,
			username: this.c_username,
			password: this.c_password
		}).then(()=>{
			console.log("connected to node server ")
		}).catch((error) =>{
			console.log("could not connect to node server ")
		})
	}

	GetServerById(Id){
		return ListGameServer.includes(Id) ? ListGameServer[id] : null
	}

	createServer(GameServerId, FolderName, GameName, PowerUsed) {
		var remain = c_used + PowerUsed
		if( remain > c_power )
			return false
		c_used = remain

        this.ListGameServer[0] = "tamere"

		return false
	}

	deleteServer() {
	}

	// manager
	startServer() {


	}

	stopServer() {

	}

	
	NeedDbUpdate(){
		return this.IsNew ? this.IsNew : this.IsDeprecated
	}
	
	Save(){
		if (NeedDbUpdate())
		{
			if(this.IsNew){
				var list = []
				this.ListGameServer.forEach((key, object) =>{
					list.psuh(key)
				})
				this.base.DbManager.queryAsync("INSERT INTO `dedicatedserver`(`Id`, `Ip`, `Username`, `Password`, `Power`, `Used`, `AllGameServer`) VALUES ("+this.c_Id+",'"+this.c_host+"','"+this.c_username+"','"+this.c_password+"',"+this.c_power+","+this.c_used +",'"+JSON.stringify(list)+"')") 	
			}else
			{
				this.base.DbManager.queryAsync("UPDATE `dedicatedserver` SET `Ip`='"+this.c_host+"',`Username`='"+this.c_username+"',`Password`='"+this.c_password+"',`Power`="+this.c_power+",`Used`="+this.c_used +",`AllGameServer`='"+JSON.stringify(list)+"' WHERE `Id`="+this.c_Id) 	
			}
			IsDeprecated = false
			IsNew = false
		}
	}

}




exports.Server = Server 
