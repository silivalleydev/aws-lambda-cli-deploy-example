# lambda-api-cli created by steve & silivalleydev

#### 프로젝트 구조 설명

```
├── api: 람다 API 별 코드 작성하는 디렉토리
|   ├── sample-api
|   ├── test-api
├── build: 람다 API 별 업로드될 zip 파일이 생기는 디렉토리
|   ├── sample-api.zip
|   ├── test-api.zip
└── service: DB Access 및 비즈니스 로직 처리 Service class 파일 작성하는 디렉토리
|   ├── SampleClass.mjs
└── util: util로 사용할 js 파일을 작성하는 디렉토리
    ├── util.mjs
└── .env: 숨겨져야할 키값들을 세팅하는 파일
└── .package.json
```

#### yarn 설치 및 프로젝트 모듈 설치

```
$ npm i -g yarn
$ yarn
```

#### AWS CLI 세팅

```
$ curl "https://awscli.amazonaws.com/AWSCLIV2.pkg" -o "AWSCLIV2.pkg"
$ sudo installer -pkg ./AWSCLIV2.pkg -target /
$ which aws
$ aws --version
```

#### AWS configure 세팅

```
$ aws configure

AWS Access Key ID [None]: IAM_ACCESS_KEY
AWS Secret Access Key [None]: SECRET_KEY
Default region name [None]: ap-northeast-2
Default output format [None]: json
```

#### 루트에 .env 파일 세팅

```
IAM_ID=IAM아이디
AWS_REGION=AWS리전
```

#### 실행 역할 만들기

함수에 AWS 리소스에 액세스할 수 있는 권한을 부여하는 실행 역할을 생성

```
$ aws iam create-role --role-name lambda-ex --assume-role-policy-document '{"Version": "2012-10-17","Statement": [{ "Effect": "Allow", "Principal": {"Service": "lambda.amazonaws.com"}, "Action": "sts:AssumeRole"}]}'
```

#### 모듈 설치 시 주의

- 모듈 설치는 루트에서 진행하고 그후 `yarn build` 진행해준 다음 모듈을 불러올것(아래는 moment js 모듈을 설치하는 예)

```
$ yarn add moment
$ yarn build
```

- 모듈 index.mjs에서 불러오기

```js
import { sayHello, sayWorld } from "./sample.mjs";
import moment from "moment/moment.js";
export const handler = async (event) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify(
      moment().format("YYYY-MM-DD") + sayHello() + sayWorld()
    ),
  };
  return response;
};
```

- service, util은 현재 api 디렉토리 기준으로 불러오기

```js
import { sayHello, sayWorld } from "./sample.mjs";
import moment from "moment/moment.js";
import SampleClass from "./service/SampleClass.mjs";
import { getNewID } from "./util/util.mjs";
export const handler = async (event) => {
  const sample = new SampleClass();
  const response = {
    statusCode: 200,
    body: JSON.stringify(
      moment().format("YYYY-MM-DD") +
        sayHello() +
        sayWorld() +
        sample.whatIsThis() +
        getNewID()
    ),
  };
  return response;
};
```

#### 빌드 방법

```
$ yarn build
```

#### 함수 생성 방법

```
$ yarn create-func-code 생성할API명
```

#### 함수 배포 방법

- 전체 api 배포

```
$ yarn deploy
```

- 특정 api 하나만 배포

```
$ yarn deploy api명
```
