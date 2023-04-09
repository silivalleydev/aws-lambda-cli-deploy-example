# lambda-api-cli created by steve & silivalleydev

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

#### 빌드 방법

```
$ yarn build
```

#### 함수 생성 방법

```
$ yarn create-func-code 생성할API명
```

#### 함수 배포 방법

```
$ yarn deploy
```
