var http = require('http');
var querystring = require('querystring');
var mysql = require('mysql');
 
//服务器端接收数据
var server = http.createServer(function(req,res){
	if(req.url !== 'favicon.ico'){
		var params;
		req.on('data',function(data){
			//使用querystring模块中的parse方法将字符串转化为对象
			params = querystring.parse(decodeURIComponent(data));
		})
		req.on('end',function(){
			console.log('The client request data has been received');
			connect(params);
		})
		//使用Access-Control-Allow-Origin解决跨域问题
		res.setHeader('Access-Control-Allow-Origin','*');
		//返回JSON数据
		res.writeHead(200,{'Content-Type' : 'application/json'});
		res.end(JSON.stringify({status : 1}));
	}
}).listen(1337,'127.0.0.1');
 
server.on('error',function(e){
	if(e.code == 'EADDRINUSE'){
		console.log('Server address and port are already occupied');
	}
})
//设置服务器超时时间为1分钟
server.setTimeout(60*1000,function(socket){
	console.log('Server timeout');
	console.log(socket);
})
server.on('close',function(){
	console.log('server is closed');
})
 
//连接数据库
function connect(params){
	var connection = mysql.createConnection({
		host     : '10.12.3.76',       
        user     : 'root',              
        password : 'Wh200128',       
        port: '3306',                   
        database: 'ESC_project_DB' 
	});	
	connection.connect(function(err){
		if(err){
			console.log('Failed to establish connection with mysql database');
		}else{
			console.log('Successfully established a connection with the mysql database');
			connection.query('insert into user set ?',{
				LastName : params.LastName,
				FirstName : params.FirstName,
				phone_num : params.phone_num,
				post_code : params.post_code,
                email : params.email
			},function(err,result){
				if(err){
					console.log('Failed to insert data');
				}else{
					console.log('Succeed to insert data');
					connection.end();
				}
			})
		}
	})
}
