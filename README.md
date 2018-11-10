There's currently a bug with this prisma configuration, and I can't seem to figure out what. 

To reproduce:

1. Make sure docker is running
2. Run `yarn docker-start`, to start the Prisma service
3. Run `yarn deploy`, to deploy everything in `./database/` to the Prisma service

After running deploy, you'll get an error:

```
Running yarn run prisma generate...
2018-11-10T19:31:18.379Z config CWD ~/Code/graphql/playground/koa-gql
2018-11-10T19:31:18.381Z config HOME ~
2018-11-10T19:31:18.385Z config definitionDir ~/Code/graphql/playground/koa-gql/database
2018-11-10T19:31:18.385Z config definitionPath ~/Code/graphql/playground/koa-gql/database/prisma.yml
2018-11-10T19:31:18.423Z cli { isGlobal: false }
2018-11-10T19:31:18.425Z StatusChecker setting status checker
2018-11-10T19:31:18.426Z cli command id generate
2018-11-10T19:31:18.435Z cli:plugincache Got plugin from cache
2018-11-10T19:31:18.435Z cli:plugincache ~/Library/Caches/prisma/plugins.json
2018-11-10T19:31:18.437Z cli:plugincache Got plugin from cache
2018-11-10T19:31:18.437Z cli:plugincache ~/Library/Caches/prisma/plugins.json
2018-11-10T19:31:18.437Z plugins findCommand prisma-cli-core
2018-11-10T19:31:18.438Z plugin requiring command
2018-11-10T19:31:18.439Z cli-engine:plugins:manager requiring ~/Code/graphql/playground/koa-gql/node_modules/prisma-cli-core
2018-11-10T19:31:19.109Z cli-engine:plugins:manager required
2018-11-10T19:31:19.110Z plugin required command
2018-11-10T19:31:19.157Z StatusChecker setting status checker

Generating schema... 31ms
Syntax Error: Expected Name, found }

GraphQL request (582:1)
581:
582: }
     ^
583:

    at syntaxError (~/Code/graphql/playground/koa-gql/node_modules/prisma-cli-core/node_modules/graphql/error/syntaxError.js:24:10)
    at expect (~/Code/graphql/playground/koa-gql/node_modules/prisma-cli-core/node_modules/graphql/language/parser.js:1463:32)
    at parseName (~/Code/graphql/playground/koa-gql/node_modules/prisma-cli-core/node_modules/graphql/language/parser.js:96:15)
    at parseInputValueDef (~/Code/graphql/playground/koa-gql/node_modules/prisma-cli-core/node_modules/graphql/language/parser.js:920:14)
    at many (~/Code/graphql/playground/koa-gql/node_modules/prisma-cli-core/node_modules/graphql/language/parser.js:1520:16)
    at parseInputFieldsDefinition (~/Code/graphql/playground/koa-gql/node_modules/prisma-cli-core/node_modules/graphql/language/parser.js:1083:50)
    at parseInputObjectTypeDefinition (~/Code/graphql/playground/koa-gql/node_modules/prisma-cli-core/node_modules/graphql/language/parser.js:1067:16)
    at parseTypeSystemDefinition (~/Code/graphql/playground/koa-gql/node_modules/prisma-cli-core/node_modules/graphql/language/parser.js:736:16)
    at parseDefinition (~/Code/graphql/playground/koa-gql/node_modules/prisma-cli-core/node_modules/graphql/language/parser.js:142:16)
    at many (~/Code/graphql/playground/koa-gql/node_modules/prisma-cli-core/node_modules/graphql/language/parser.js:1523:16)
    at parseDocument (~/Code/graphql/playground/koa-gql/node_modules/prisma-cli-core/node_modules/graphql/language/parser.js:113:18)
    at parse (~/Code/graphql/playground/koa-gql/node_modules/prisma-cli-core/node_modules/graphql/language/parser.js:48:10)
    at Object.buildSchema (~/Code/graphql/playground/koa-gql/node_modules/prisma-cli-core/node_modules/graphql/utilities/buildASTSchema.js:486:43)
    at GenereateCommand.<anonymous> (~/Code/graphql/playground/koa-gql/node_modules/prisma-cli-core/src/commands/generate/generate.ts:138:20)
    at step (~/Code/graphql/playground/koa-gql/node_modules/prisma-cli-core/dist/commands/generate/generate.js:42:23)
    at Object.next (~/Code/graphql/playground/koa-gql/node_modules/prisma-cli-core/dist/commands/generate/generate.js:23:53)
    at ~/Code/graphql/playground/koa-gql/node_modules/prisma-cli-core/dist/commands/generate/generate.js:17:71
    at new Promise (<anonymous>)
    at __awaiter (~/Code/graphql/playground/koa-gql/node_modules/prisma-cli-core/dist/commands/generate/generate.js:13:12)
    at GenereateCommand.generateTypescript (~/Code/graphql/playground/koa-gql/node_modules/prisma-cli-core/dist/commands/generate/generate.js:183:16)
    at GenereateCommand.<anonymous> (~/Code/graphql/playground/koa-gql/node_modules/prisma-cli-core/src/commands/generate/generate.ts:100:22)
    at step (~/Code/graphql/playground/koa-gql/node_modules/prisma-cli-core/dist/commands/generate/generate.js:42:23)
    at Object.next (~/Code/graphql/playground/koa-gql/node_modules/prisma-cli-core/dist/commands/generate/generate.js:23:53)
    at fulfilled (~/Code/graphql/playground/koa-gql/node_modules/prisma-cli-core/dist/commands/generate/generate.js:14:58)
    at <anonymous>
Exiting with code: 1
error Command failed with exit code 1.
```

