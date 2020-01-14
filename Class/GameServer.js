class GameServer {
	Id =0
	GameName = "My Display name"
	FolderName = "MyFodler/dir/to/game"
	GamePort = 0
	GameQuery = 0
	GameRecon = 0
	SshCommandeExtra ="all user command here"
	SshCommande = { get () { return "based started command with port info "+ SshCommandeExtra.replace("rewite some blacklist text by nothing", '')} }
	IsNew = false
	IsDeprecated = false
	constructor( id, c_GameName, c_GamePort, c_GameQuery, c_GameRecon,  c_SshCommandeExtra,  c_Isnewone ) {
		this.Id = id
		this.GameName = c_GameName
		this.GamePort = c_GamePort
		this.GameQuery = c_GameQuery
		this.GameRecon = c_GameRecon
		this.SshCommandeExtra =c_SshCommandeExtra
		this.IsNew = c_Isnewone
	}

	UpdateCommande(NewCmd){
		this.SshCommandeExtra = NewCmd
		this.IsDeprecated = true
	}

	NeedDbUpdate(){
		return this.IsNew ? this.IsNew : this.IsDeprecated
	}



}

exports.GameServer = GameServer