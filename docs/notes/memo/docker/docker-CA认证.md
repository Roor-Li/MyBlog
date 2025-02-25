---
title: springboot配置docker CA认证
createTime: 2025/02/21
permalink: /memo/4w0s46mt/
---

以下操作均在CentOS 7服务器下进行

## 制作证书及密钥

使用OpenSSL制作证书，先安装OpenSSL

### 1.创建目录

```sh
mkdir /docker-ca && cd /docker-ca
```

创建一个目录用于存储生成的证书和密钥

### 2.创建CA证书私钥

```sh
openssl genrsa -aes256 -out ca-key.pem 4096
```

执行命令后需要输入两次密码，然后会生成文件 ==ca-key.pem== ，注意请记住输入的密码

### 3.创建CA证书

```sh
openssl req -new -x509 -days 365 -key ca-key.pem -sha256 -out ca.pem
```

输入命令后需要输入上一步设定的密码，然后依次输入国家、省、市、组织名称、姓名等等信息（不关键，随意填即可），完成后生成文件 ==ca.pem== 

### 4.创建服务端私钥

```sh
openssl genrsa -out server-key.pem 4096
```

生成文件 ==server-key.pem== 

### 5.创建服务端证书签名请求文件

```sh
openssl req -subj "/CN=your_ip" -sha256 -new -key server-key.pem -out server.csr
```

生成 ==server.csr== 文件用于证书签名

### 6.配置白名单

```sh
echo subjectAltName = IP:your_servers_ip,IP:0.0.0.0 >> extfile.cnf
```

注意：0.0.0.0虽然可以任意匹配，但是仍需要配置你的服务器IP，否则可能会出错

### 7.配置docker守护程序

```sh
echo extendedKeyUsage = serverAuth >> extfile.cnf
```

限制证书只能用于验证服务器身份

### 8.创建服务端证书

```sh
openssl x509 -req -days 365 -sha256 -in server.csr -CA ca.pem -CAkey ca-key.pem \-CAcreateserial -out server-cert.pem -extfile extfile.cnf
```

创建服务端证书，并使用CA证书为其签名，这里需要用到之前设置的私钥密码，生成文件 ==server-cert.pem== 

### 9.创建客户端私钥

```sh
openssl genrsa -out key.pem 4096
```

生成文件 ==key.pem== 

### 10.创建客户端证书签名请求文件

```sh
openssl req -subj '/CN=client' -new -key key.pem -out client.csr
```

生成 ==client.csr== 文件，该文件用于CA证书给客户端证书签名

### 11.创建扩展配置文件

```sh
echo extendedKeyUsage = clientAuth >> extfile.cnf
```

限制客户端证书只能用于身份验证

### 12.创建签名好的客户端证书

```sh
openssl x509 -req -days 365 -sha256 -in client.csr -CA ca.pem -CAkey ca-key.pem \-CAcreateserial -out cert.pem -extfile extfile.cnf

```

使用CA证书和私钥密码创建客户端证书，生成文件 ==cert.pem== 

### 13.删除无用文件

```sh
rm -v client.csr server.csr
```

### 14.修改证书权限为只读

```sh
chmod -v 0400 ca-key.pem key.pem server-key.pem
chmod -v 0444 ca.pem server-cert.pem cert.pem
```

### 15.归集服务证书

```sh
cp server-*.pem  /etc/docker/ && cp ca.pem /etc/docker/
```

将服务器证书和服务器私钥以及CA证书保存到确定位置

### 16.最终文件汇总

```sh
- ca-key.pem CA证书私钥
- server-cert.pem 服务端证书
- server-key.pem 服务端证书私钥
- ca.pem CA证书
- cert.pem 客户端证书
- key.pem 客户端证书私钥
```

## 配置TLS

```sh
vi /usr/lib/systemd/system/docker.service

ExecStart=/usr/bin/dockerd --tlsverify --tlscacert=/etc/docker/ca.pem --tlscert=/etc/docker/server-cert.pem --tlskey=/etc/docker/server-key.pem -H tcp://0.0.0.0:2376 -H unix:///var/run/docker.sock
```

修改ExecStart配置，开启TLS认证，并配置CA证书、服务端证书和服务端私钥，这里使用标准2376端口

```sh
# 重新加载daemon
systemctl daemon-reload && systemctl restart docker

# 重启docker
service docker restart
```

重启以应用配置

## 开放防火墙端口

```sh
sudo firewall-cmd --permanent --add-port=2376/tcp
sudo firewall-cmd --reload
```

防护墙开放2376端口，允许任意ip

## 服务器连接测试

```sh
curl https://ip_to_docker_service:2376/version --cert /path/to/cert.pem --key /path/to/key.pem --cacert /path/to/ca.pem
```

测试其他机器是否能够成功连接docker

## springboot配置

```java
    private DockerClient createDockerClient() throws IOException {
        // 从配置文件中加载 Docker 相关配置
        String dockerServerIp = "ip"; // Docker 服务器 IP
        int dockerServerPort = 2376;            // Docker TLS 服务端口

        // 构建 Docker 客户端配置
        DockerClientConfig config = DefaultDockerClientConfig.createDefaultConfigBuilder()
                .withDockerHost("tcp://" + dockerServerIp + ":" + dockerServerPort)  // Docker 服务端地址
                .withDockerTlsVerify(true)   // 启用 TLS 验证
                .withDockerCertPath("/path/to/docker-ca")  // 证书目录
                .withApiVersion("1.45")
                .build();

        // 构建 Docker 客户端
        return DockerClientBuilder.getInstance(config).build();
    }
```

 ==注意== 证书要放置在jar包部署的机器对应目录下，并确保拥有访问权限
