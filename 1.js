let express = require("express")();
let mysql = require("mysql")
const port = 8080;
// Node解决跨域问题
express.all("/*", function (req, res, next) {
	// 跨域处理
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
	res.header("X-Powered-By", ' 3.2.1');
	res.header("Content-Type", "application/json;charset=utf-8");
	next(); // 执行下一个路由
})
// 规划mysql链接
let sql = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "123456",
	database: "school",
	timezone:"08:00"
})
sql.connect();
// 登录接口
express.get("/login", (request, response) => {
	let name = request.query.name;
	let password = request.query.password;
	// 数据库
	sql.query(`SELECT * FROM star WHERE name="${name}" AND password="${password}"`, (error, data) => {
		if (error) {
			response.send("error")
		}
		else {
			if (!data.length) {
				response.end("error")
			}
			else {
				response.end("success")
			}
		}
	})
})
// 注册接口
express.get("/register",(request,response)=>{
	let name = request.query.name;
	let password = request.query.password;
	

	sql.query(`INSERT INTO star (name,password) VALUES ("${name}","${password}")`,(error)=>{
		if(error){
			console.log(error);
			response.send("error")
		}
		else{
			response.send("success")
		}
	})

})
// 忘记密码


// 监听在哪一个8080端口上
express.listen(port)
console.log("server is running at " + port)