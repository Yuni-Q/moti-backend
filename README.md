```
📦 moti-backend
├─ .env_default
├─ .eslintrc.js
├─ .github
│  └─ workflows
│    └─ node.js.yml
├─ .gitignore
├─ .prettierrc
├─ README.md
├─ appspec.yml
├─ nest-cli.json
├─ package-lock.json
├─ package.json
├─ scripts
│  ├─ install_dependencies.sh
│  ├─ restart_server.sh
│  └─ validate_server.sh
├─ src
│  ├─ answers
│  │  ├─ answers.controller.spec.ts
│  │  ├─ answers.controller.ts
│  │  ├─ answers.module.ts
│  │  ├─ answers.service.spec.ts
│  │  ├─ answers.service.ts
│  │  ├─ dto
│  │  │  ├─ answer.body.dto.ts
│  │  │  ├─ answer.days.dto.ts
│  │  │  ├─ answer.dto.ts
│  │  │  ├─ answers.dto.ts
│  │  │  ├─ delete.answer.dto.ts
│  │  │  ├─ diary.answers.dto.ts
│  │  │  ├─ exist.answer.dto.ts
│  │  │  ├─ list.answers.dto.ts
│  │  │  ├─ month.answers.dto.ts
│  │  │  └─ week.answer.dto.ts
│  │  └─ exception
│  │     ├─ exist.answer.exception.ts
│  │     ├─ invalid.answer.id.exception.ts
│  │     ├─ requrie.content.exception.ts
│  │     └─ requrie.file.exception.ts
│  ├─ app.controller.spec.ts
│  ├─ app.controller.ts
│  ├─ app.module.ts
│  ├─ app.service.ts
│  ├─ common
│  │  ├─ database
│  │  │  └─ database.module.ts
│  │  ├─ decorators
│  │  │  ├─ api-implicit-form-data.decorator.ts
│  │  │  ├─ id.decorator.ts
│  │  │  ├─ image.uploade.live.name.decorator.ts
│  │  │  ├─ image.uploader.decorator.ts
│  │  │  └─ token.user.id.decorator.ts
│  │  ├─ dto
│  │  │  └─ response.dto.ts
│  │  ├─ entity
│  │  │  ├─ Answer.entity.ts
│  │  │  ├─ File.entity.ts
│  │  │  ├─ Mission.entity.ts
│  │  │  ├─ Question.entity.ts
│  │  │  └─ User.entity.ts
│  │  ├─ env
│  │  │  ├─ env.module.ts
│  │  │  ├─ env.service.spec.ts
│  │  │  └─ env.service.ts
│  │  ├─ exception
│  │  │  ├─ custom.interval.server.error.exception.ts
│  │  │  ├─ invalid.query.exception.ts
│  │  │  ├─ invalid.token.exception.ts
│  │  │  ├─ require.body.exception.ts
│  │  │  ├─ require.id.exception.ts
│  │  │  └─ require.token.exception.ts
│  │  ├─ interceptors
│  │  │  ├─ sentry.interceptor.ts
│  │  │  ├─ transformInterceptor.interceptor.ts
│  │  │  └─ undefined.interceptor.ts
│  │  ├─ middlewares
│  │  │  ├─ logger.middleware.ts
│  │  │  └─ version.middleware.ts
│  │  └─ util
│  │     └─ date.ts
│  ├─ files
│  │  ├─ dto
│  │  │  ├─ delete.file.dto.ts
│  │  │  └─ file.dto.ts
│  │  ├─ exception
│  │  │  └─ invalid.file.id.exception.ts
│  │  ├─ files.controller.spec.ts
│  │  ├─ files.controller.ts
│  │  ├─ files.module.ts
│  │  ├─ files.service.spec.ts
│  │  └─ files.service.ts
│  ├─ main.ts
│  ├─ missions
│  │  ├─ decorators
│  │  │  └─ valid.body.ts
│  │  ├─ dto
│  │  │  ├─ delete.mission.dto.ts
│  │  │  ├─ mission.body.dto.ts
│  │  │  ├─ mission.dto.ts
│  │  │  └─ missions.dto.ts
│  │  ├─ exception
│  │  │  ├─ insufficient.refresh.count.exception.ts
│  │  │  └─ invalid.mission.id.exception.ts
│  │  ├─ missions.controller.spec.ts
│  │  ├─ missions.controller.ts
│  │  ├─ missions.module.ts
│  │  ├─ missions.service.spec.ts
│  │  └─ missions.service.ts
│  ├─ questions
│  │  ├─ decorators
│  │  │  └─ valid.body.ts
│  │  ├─ dto
│  │  │  ├─ question.dto.ts
│  │  │  ├─ questions.dto.ts
│  │  │  ├─ questions.post.request.dto.ts
│  │  │  └─ signin.response.dto.ts
│  │  ├─ questions.controller.spec.ts
│  │  ├─ questions.controller.ts
│  │  ├─ questions.module.ts
│  │  ├─ questions.service.spec.ts
│  │  └─ questions.service.ts
│  ├─ signin
│  │  ├─ decorators
│  │  │  ├─ token.decorator.ts
│  │  │  └─ valid.body.ts
│  │  ├─ dto
│  │  │  ├─ signin.request.dto.ts
│  │  │  └─ signin.response.dto.ts
│  │  ├─ exception
│  │  │  └─ valid.token.exception.ts
│  │  ├─ signin.controller.spec.ts
│  │  ├─ signin.controller.ts
│  │  ├─ signin.module.ts
│  │  ├─ signin.service.spec.ts
│  │  └─ signin.service.ts
│  └─ users
│     ├─ decorators
│     │  └─ valid.body.ts
│     ├─ dto
│     │  ├─ delete.user.dto.ts
│     │  ├─ invalid.user.id.dto.ts
│     │  ├─ user.body.dto.ts
│     │  ├─ user.dto.ts
│     │  └─ users.dto.ts
│     ├─ exception
│     │  └─ invalid.user.id.dto.ts
│     ├─ users.controller.spec.ts
│     ├─ users.controller.ts
│     ├─ users.module.ts
│     ├─ users.service.spec.ts
│     └─ users.service.ts
├─ test
│  ├─ app.e2e-spec.ts
│  └─ jest-e2e.json
├─ tsconfig.build.json
├─ tsconfig.json
└─ webpack-hmr.config.js
```

©generated by [Project Tree Generator](https://woochanleee.github.io/project-tree-generator)
