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
©generated by [Project Tree Generator](https://woochanleee.github.io/project-tree-generator)

©generated by [Project Tree Generator](https://woochanleee.github.io/project-tree-generator)

## TODO

- 이미지 업로드 multer로 변경
- PickType으로 중복 줄이기
  - Partial : 옵셔널로 바꾸기
  - Pick : 원하는 것만 뽑아오기
  - Omit : 몇개만 지우고 싶을 때
  - IntersectionType : 타입 2개 합칠때
  - Composition : 위에 타입들을 섞어 쓸 수 있다.
- token에서 id 가져올 때 user entity에서 검증

## 배포 !
