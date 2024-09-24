# アプリの格納場所
ARG APPPATH="/var/app"

# ベースイメージ
FROM node:20.12.0

# ビルド時変数を実行時変数に渡す
ARG APPPATH
ENV APPPATH=${APPPATH}

# Node.js 環境
ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

# 必要なツールのインストール
RUN apt-get update && \
    apt-get install -y git && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# 作業ディレクトリの作成
RUN mkdir -p ${APPPATH}

# 作業ディレクトリを設定
WORKDIR ${APPPATH}

# パッケージ情報をコピーし、依存関係をインストール
COPY ./package*.json ./
RUN npm install -g npm && \
    npm ci && \
    npm cache clean --force

# ソースコードをコンテナにコピー
COPY . ./

# アプリケーションの起動コマンド
CMD ["npm", "run", "dev"]
