# Migration `20200907003447-create_tables`

This migration has been generated at 9/7/2020, 8:34:47 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE `dislive`.`User` (
`id` int  NOT NULL  AUTO_INCREMENT,
`email` varchar(191)  NOT NULL ,
`username` varchar(191)  NOT NULL ,
`password` varchar(191)  NOT NULL ,
`isBanned` boolean  DEFAULT false,
`createdAt` datetime(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
UNIQUE Index `User.email_unique`(`email`),
PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci

CREATE TABLE `dislive`.`Channel` (
`id` int  NOT NULL  AUTO_INCREMENT,
`name` varchar(191)  NOT NULL ,
`createdAt` datetime(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
`userId` int  NOT NULL ,
PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci

CREATE TABLE `dislive`.`Video` (
`id` int  NOT NULL  AUTO_INCREMENT,
`name` varchar(191)  NOT NULL ,
`channelId` int  NOT NULL ,
`createdAt` datetime(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci

ALTER TABLE `dislive`.`Channel` ADD FOREIGN KEY (`userId`) REFERENCES `dislive`.`User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE `dislive`.`Video` ADD FOREIGN KEY (`channelId`) REFERENCES `dislive`.`Channel`(`id`) ON DELETE CASCADE ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200907003447-create_tables
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,38 @@
+// This is your Prisma schema file,
+// learn more about it in the docs: https://pris.ly/d/prisma-schema
+
+datasource db {
+  provider = "mysql"
+  url = "***"
+}
+
+generator client {
+  provider = "prisma-client-js"
+}
+
+model User {
+  id Int @id @default(autoincrement())
+  email String @unique
+  username String
+  password String
+  isBanned Boolean? @default(false)
+  createdAt DateTime @default(now())
+}
+
+model Channel {
+  id Int @id @default(autoincrement())
+  name String
+  createdAt DateTime @default(now())
+  user User @relation(fields: [userId], references: [id])
+  userId Int
+  videos Video[]
+}
+
+model Video {
+  id Int @id @default(autoincrement())
+  name String
+  channel Channel @relation(fields: [channelId], references: [id])
+  channelId Int
+  createdAt DateTime @default(now())
+
+}
```


