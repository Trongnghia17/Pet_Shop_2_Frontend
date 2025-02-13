# Sử dụng image Node.js 14
FROM node:14

# Thiết lập thư mục làm việc trong container
WORKDIR /app

# Sao chép package.json và package-lock.json vào container
COPY package*.json ./

# Cài đặt dependencies
RUN npm install

# Sao chép toàn bộ mã nguồn vào container
COPY . .

# Build ứng dụng Vue
RUN npm run build

# Cài đặt một web server nhẹ để phục vụ ứng dụng Vue (serve)
RUN npm install -g serve

# Chạy ứng dụng Vue.js với serve
CMD ["serve", "-s", "dist"]

# Expose cổng 5000 (hoặc cổng bạn muốn chạy ứng dụng)
EXPOSE 5000
