
# JGulp:利用Gulp 配置的前端项目自动化工作流
====


> 注：

> 1.因为CSS 代码主要是通过Compass 框架完成，所以本工作流不涉及CSS 压缩等其他功能模块（因为这些功能Compass 本身已经包含）。

> 2.后续多次用于实战项目后可能会有增减，即不断完善之以让个人前端工作效率最大化。


## 使用方法(mac环境)


1.  全局安装gulp

		$ sudo npm install --g gulp 

2.  安装 compass

		$ sudo gem install compass
		
3.  安装 sass

		$ sudo gem install sass

4.  进入你的项目文件夹下`clone` 本 git 项目

		$ git clone https://github.com/Jeff2Ma/JGulp.git
		
5. 按照个人的项目需求，重命名`JGulp` 文件夹为你自己的项目英文名称，填写`Project.md `文件（`Project.md`文件在项目最终打包的时候会自动重命名为`README.md`保存在`build` 文件夹），填写`package.json` 文件的项目名称部分。如果需要进一步的个性化，可以编辑`gulpfile.js` 文件。

6. 进行相关配置（如果有需要用到相关功能）：为了安全，将重要的配置信息保存到项目目录下的一个json 文件中，名为 `config.json`，该文件示例代码如下：

		{
			"project" : "yz", 	
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
相关内容（项目别名、本地服务器域名+远程服务器`用户名/密码/端口`、[sftp API](https://www.npmjs.com/package/gulp-sftp) )
		
7. 然后默认任务：

		$ gulp
	
6. 如果项目已经完成，可以通过`build` 命令进行项目相关文件收集，项目文件最终会汇集到项目目录下的`build` 文件夹中方面进一步操作

		$ gulp build

	如果需要调用Tinypng 的图片压缩，那么命令需改为：

		$ gulp build2

7. 打包`build` 文件夹下的项目文件，会自动生成`项目别名-xxxx.zip` 的文件（`xxxx` 为打包时候的时间）供交付使用或进行下一阶段的开发

		$ gulp zip
		
8. 如果要上传到远程服务器进行线上调试，可以通过该命令自动上传（需提前在 `config.json`做好配置 ）：

		$ gulp upload 






