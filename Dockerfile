# Sử dụng hình ảnh Node.js 14 làm base
FROM node:14

# Thiết lập thư mục làm việc bên trong container
WORKDIR /app

# Sao chép package.json và package-lock.json vào container
COPY package*.json ./

# Cài đặt các dependencies
RUN npm install

# Sao chép toàn bộ mã nguồn vào container
COPY . .

# Build ứng dụng Vue.js (nếu có script build)
RUN npm run build

# Expose port mà ứng dụng sẽ chạy
EXPOSE 8080

# Chạy ứng dụng (chỉnh sửa nếu cần)
CMD ["npm", "run", "serve"]
