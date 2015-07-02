
# Gulp 配置说明
====


> 注：

> 1.CSS 代码主要是通过Compass


## 使用方法(mac环境)


1.  全局安装gulp

		$ sudo npm install --g gulp 

2.  安装 sass

		$ sudo gem install sass
		
3.  安装 compass

		$ sudo gem install compass

4.  进入你的项目文件夹下`clone` 本 git 项目

		$ git clone https://github.com/juxiaowei/gulp.git
		
5. 安装 gulp 包

		$ npm install

6. 进行相关sftp配置（如果有需要用到相关功能）：为了安全，将重要的配置信息保存到项目目录下的一个json 文件中，名为 `config.json`，该文件示例代码如下：

		{
			"project" : "project", 	
			"localserver" : {
    			"host" : "localhost",
    			"port" : "8081"
  			},
 			"sftp" : {
    			"host" : "8.8.8.8",
    			"user" : "username",
    			"password" : "password",
   				"port" : "post",
    			"remotePath" :"/"
 			}
		}   
> ps（项目别名、本地服务器域名、远程服务器`主机名/用户名/密码/端口/默认上传路径` )
		
7. 默认任务 (connect watch)

		$ gulp
		
8. 如果要上传到远程服务器进行线上调试，可以通过该命令自动上传（需提前在 `config.json`做好配置 ）：

		$ gulp upload 
		
9. 实时监控上传，可以通过该命令自动上传（需提前在 `config.json`做好配置 ）：

		$ gulp server 


10. 打包`dist` 文件夹下的项目文件，会自动生成`项目别名-xxxx.zip` 的文件（`xxxx` 为打包时候的时间）供交付使用或进行下一阶段的开发

		$ gulp zip
		
11. 正式发布

		$ gulp build
		






