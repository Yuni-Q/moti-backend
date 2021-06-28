
# MASH-UP 8기 backend project

<p>
  <img src="https://img.shields.io/badge/version-2.0.0-blue.svg?cacheSeconds=2592000" />
</p>

<h3> <a href="https://moti.company/apiDocs/" target="_blank">📚  API Docs</a></h3>


<h3> <a href="https://apps.apple.com/kr/app/moti/id1496912171" target="_blank">📱 iOS APP</a></h3>

<h3> <a href="https://moti.company/" target="_blank">🖥 WEB APP</a></h3>


<h3> <a href="https://www.behance.net/gallery/102667213/MOTI-Make-Own-True-Identity" target="_blank">🎨 behance</a></h3>


## 🎬 시현 영상


<a href="https://www.youtube.com/watch?v=m91rLvwMmXo" target="_black"><img src="https://img.youtube.com/vi/m91rLvwMmXo/0.jpg"></a>

### GIF

<img src="https://moti.company/moti-1.gif">
<img src="https://moti.company/moti-2.gif">


## 매일매일 미션을 수행하며 카드를 수집해 보자

- <a href="https://github.com/mash-up-kr/ahobsu-node-backend" target="_black">기존 BACKEND</a>
- <a href="https://github.com/yuni-q/moti" target="_black">기존 FRONTEND</a>

### 소개글

- "Make Own True Identity"
- <a href="https://his-0203.github.io/" target="_blank">소개페이지</a>

#### 매일 하루에 한 번 받을 질문에 답하면서 자신을 기록해보세요.

- 질문에 답을 하고 기록하는 과정에서
- 당신이 무엇을 좋아하는지
- 당신이 어떤 추억을 가지고 있었는지
- 앞으로 당신이 어떤 삶을 살고 싶은지
- 알아가 보세요.

#### 단순히 기록에서 그치지 않고 당신이 기록한 일주일은 한 장의 꿈을 담은 카드로 완성됩니다.

#### 꾸준히 하루하루를 기록하면서 카드를 수집해보세요.

### MOTI 사용법

1. 하루에 받는 질문은 총 3개! 그중 마음에 드는 질문을 선택하세요(마음에 드는 질문이 없다면 3번까지 새로 질문을 받아볼 수 있습니다)
2. 사진과 글을 이용해서 질문에 간단한 답을 하면 끝!
3. 답변을 완료한 날은 카드 그림의 한 부분이 채워집니다.
4. 일주일 동안 꾸준한 기록을 통해 완성된 카드를 수집해보세요!
5. 앨범을 통해서 기록된 내용을 되돌아볼 수 있습니다.

### 주요 기능

- 로그인 회원가입
  - 구글 로그인
  - 애플 로그인
  - 회원 탈퇴
- 매일 새로운 미션 3가지 제공
  - 미션 재발급 기능(제한적으로 제공)
- 주별로 새로운 카드 세트 제공
- 답변작성
  - 당일 답변 수정
  - 일주일치 답변 조회
  - 특정날짜 답변 조회
- 파일
  - 이미지 업로드
  - 일주일치 이미지 제공

### Quick Start

- node : v12.21.0
- npm : 6.14.11

```sh
npm i # 패키지 설치
npm run start:dev
```

- .env.default를 .env로 변경 후 키 설정

```env

AWSAccessKeyId=
AWSSecretKey=
buket=
privateKey=
TZ=Asia/Seoul
DB_USERNAME=
DB_HOST=
DB_PASSWORD=
DSN=
DATABASE=
PORT=8000
CLIENT_ID=
CLIENT_SECRET=
```

## 프로젝트 구성
<details>
<summary>폴더 구조</summary>

