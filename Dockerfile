FROM node:22-bookworm-slim

RUN apt-get update && apt-get install -y --no-install-recommends ca-certificates && apt-get clean

WORKDIR /app

ENV EMAIL_APPOINTMENT_MODE=live

COPY package*.json ./
RUN npm install --no-audit --no-fund

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start", "--", "--ip", "0.0.0.0", "--port", "3000"]
