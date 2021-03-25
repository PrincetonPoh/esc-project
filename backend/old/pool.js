var pool = mysql.createPool({
	host     : '10.12.3.76',       
  user     : 'root',              
  password : 'Wh200128',       
  port: '3306',                   
  database: 'ESC_project_DB' 
});
function connect(params){
	pool.getConnection(function(err,connection){
		if(err){
			console.log('Failed to establish connection with mysql database');
		}else{
			console.log('Successfully established a connection with the mysql database');
			connection.query('insert into user set ?',{
				LastName : params.LastName,
				FirstName : params.FirstName,
				phone_num : params.phone_num,
				post_code : params.post_code,
        mail : params.email
			},function(err,result){
				if(err){
					console.log('Failed to insert data');
				}else{
					console.log('Succeed to insert data');
					//当一个连接不需要使用时，将其归还到连接池中
					connection.release();
					//关闭连接池
					//pool.end();
				}
			})
		}
	})
	//处理数据库服务器连接中断时的操作
	pool.on('error',function(err){
		if(err.code === 'PROTOCOL_CONNECTION_LOST'){
			console.log('The connection with the mysql database is lost');
			//3秒后重新尝试连接数据库
			setTimeout(function(){
				connect();
			},3000);
		}else{
			throw err;
		}
	})
