
```markdown
![teamspeak](//i0.hdslb.com/bfs/new_dyn/b7b0046c4dd31887a73cb9d4875718072134449.png@880w_256h.webp)

首先是teamspeak的官网：请认准https://www.teamspeak.com/

本教程是以Linux系统作为基础，版本为ubuntu-22.04，Linux相关的基础操作，比如用终端连接和常用命令啥的，我这边不详细说，有兴趣的自己学习一下就行了。

如果没有任何Linux基础并且不想折腾，建议用Windows系统，Windows系统的服务器比这个简单多了，视频教程B站也有很多，我在这里就不赘述了。

## 一、服务器配置

本教程默认大家都有一个自己的服务器和公网IP，如果没有，可以去华为云阿里云腾讯云，学生或者新人都有优惠，99一年啥的。再或者去各种小站、外网之类的地方搞一个云服务器，服务器怎么购买怎么配置我在这里就不说了，可以去搜相关教程。

我就说一下服务器的配置，teamspeak对于服务器的硬件要求其实很低，其实1核1G的服务器就能跑得动（虽然国内基本上买不到这么低的配置），但是对带宽要求比较高。

我自己的带宽的计算方法如下，不一定正确：

teamspeak软件的每个频道都能设置音频质量，在最高质量的情况下，带宽为7.71KiB/s

上行带宽计算公式为：

> 说话人数×(频道中的人数-1)×所选编解码器带宽

假如10人服务器里，10人都在说话，那么上行带宽需要的值为：

> 10×9×7.71KiB/s=693.9KiB/s。

一般服务器用来表示带宽的单位都是Mbps，所以现在要把KiB/s换算成Mbps。

理论来说：

> 1KiB=1024B；1KB=1000B；1MB=1000KB；1B=8b(bit)

可得：

> 1KiB=1024B=1.024KB=0.001024MB=0.008192Mb。

所以上述例子中，服务器上行带宽就需要693.9KiB/s=**5.68Mbps**。

不过10人服务器基本上不太会出现10人同时说话的情况，所以5Mbps的服务器也基本上够用。

如果是4人服的话，基本上1Mbps的服务器已经够用了。

## 二、下载teamspeak服务端

进入teamspeak官网，点击Downloads，然后点击Server，进入服务端下载页面（也可以直接点击[这里](https://teamspeak.com/en/downloads/#server)）。正常情况是下载Server 64-bit的版本，如果选择32-bit的版本系统如果不对应可能会有问题。

![下载页面](//i0.hdslb.com/bfs/new_dyn/watermark/ac3029bd28d4680eea4882a4f542a39d2134449.png@1192w.webp)

## 三、开放端口

teamspeak服务器需要开放防火墙端口，下表显示了需要开放的端口：

![端口列表](//i0.hdslb.com/bfs/new_dyn/watermark/d0bb83e3ebe8e45d12a76d711c8f5cb32134449.png@1192w.webp)

其中语音服务和文件传输为必要项，其他随意。

强烈建议在服务器上安装面板（比如1Panel），图形化的界面直接启用防火墙然后开放端口就行了。

也可以在Linux里面使用命令（我是用面板的，所以以下内容未经本人测试）：

1. 开启9987端口协议UDP（如果没安装firewall命令需要先安装一下）：
```bash
firewall-cmd --zone=public --add-port=9987/udp --permanent && firewall-cmd --reload
```

2. 开启30033端口协议TCP：
```bash
firewall-cmd --zone=public --add-port=30033/tcp --permanent && firewall-cmd --reload
```

**注意如果服务器供应商的界面有防火墙设置，除了在服务器上需要开启端口之外，在服务器供应商的管理界面也需要开放端口。**

![防火墙设置](//i0.hdslb.com/bfs/new_dyn/watermark/648e9b4458a3dc4a01520c154735b4cd2134449.png@1192w.webp)

## 四、开始部署

1. 将teamspeak服务端文件上传到服务器/root文件夹下
2. 解压文件：
```bash
tar xvf teamspeak3-server_linux_amd64-3.13.7.tar.bz2
```
3. 重命名文件夹：
```bash
mv teamspeak3-server_linux_amd64 ts3server
```
4. 同意许可条款：
```bash
touch .ts3server_license_accepted
```
5. 启动服务器：
```bash
./ts3server_startscript.sh start
```

![启动界面](//i0.hdslb.com/bfs/new_dyn/watermark/f2bbf0676bc44d587cb2a5e4401b16d12134449.png@926w_552h.webp)

## 五、用其他账户部署

1. 创建用户：
```bash
useradd ts
```
2. 设置密码：
```bash
passwd ts
```
3. 创建目录并复制文件：
```bash
mkdir /home/ts
cp -R ts3server /home/ts
chown -R ts:ts /home/ts/ts3server/
```

## 六、增加自启动脚本

创建service文件：
```bash
vi /lib/systemd/system/teamspeak.service
```

示例配置：
```ini
[Unit]
Description=TeamSpeak 3 Server
After=network.target

[Service]
WorkingDirectory=/root/ts3server
User=root
Type=forking
ExecStart=/root/ts3server/ts3server_startscript.sh start inifile=ts3server.ini
RestartSec=15
Restart=always

[Install]
WantedBy=multi-user.target
```

## 七、连接服务器

![连接界面](//i0.hdslb.com/bfs/new_dyn/watermark/9c723a89304b67a4ce8b91e20f867f6e2134449.png@1192w.webp)

![服务器管理](//i0.hdslb.com/bfs/new_dyn/watermark/a9a59bb7b04e09ed0ff865e8b23bff382134449.png@1192w.webp)

![管理界面](//i0.hdslb.com/bfs/new_dyn/watermark/caebc66466e94b7ae7f8d601aa45bd192134449.png@1008w_1064h.webp)

## 八、用域名替换IP

DNS设置示例：
![DNS设置](//i0.hdslb.com/bfs/new_dyn/watermark/3c6c8b6e0919f8beffc8700931586a7f2134449.png@1192w.webp)

## 九、服务器迁移

需要保留的核心文件：
- licensekey.dat
- query_ip_*.txt
- files/
- ts3server.sqlitedb

迁移步骤：
```bash
cd /home/ts/ts3server
su ts
./ts3server_startscript.sh stop
# 复制文件后
chown -R ts:ts /home/ts/ts3server/
./ts3server_startscript.sh start
```

## 十、结语

**Roi写于2024年7月15日。**

### 参考资料：
[1] Teamspeak带宽需求 https://support.teamspeak.com/hc/en-us/articles/360002710657  
[2] 服务器迁移指南 https://support.teamspeak.com/hc/en-us/articles/360002713038  
[3] 端口说明 https://support.teamspeak.com/hc/en-us/articles/360002712257
```