```
📦 moti-backend
├─ .env_default
├─ .eslintrc.js
├─ .github
│  └─ workflows
│     └─ node.js.yml
├─ .gitignore
├─ .prettierrc
├─ README.md
├─ appspec.yml
├─ nest-cli.json
├─ package-lock.json
├─ package.json
├─ scripts
│  ├─ install_dependencies.sh
│  ├─ restart_server.sh
│  └─ validate_server.sh
├─ src
│  ├─ backend
│  │  ├─ answers
│  │  │  ├─ answers.controller.spec.ts
│  │  │  ├─ answers.controller.ts
│  │  │  ├─ answers.module.ts
│  │  │  ├─ answers.service.spec.ts
│  │  │  ├─ answers.service.ts
│  │  │  ├─ dto
│  │  │  │  ├─ answer.days.dto.ts
│  │  │  │  ├─ answer.dto.ts
│  │  │  │  ├─ answers.dto.ts
│  │  │  │  ├─ delete.answer.dto.ts
│  │  │  │  ├─ diary.answers.dto.ts
│  │  │  │  ├─ exist.answer.dto.ts
│  │  │  │  ├─ list.answers.dto.ts
│  │  │  │  ├─ month.answers.dto.ts
│  │  │  │  └─ week.answer.dto.ts
│  │  │  └─ exception
│  │  │     ├─ exist.answer.exception.ts
│  │  │     ├─ invalid.answer.id.exception.ts
│  │  │     ├─ requrie.content.exception.ts
│  │  │     └─ requrie.file.exception.ts
│  │  ├─ app.controller.spec.ts
│  │  ├─ app.controller.ts
│  │  ├─ app.module.ts
│  │  ├─ app.service.ts
│  │  ├─ common
│  │  │  ├─ database
│  │  │  │  └─ database.module.ts
│  │  │  ├─ decorators
│  │  │  │  ├─ api-implicit-form-data.decorator.ts
│  │  │  │  ├─ id.decorator.ts
│  │  │  │  ├─ image-uploade-live-name.decorator.ts
│  │  │  │  ├─ image-uploader.decorator.ts
│  │  │  │  └─ token-user-id.decorator.ts
│  │  │  ├─ dto
│  │  │  │  └─ response.dto.ts
│  │  │  ├─ entity
│  │  │  │  ├─ Answer.entity.ts
│  │  │  │  ├─ File.entity.ts
│  │  │  │  ├─ Mission.entity.ts
│  │  │  │  ├─ Question.entity.ts
│  │  │  │  └─ User.entity.ts
│  │  │  ├─ env
│  │  │  │  ├─ env.module.ts
│  │  │  │  ├─ env.service.spec.ts
│  │  │  │  └─ env.service.ts
│  │  │  ├─ exception
│  │  │  │  ├─ custom.interval.server.error.exception.ts
│  │  │  │  ├─ invalid.query.exception.ts
│  │  │  │  ├─ invalid.token.exception.ts
│  │  │  │  ├─ require.body.exception.ts
│  │  │  │  ├─ require.id.exception.ts
│  │  │  │  └─ require.token.exception.ts
│  │  │  ├─ guard
│  │  │  │  ├─ login.guard.ts
│  │  │  │  └─ test.guard.ts
│  │  │  ├─ http-exception.filter.ts
│  │  │  ├─ interceptors
│  │  │  │  ├─ sentry.interceptor.ts
│  │  │  │  ├─ transformInterceptor.interceptor.ts
│  │  │  │  └─ undefined.interceptor.ts
│  │  │  ├─ middlewares
│  │  │  │  └─ version.middleware.ts
│  │  │  ├─ pipe
│  │  │  │  └─ query-number.validation.pipe.ts
│  │  │  └─ util
│  │  │     └─ date.ts
│  │  ├─ files
│  │  │  ├─ dto
│  │  │  │  ├─ delete-file.dto.ts
│  │  │  │  └─ file.dto.ts
│  │  │  ├─ exception
│  │  │  │  └─ invalid-file-id.exception.ts
│  │  │  ├─ files.controller.spec.ts
│  │  │  ├─ files.controller.ts
│  │  │  ├─ files.module.ts
│  │  │  ├─ files.service.spec.ts
│  │  │  └─ files.service.ts
│  │  ├─ main.ts
│  │  ├─ missions
│  │  │  ├─ dto
│  │  │  │  ├─ delete-mission.dto.ts
│  │  │  │  ├─ mission-body.dto.ts
│  │  │  │  ├─ mission.dto.ts
│  │  │  │  └─ missions.dto.ts
│  │  │  ├─ exception
│  │  │  │  ├─ insufficient-refresh-count.exception.ts
│  │  │  │  └─ invalid-mission-id.exception.ts
│  │  │  ├─ missions.controller.spec.ts
│  │  │  ├─ missions.controller.ts
│  │  │  ├─ missions.module.ts
│  │  │  ├─ missions.service.spec.ts
│  │  │  └─ missions.service.ts
│  │  ├─ questions
│  │  │  ├─ dto
│  │  │  │  ├─ question.dto.ts
│  │  │  │  ├─ questions-post-request.dto.ts
│  │  │  │  └─ questions.dto.ts
│  │  │  ├─ questions.controller.spec.ts
│  │  │  ├─ questions.controller.ts
│  │  │  ├─ questions.module.ts
│  │  │  ├─ questions.service.spec.ts
│  │  │  └─ questions.service.ts
│  │  ├─ signin
│  │  │  ├─ decorators
│  │  │  │  └─ token.decorator.ts
│  │  │  ├─ dto
│  │  │  │  ├─ signin-request.dto.ts
│  │  │  │  └─ signin-response.dto.ts
│  │  │  ├─ exception
│  │  │  │  └─ valid-token.exception.ts
│  │  │  ├─ signin.controller.spec.ts
│  │  │  ├─ signin.controller.ts
│  │  │  ├─ signin.module.ts
│  │  │  ├─ signin.service.spec.ts
│  │  │  └─ signin.service.ts
│  │  ├─ users
│  │  │  ├─ dto
│  │  │  │  ├─ delete-user.dto.ts
│  │  │  │  ├─ user-body.dto.ts
│  │  │  │  ├─ user.dto.ts
│  │  │  │  └─ users.dto.ts
│  │  │  ├─ exception
│  │  │  │  └─ invalid-user-id.dto.ts
│  │  │  ├─ users.controller.spec.ts
│  │  │  ├─ users.controller.ts
│  │  │  ├─ users.module.ts
│  │  │  ├─ users.service.spec.ts
│  │  │  └─ users.service.ts
│  │  └─ views
│  │     ├─ views.controller.spec.ts
│  │     ├─ views.controller.ts
│  │     ├─ views.module.ts
│  │     ├─ views.service.spec.ts
│  │     └─ views.service.ts
│  └─ front
│     ├─ components
│     │  ├─ AnswerComponent.tsx
│     │  ├─ ContentComponent.tsx
│     │  ├─ Error.test.tsx
│     │  ├─ Error.tsx
│     │  ├─ FileInput.tsx
│     │  ├─ Header.tsx
│     │  ├─ Loading.tsx
│     │  ├─ Main.tsx
│     │  ├─ Motivation.tsx
│     │  ├─ Onboard.tsx
│     │  ├─ Parts.tsx
│     │  ├─ Profile.tsx
│     │  ├─ Spinner.tsx
│     │  ├─ Submit.tsx
│     │  └─ style
│     │     ├─ BoxModel.ts
│     │     ├─ Color.ts
│     │     ├─ GlobalStyle.tsx
│     │     ├─ Layout.ts
│     │     ├─ StyledComponent.ts
│     │     └─ Typo.ts
│     ├─ models
│     │  ├─ Answer.ts
│     │  ├─ File.ts
│     │  ├─ Mission.ts
│     │  ├─ Signin.ts
│     │  └─ User.ts
│     ├─ next-env.d.ts
│     ├─ pages
│     │  ├─ _app.tsx
│     │  ├─ _document.tsx
│     │  ├─ album.tsx
│     │  ├─ answers
│     │  │  ├─ [id].tsx
│     │  │  └─ list
│     │  │     └─ [id].tsx
│     │  ├─ api
│     │  │  ├─ google.ts
│     │  │  └─ push.ts
│     │  ├─ index.tsx
│     │  ├─ login.tsx
│     │  ├─ missions
│     │  │  └─ [id].tsx
│     │  ├─ my.tsx
│     │  ├─ policy.tsx
│     │  ├─ question.tsx
│     │  └─ signUp.tsx
│     ├─ public
│     │  ├─ assets
│     │  │  ├─ images
│     │  │  │  ├─ icApple.png
│     │  │  │  ├─ icArrowLeft.png
│     │  │  │  ├─ icCameraNormal.png
│     │  │  │  ├─ icProfileToucharea.png
│     │  │  │  ├─ icRewriteNormal.png
│     │  │  │  ├─ icTextformNormal.png
│     │  │  │  ├─ imgCam.png
│     │  │  │  ├─ imgCardframe.png
│     │  │  │  ├─ imgFemale.svg
│     │  │  │  ├─ imgMale.svg
│     │  │  │  ├─ imgMypage.png
│     │  │  │  ├─ imgQuestion.png
│     │  │  │  ├─ internet.png
│     │  │  │  ├─ motiLogo.png
│     │  │  │  ├─ normal.png
│     │  │  │  ├─ onbording1.png
│     │  │  │  ├─ onbording2.png
│     │  │  │  ├─ onbording3.png
│     │  │  │  ├─ onbording4.png
│     │  │  │  └─ unknownError.png
│     │  │  └─ splash.png
│     │  ├─ favicon.png
│     │  ├─ faviconYuni.png
│     │  ├─ manifest.json
│     │  ├─ regist.js
│     │  ├─ reset.css
│     │  ├─ robots.txt
│     │  └─ service-worker.js
│     ├─ tsconfig.json
│     └─ utils
│        ├─ API.ts
│        ├─ Cookie.ts
│        ├─ LocalCache.ts
│        ├─ MemoryCache.ts
│        ├─ QueueRunner.ts
│        ├─ log.ts
│        └─ redirect.ts
├─ test
│  ├─ answers.e2e-spec.ts
│  ├─ app.e2e-spec.ts
│  ├─ bigSizeimg.jpeg
│  ├─ files.e2e-spec.ts
│  ├─ jest-e2e.json
│  ├─ missions.e2e-spec.ts
│  ├─ questions.e2e-spec.ts
│  ├─ signin.e2e-spec.ts
│  ├─ users.e2e-spec.ts
│  └─ util
│     ├─ files.ts
│     ├─ missions.ts
│     ├─ signin.ts
│     ├─ status.ts
│     └─ users.ts
├─ tsconfig.build.json
├─ tsconfig.json
└─ webpack-hmr.config.js
```
©generated by <a href="https://woochanleee.github.io/project-tree-generator" target="_black">Project Tree Generator</a>


