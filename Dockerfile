#build
FROM node:alpine as build
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
ARG NEXT_PUBLIC_API_BASE_URL
ARG NEXT_PUBLIC_URL
ARG NEXT_PUBLIC_AC_KEY
ARG NEXT_PUBLIC_API_KEY
ENV NEXT_PUBLIC_API_BASE_URL=${NEXT_PUBLIC_API_BASE_URL}
ENV NEXT_PUBLIC_URL=${NEXT_PUBLIC_URL}
ENV NEXT_PUBLIC_AC_KEY=${NEXT_PUBLIC_AC_KEY}
ENV NEXT_PUBLIC_API_KEY=${NEXT_PUBLIC_API_KEY}
WORKDIR /home/node/app
COPY --chown=node:node package*.json .
RUN rm -rf .next
RUN npm ci --legacy-peer-deps
COPY --chown=node:node . .
RUN npm run build

#runtime
FROM node:alpine 
WORKDIR /home/node/app
RUN ls -l /home/node/app
COPY --chown=node:node --from=build /home/node/app/package*.json .
COPY --chown=node:node --from=build /home/node/app/tsconfig*.json .
COPY --chown=node:node --from=build /home/node/app/*.config.ts .
COPY --chown=node:node --from=build /home/node/app/next.config.mjs .
COPY --chown=node:node --from=build /home/node/app/.eslintrc.json .
COPY --chown=node:node --from=build /home/node/app/Dockerfile .
COPY --chown=node:node --from=build /home/node/app/node_modules ./node_modules
COPY --chown=node:node --from=build /home/node/app/.next ./.next
USER node
EXPOSE 3000
CMD [ "npm", "start" ]