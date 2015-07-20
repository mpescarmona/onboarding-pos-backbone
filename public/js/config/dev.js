var config;

config = {
	wsBaseUrl: function() {
		var CONST = {
			'ws_ip'       : '172.17.100.138',
			'ws_port'     : '8080'
		};

	return CONST.ws_ip + ':' + CONST.ws_port
	}
}