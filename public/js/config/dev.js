define('WsConfig', [
], function() {
	var wsConfig;

	var CONST = {
		'protocol': 'http',
		'ws_ip'   : '172.17.101.42',
		'ws_port' : '8080'
	};

	wsConfig = {
		wsBaseUrl: function() {

		return CONST.protocol + '://' + CONST.ws_ip + ':' + CONST.ws_port;
		}
	}

	return wsConfig;
});

