node_ssh = require('node-ssh')
 class Server {

	c_host = "fezf"
	c_username = "ezfzef"
	c_password = "ezfzef"
	c_power = "1000"
	c_avaiblepower = "50"
	ssh = "qsdq"
	IsNew = false;
	IsDeprecated = false;
	constructor(X_host, X_password, X_username, newone) {
       
		this.c_host = X_host
		this.c_password = X_password
		this.c_username = X_username
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

var server = new Server('test', 't', 'te')