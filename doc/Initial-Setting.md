## Initial Setting

초기 세팅을 아래 번호 순대로 진행한다.

## 1. ApiGateway 세팅(세팅되어있으면 건너뛰기)

1. `API Gateway`에 들어가서 `API 생성` 버튼 클릭
   ![1](./img-API-Gateway-Setting/1.png)

2. API 유형 `HTTP API`를 찾아서 `구축` 버튼 클릭
   ![2](./img-API-Gateway-Setting/2.png)

3. `API 이름` 입력 후 `다음` 버튼 클릭
   ![3](./img-API-Gateway-Setting/3.png)

4. 경로 구성에서 `다음` 버튼 클릭
   ![4](./img-API-Gateway-Setting/4.png)

5. `스테이지 이름` 입력 후 `다음` 버튼 클릭
   ![5](./img-API-Gateway-Setting/5.png)

6. `검토 및 생성`에서 `생성` 버튼 클릭
   ![6](./img-API-Gateway-Setting/6.png)

## 2. Lambda 전용 IAM Role 생성(세팅되어있으면 건너뛰기)

1. `IAM`에서 `액세스 관리` -> `역할` 선택 후 `역할 만들기` 클릭
   ![1](./img-IAM-Role-Setting/1.png)

2. `신뢰할 수 있는 엔티티 유형`을 `AWS 서비스` 선택 후 `사용 사례`를 `Lambda`로 선택 후 `다음` 버튼 클릭
   ![2](./img-IAM-Role-Setting/2.png)

3. `권한 추가`에서 아래와 같이 권한명 검색 후 체크하는 방식으로 추가하는데, 아래에 나열되어있는 총 5개의 권한 추가 후 `다음` 버튼 클릭

- 추가할 권한

  - `AmazonEC2FullAccess`
  - `AmazonAPIGatewayPushToCloudWatchLogs`
  - `CloudWatchFullAccess`
  - `AWSLambdaBasicExecutionRole`
  - `AWSLambda_FullAccess`

  ![3](./img-IAM-Role-Setting/3.png)

4. `이름 지정, 검토 및 생성`에서 `역할 이름` 입력 후 스크롤 내려서 `역할 생성` 버튼 클릭
   ![4](./img-IAM-Role-Setting/4.png)
   ![5](./img-IAM-Role-Setting/5.png)

## VPC Security Group & Endpoint Setting(세팅되어있으면 건너뛰기)

1. `VPC`에서 `보안` -> `보안 그룹`에서 `보안 그룹 생성` 클릭
   ![1](./img-VPC-Security-Group-Setting/1.png)

2. `보안 그룹 이름` 입력 후 `설명` 입력, `인바운드 규칙` 모든 트래픽 선택 후 `보안 그룹 생성` 버튼 클릭
   ![2](./img-VPC-Security-Group-Setting/2.png)

3. `VPC`에서 `Virtual Private Cloud` -> `엔드포인트`에서 `엔드포인트 생성` 클릭

4. `엔드포인트 이름` 설정 후 `AWS 서비스` 선택 -> `서비스`에서 `dynamodb` 검색 후 선택한 다음 `엔드포인트 생성` 클릭

## 3. `.env` 파일 세팅(필수)

1. 프로젝트 루트에 .env 파일을 생성하고 아래 내용을 입력해준다. 이때 각 내용은 아래와 같이 콘솔에서 확인한다

```
IAM_ID=1111111111
AWS_REGION=us-east-1
SUBNET_IDS=subnet-11111,subnet-2222,subnet-3333,subnet-4444,subnet-5555,subnet-6666
SG_GRPS=sg-1111
LAMBDA_ROLE=lambda-role
```

- `IAM_ID`: `IAM` 대시보드 이동 후 `액세스 관리` -> `사용자`로 이동하여 `요약의 ARN`에 있는 숫자만 입력
  ![1](./ima-env-Setting/1.png)
  ![2](./ima-env-Setting/2.png)
- `AWS_REGION`: AWS Console 상단 바에 지역 선택하면 보이는 지역 코드 입력
  ![3](./ima-env-Setting/3.png)
- `SUBNET_IDS`: `VPC` 대시보드에서 `Virtual Private Cloud` -> `서브넷`으로 이동해서 디폴트 서브넷 모두 입력
  ![4](./ima-env-Setting/4.png)
- `SG_GRPS`: `VPC` 대시보드에서 `보안` -> `보안 그룹` 이동 후 람다에 설정할 보안 그룹 입력
  ![5](./ima-env-Setting/5.png)
- `LAMBDA_ROLE`: `IAM` 대시보드 이동 후 `액세스 관리` -> `역할`로 이동 후 람다에 적용할 `역할 이름` 입력

## 4. aws config 세팅

```
$ aws configure
AWS Access Key ID [None]: ACCESSKEY
AWS Secret Access Key [None]: SECKEY
Default region name [None]: us-west-2
Default output format [None]: json
```
