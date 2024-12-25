## Build Project
1. cp .env.example .env
- file .env
```
# App
APP_NAME=webrtc
APP_PORT=3001
APP_HOST=localhost
APP_DEBUG_PORT=9229
APP_ENV=development

ALLOW_ORIGIN=*

# MYSQL CONFIG
DB_HOST=webrtc_database
DB_PORT=3306
DB_DATABASE=webrtc
DB_USERNAME=docker
DB_PASSWORD=password
DB_DIALECT=mysql
DB_POOL_MAX=5
DB_POOL_MIN=0
DB_POOL_ACQUIRE=30000
DB_POOL_IDLE=10000
DB_LOGGING=true
DB_SYNC=false

FORWARD_DB_PORT=3307

SALT_ROUND=1

# MAIL CONFIG
MAIL_HOST=
MAIL_PORT=
MAIL_USER=
MAIL_PASS=
MAIL_FROM=

URL_FRONT=
```
2. sudo chmod -R 777 .
3. docker compose build --no-cache
4. docker compose up -d
5. docker exec -it webrtc_app bash
6. npm install

Portfolio Database
===
```plantuml
@startuml

note as N1
  all tables has these 
  - created_at : datetime
  - updated_at : datetime
  - deleted_at : detetime
end note

entity users  {
  + id (PK)
  --
  username: varchar(50), not null
  email: varchar(50), not null
  password: varchar(50), not null
  avatar: varchar(50)
  status: tinyint(1), not null
}

note right of users
  status :
  - 1 : active
  - 2 : pending
  - 3 : block
end note

entity blogs {
  + id (PK)
  --
  # user_id (FK): int(11), not null
  title: varchar(255), not null
  slug: varchar(255), not null
  short_text: varchar(255), not null
  read_minutes: int(11), not null
  image: varchar(255), not null
  body: longtext, not null
  is_displayed: boolean, default: true
  order: int(11), default: 0
}

users ||-d-o{ blogs
  
entity blog_anchors {
  + id (PK)
  --
  # blog_id (FK): int(11), not null
  parent_id: int(11)
  href: varchar(255), not null
  title: varchar(255), not null
}
  
blogs ||-d-o{ blog_anchors

entity categories {
  + id (PK)
  --
  name: varchar(255), not null
  slug: varchar(255), not null
  description: text
}
  
entity blog_categories {
  + id (PK)
  --
  # blog_id (FK): int(11), not null
  # category_id (FK): int(11), not null
}
  
blogs ||-d-o{ blog_categories
categories ||-d-o{ blog_categories
  
@enduml
```