The full debug can be found below:

```
  config CWD ~/Code/graphql/playground/koa-gql +0ms
  config HOME ~ +2ms
  config definitionDir ~/Code/graphql/playground/koa-gql/database +4ms
  config definitionPath ~/Code/graphql/playground/koa-gql/database/prisma.yml +0ms
  cli { isGlobal: false } +0ms
  StatusChecker setting status checker +0ms
  cli command id deploy +6ms
  cli:plugincache Got plugin from cache +0ms
  cli:plugincache ~/Library/Caches/prisma/plugins.json +0ms
  cli:plugincache Got plugin from cache +1ms
  cli:plugincache ~/Library/Caches/prisma/plugins.json +0ms
  plugins findCommand prisma-cli-core +0ms
  plugin requiring command +0ms
  cli-engine:plugins:manager requiring ~/.config/yarn/global/node_modules/prisma-cli-core +0ms
  cli-engine:plugins:manager required +836ms
  plugin required command +839ms
  StatusChecker setting status checker +878ms
  prisma definition making cluster here +0ms
  client Initializing cluster client +0ms
  deploy checking if project exists +0ms
  client Sending query to cluster local +2ms
  client http://localhost:4466/management +0ms
  client
  client       query($name: String! $stage: String!) {
  client         project(name: $name stage: $stage) {
  client           name
  client           stage
  client         }
  client       }
  client      +0ms
  client { name: 'default', stage: 'default' } +0ms
  deploy adding project +23ms

Creating stage default for service default...  client Sending query to cluster local +23ms
  client http://localhost:4466/management +0ms
  client       mutation addProject($name: String! $stage: String! $secrets: [String!]) {
  client         addProject(input: {
  client           name: $name,
  client           stage: $stage
  client           secrets: $secrets
  client         }) {
  client           project {
  client             name
  client           }
  client         }
  client       }
  client        +0ms
  client { name: 'default', stage: 'default', secrets: null } +1ms
  client { addProject: { project: { name: 'default' } } } +39ms
 ✔

Deploying service `default` to stage `default` to server `local`...  client Sending query to cluster local +2ms
  client http://localhost:4466/management +0ms
  client       mutation($name: String!, $stage: String! $types: String! $dryRun: Boolean $secrets: [String!], $subscriptions: [FunctionInput!], $force: Boolean) {
  client         deploy(input: {
  client           name: $name
  client           stage: $stage
  client           types: $types
  client           dryRun: $dryRun
  client           secrets: $secrets
  client           subscriptions: $subscriptions
  client           force: $force
  client         }) {
  client           errors {
  client             type
  client             field
  client             description
  client           }
  client           warnings {
  client             type
  client             field
  client             description
  client           }
  client           migration {
  client             ...MigrationFragment
  client           }
  client         }
  client       }
  client
  client fragment MigrationFragment on Migration {
  client   revision
  client   steps {
  client     type
  client     __typename
  client     ... on CreateEnum {
  client       name
  client       ce_values: values
  client     }
  client     ... on CreateField {
  client       model
  client       name
  client       cf_typeName: typeName
  client       cf_isRequired: isRequired
  client       cf_isList: isList
  client       cf_isUnique: unique
  client       cf_relation: relation
  client       cf_defaultValue: default
  client       cf_enum: enum
  client     }
  client     ... on CreateModel {
  client       name
  client     }
  client     ... on CreateRelation {
  client       name
  client       leftModel
  client       rightModel
  client     }
  client     ... on DeleteEnum {
  client       name
  client     }
  client     ... on DeleteField {
  client       model
  client       name
  client     }
  client     ... on DeleteModel {
  client       name
  client     }
  client     ... on DeleteRelation {
  client       name
  client     }
  client     ... on UpdateEnum {
  client       name
  client       newName
  client       values
  client     }
  client     ... on UpdateField {
  client       model
  client       name
  client       newName
  client       typeName
  client       isRequired
  client       isList
  client       isUnique: unique
  client       relation
  client       default
  client       enum
  client     }
  client     ... on UpdateModel {
  client       name
  client       um_newName: newName
  client     }
  client   }
  client }
  client
  client      +0ms
  client { name: 'default',
  client   stage: 'default',
  client   types: 'type Link {\n  id: ID! @unique\n  createdAt: DateTime!\n  description: String!\n  url: String!\n  postedBy: User @relation(name: "UserOnLink")\n  votes: [Vote!]! @relation(name: "LinkOnVote")\n}\n\ntype User {\n  id: ID! @unique\n  name: String!\n  email: String! @unique\n  password: String!\n  links: [Link!]! @relation(name: "UserOnLink")\n  votes: [Vote!]! @relation(name: "UserOnVote")\n}\n\ntype Vote {\n  id: ID! @unique\n  link: Link! @relation(name: "LinkOnVote")\n  user: User! @relation(name: "UserOnVote")\n}\n',
  client   dryRun: undefined,
  client   secrets: null,
  client   subscriptions: [],
  client   force: undefined } +11ms
  client { deploy:
  client    { errors: [],
  client      warnings: [],
  client      migration: { revision: 2, steps: [Array] } } } +51ms
 63ms

Changes:

  Link (Type)
  + Created type `Link`
  + Created field `id` of type `GraphQLID!`
  + Created field `createdAt` of type `DateTime!`
  + Created field `description` of type `String!`
  + Created field `url` of type `String!`
  + Created field `postedBy` of type `Relation`
  + Created field `votes` of type `[Relation!]!`
  + Created field `updatedAt` of type `DateTime!`

  User (Type)
  + Created type `User`
  + Created field `id` of type `GraphQLID!`
  + Created field `name` of type `String!`
  + Created field `email` of type `String!`
  + Created field `password` of type `String!`
  + Created field `links` of type `[Relation!]!`
  + Created field `votes` of type `[Relation!]!`
  + Created field `updatedAt` of type `DateTime!`
  + Created field `createdAt` of type `DateTime!`

  Vote (Type)
  + Created type `Vote`
  + Created field `id` of type `GraphQLID!`
  + Created field `link` of type `Relation!`
  + Created field `user` of type `Relation!`
  + Created field `updatedAt` of type `DateTime!`
  + Created field `createdAt` of type `DateTime!`

  LinkOnVote (Relation)
  + Created relation between Link and Vote

  UserOnVote (Relation)
  + Created relation between User and Vote

  UserOnLink (Relation)
  + Created relation between Link and User


Applying changes... (0/26)  client Sending query to cluster local +6ms
  client http://localhost:4466/management +0ms
  client query ($name: String! $stage: String!) {
  client           migrationStatus(name: $name stage: $stage) {
  client             projectId
  client             revision
  client             status
  client             applied
  client             rolledBack
  client             errors
  client           }
  client         }
  client          +0ms
  client { stage: 'default', name: 'default' } +1ms
  client { migrationStatus:
  client    { rolledBack: 0,
  client      applied: 2,
  client      projectId: 'default$default',
  client      errors: [],
  client      revision: 2,
  client      status: 'IN_PROGRESS' } } +49ms

Applying changes... (2/26)  client Sending query to cluster local +503ms
  client http://localhost:4466/management +0ms
  client query ($name: String! $stage: String!) {
  client           migrationStatus(name: $name stage: $stage) {
  client             projectId
  client             revision
  client             status
  client             applied
  client             rolledBack
  client             errors
  client           }
  client         }
  client          +0ms
  client { stage: 'default', name: 'default' } +0ms
  client { migrationStatus:
  client    { rolledBack: 0,
  client      applied: 26,
  client      projectId: 'default$default',
  client      errors: [],
  client      revision: 2,
  client      status: 'SUCCESS' } } +23ms

Applying changes... (26/26)
Applying changes... 1.1s

Your Prisma GraphQL database endpoint is live:

  HTTP:  http://localhost:4466
  WS:    ws://localhost:4466


post-deploy:

Running yarn run prisma generate...
2018-11-10T19:31:18.379Z config CWD ~/Code/graphql/playground/koa-gql
2018-11-10T19:31:18.381Z config HOME ~
2018-11-10T19:31:18.385Z config definitionDir ~/Code/graphql/playground/koa-gql/database
2018-11-10T19:31:18.385Z config definitionPath ~/Code/graphql/playground/koa-gql/database/prisma.yml
2018-11-10T19:31:18.423Z cli { isGlobal: false }
2018-11-10T19:31:18.425Z StatusChecker setting status checker
2018-11-10T19:31:18.426Z cli command id generate
2018-11-10T19:31:18.435Z cli:plugincache Got plugin from cache
2018-11-10T19:31:18.435Z cli:plugincache ~/Library/Caches/prisma/plugins.json
2018-11-10T19:31:18.437Z cli:plugincache Got plugin from cache
2018-11-10T19:31:18.437Z cli:plugincache ~/Library/Caches/prisma/plugins.json
2018-11-10T19:31:18.437Z plugins findCommand prisma-cli-core
2018-11-10T19:31:18.438Z plugin requiring command
2018-11-10T19:31:18.439Z cli-engine:plugins:manager requiring ~/Code/graphql/playground/koa-gql/node_modules/prisma-cli-core
2018-11-10T19:31:19.109Z cli-engine:plugins:manager required
2018-11-10T19:31:19.110Z plugin required command
2018-11-10T19:31:19.157Z StatusChecker setting status checker

Generating schema... 31ms
Syntax Error: Expected Name, found }

GraphQL request (582:1)
581:
582: }
     ^
583:

    at syntaxError (~/Code/graphql/playground/koa-gql/node_modules/prisma-cli-core/node_modules/graphql/error/syntaxError.js:24:10)
    at expect (~/Code/graphql/playground/koa-gql/node_modules/prisma-cli-core/node_modules/graphql/language/parser.js:1463:32)
    at parseName (~/Code/graphql/playground/koa-gql/node_modules/prisma-cli-core/node_modules/graphql/language/parser.js:96:15)
    at parseInputValueDef (~/Code/graphql/playground/koa-gql/node_modules/prisma-cli-core/node_modules/graphql/language/parser.js:920:14)
    at many (~/Code/graphql/playground/koa-gql/node_modules/prisma-cli-core/node_modules/graphql/language/parser.js:1520:16)
    at parseInputFieldsDefinition (~/Code/graphql/playground/koa-gql/node_modules/prisma-cli-core/node_modules/graphql/language/parser.js:1083:50)
    at parseInputObjectTypeDefinition (~/Code/graphql/playground/koa-gql/node_modules/prisma-cli-core/node_modules/graphql/language/parser.js:1067:16)
    at parseTypeSystemDefinition (~/Code/graphql/playground/koa-gql/node_modules/prisma-cli-core/node_modules/graphql/language/parser.js:736:16)
    at parseDefinition (~/Code/graphql/playground/koa-gql/node_modules/prisma-cli-core/node_modules/graphql/language/parser.js:142:16)
    at many (~/Code/graphql/playground/koa-gql/node_modules/prisma-cli-core/node_modules/graphql/language/parser.js:1523:16)
    at parseDocument (~/Code/graphql/playground/koa-gql/node_modules/prisma-cli-core/node_modules/graphql/language/parser.js:113:18)
    at parse (~/Code/graphql/playground/koa-gql/node_modules/prisma-cli-core/node_modules/graphql/language/parser.js:48:10)
    at Object.buildSchema (~/Code/graphql/playground/koa-gql/node_modules/prisma-cli-core/node_modules/graphql/utilities/buildASTSchema.js:486:43)
    at GenereateCommand.<anonymous> (~/Code/graphql/playground/koa-gql/node_modules/prisma-cli-core/src/commands/generate/generate.ts:138:20)
    at step (~/Code/graphql/playground/koa-gql/node_modules/prisma-cli-core/dist/commands/generate/generate.js:42:23)
    at Object.next (~/Code/graphql/playground/koa-gql/node_modules/prisma-cli-core/dist/commands/generate/generate.js:23:53)
    at ~/Code/graphql/playground/koa-gql/node_modules/prisma-cli-core/dist/commands/generate/generate.js:17:71
    at new Promise (<anonymous>)
    at __awaiter (~/Code/graphql/playground/koa-gql/node_modules/prisma-cli-core/dist/commands/generate/generate.js:13:12)
    at GenereateCommand.generateTypescript (~/Code/graphql/playground/koa-gql/node_modules/prisma-cli-core/dist/commands/generate/generate.js:183:16)
    at GenereateCommand.<anonymous> (~/Code/graphql/playground/koa-gql/node_modules/prisma-cli-core/src/commands/generate/generate.ts:100:22)
    at step (~/Code/graphql/playground/koa-gql/node_modules/prisma-cli-core/dist/commands/generate/generate.js:42:23)
    at Object.next (~/Code/graphql/playground/koa-gql/node_modules/prisma-cli-core/dist/commands/generate/generate.js:23:53)
    at fulfilled (~/Code/graphql/playground/koa-gql/node_modules/prisma-cli-core/dist/commands/generate/generate.js:14:58)
    at <anonymous>
Exiting with code: 1
error Command failed with exit code 1.
```
