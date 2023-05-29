# aws-lambda-cli-backend

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

#### **루트에 .env 파일 세팅**

```
IAM_ID=IAM아이디(ex:2343244353)
AWS_REGION=AWS리전(ex:ap-northeast-2)
SUBNET_IDS=람다함수실행시필요한서브넷(ex:subnet-111,subnet-222)
SG_GRPS=람다함수실행시필요한보안그룹(ex:sg-1111,sg-2222)
```

#### **루트에 awsConfig.json 파일 세팅**

```
{
  "accessKeyId": "",
  "secretAccessKey": "",
  "region": "ap-northeast-2"
}

```

#### **루트에 env.mjs 파일 생성후 아래 코드 입력**

- 애플리케이션을 사용하여 이 클러스터에 연결에 있는 주소 내용 복사

```
export const MONGODB_URI =
  "mongodb://{AWS Doc db 인스턴스 상세에 애플리케이션을 사용하여 이 클러스터에 연결에 있는 주소 내용 복사}";
export const USER_POOL_ID = "{AWS Cognito 콘솔 > 내 프로젝트의 User Pool Id}";
export const CLIENT_ID = "AWS Cognito 콘솔 > 내 프로젝트의 User Pool 이름 클릭 > 앱 통합 클릭 > 맨 아래쪽 스크롤하면 있는 Client Id";
export const REGION = "ap-northeast-2";
export const BUCKET_NAME = "이미지버킷이름";
```

#### 모듈 설치 및 import 시 주의

- 모듈 설치는 루트에서 진행하고 그후 `yarn build` 진행해준 다음 모듈을 불러올것(아래는 moment js 모듈을 설치하는 예)

```
$ yarn add moment
$ yarn build
```

- 모듈 index.mjs에서 불러오기

```js
import { sayHello, sayWorld } from "./sample.mjs";
import moment from "moment";
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
import moment from "moment";
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

#### 새로운 lambda 함수 코드 생성 방법

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

### 추가 설정 방법 (자동화 안된 영역)

[SOON 개발 > AWS Lambda 함수 가이드](https://kmongteam.atlassian.net/wiki/spaces/DDBB/pages/2845114885/SOON+AWS+Lambda)
