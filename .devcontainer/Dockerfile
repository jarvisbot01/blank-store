ARG VARIANT=20-bookworm
FROM node:${VARIANT}

ARG USERNAME=node
ARG NPM_GLOBAL=/usr/local/share/npm-global

ENV PATH=${NPM_GLOBAL}/bin:${PATH}

RUN npm i npm@latest -g

RUN \
    if ! cat /etc/group | grep -e "^npm:" > /dev/null 2>&1; then groupadd -r npm; fi \
    && usermod -a -G npm ${USERNAME} \
    && umask 0002 \
    && mkdir -p ${NPM_GLOBAL} \
    && touch /usr/local/etc/npmrc \
    && chown ${USERNAME}:npm ${NPM_GLOBAL} /usr/local/etc/npmrc \
    && chmod g+s ${NPM_GLOBAL} \
    && npm config -g set prefix ${NPM_GLOBAL} \
    && su ${USERNAME} -c "npm config -g set prefix ${NPM_GLOBAL}" \
    && npm cache clean --force > /dev/null 2>&1 \
    && apt-get update \
    && apt-get install -y curl mariadb-client bat exa \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*