</details>

## Error Code

| status | 상황                      |
| ------ | ------------------------- |
| 1100   | 토큰이 유효하지 않을 경우 |


## Author

👤 **Yuni-Q**

<img src="https://avatars0.githubusercontent.com/u/18049757?s=460&v=4" width=80/>

Github: <a href="https://github.com/Yuni-Q" target="_blank">@Yuni-Q</a>

👤 **YuChocopie**

<img src="https://avatars2.githubusercontent.com/u/18034145?s=460&v=4" width=80/>

Github: <a href="https://github.com/YuChocopie" target="_blank">@YuChocopie</a>

👤 **kor-Chipmunk**

<img src="https://avatars.githubusercontent.com/u/16275188?v=4" width=80/>

Github: <a href="https://github.com/kor-Chipmunk" target="_blank">@kor-Chipmunk</a>


## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check <a href="https://github.com/Yuni-Q/moti-backend/issues" target="_blank">issues page</a>.

## Show your support

Give a ⭐️ if this project helped you!

---

<details>
<summary>TODO</summary>

- 이미지 업로드 multer로 변경
- PickType으로 중복 줄이기
  - Partial : 옵셔널로 바꾸기
  - Pick : 원하는 것만 뽑아오기
  - Omit : 몇개만 지우고 싶을 때
  - IntersectionType : 타입 2개 합칠때
  - Composition : 위에 타입들을 섞어 쓸 수 있다.
- token에서 id 가져올 때 user entity에서 검증

</details>