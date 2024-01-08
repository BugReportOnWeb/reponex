FROM node:21-slim
ENV PORT=3000
WORKDIR /server
COPY . .
RUN yarn
CMD ["yarn", "run", "dev"]
EXPOSE 3000
