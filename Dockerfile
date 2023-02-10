FROM nginx:latest

COPY dist /auth-center

WORKDIR auth-center

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

# 构建镜像 docker build -t auth-center:v1.0 .
# 运行镜像 docker run -itd --name myproject -p 5289:80 auth-center:v1.0