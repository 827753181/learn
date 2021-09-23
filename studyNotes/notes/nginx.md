在 nginx 中配置 proxy_pass 时，如果在 proxy_pass 后面的 url 加/，相当于是绝对根路径，则 nginx 不会把 location 中匹配的路径部分代理走;如果没有/，则会把匹配的路径部分给代理走。

```code
# 第一种
  location /abc
  {
  proxy_pass http://106.12.74.123:83/;
  proxy_set_header Host $host;
  proxy_set_header X-Real-IP $remote_addr;
  proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  }

# 结论：会被代理到http://106.12.74.123/index.html 这个 url

# 第二种(相对于第一种，最后少一个 /)

  location /abc
  {
  proxy_pass http://106.12.74.123:83;
  proxy_set_header Host $host;
  proxy_set_header X-Real-IP $remote_addr;
  proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  }

# 结论：会被代理到http://106.12.74.123/abc/index.html 这个 url

第三种：
  location /abc
  {
  proxy_pass http://106.12.74.123:83/linux/;
  proxy_set_header Host $host;
  proxy_set_header X-Real-IP $remote_addr;
  proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  }

# 结论：会被代理到http://106.12.74.123/linux/index.html 这个 url。

# 第四种(相对于第三种，最后少一个 / )：

  location /abc
  {
  proxy_pass http://106.12.74.123:83/linux;
  proxy_set_header Host $host;
  proxy_set_header X-Real-IP $remote_addr;
  proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  }

# 结论：会被代理到http://106.12.74.123/linuxindex.html 这个 url

```
