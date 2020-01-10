node_ssh = require('node-ssh')
 class Server {

	c_DB_Id = 0
	c_host = "fezf"
	c_username = "ezfzef"
	c_password = "ezfzef"
	c_power = "1000"
	c_used = "50"
	ssh = "qsdq"
	IsNew = false;
	IsDeprecated = false;
	constructor(DB_Id, X_host, X_password, X_username, x_power, x_Used, newone) {
       
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
		console.log('il est passer')
		this.ssh = new node_ssh()
        
		this.ssh.connect({
			host: this.c_host,
			username: this.c_username,
			password: this.c_password
		}).catch((error) =>{
					console.log("could not connect to server ")
				})
	}

	createServer() {
		console.log('test')
		return false
	}

	deleteServer() {
	}

	// manager
	startServer() {


	}

	stopServer() {

	}

}

exports.Server = Server 
