import { MigrationInterface, QueryRunner } from "typeorm";

export class init1655484131458 implements MigrationInterface {
    name = 'init1655484131458'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "account" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "created" datetime NOT NULL DEFAULT (datetime('now')), "updated" datetime NOT NULL DEFAULT (datetime('now')), "name" varchar NOT NULL, "description" varchar NOT NULL, CONSTRAINT "UQ_414d4052f22837655ff312168cb" UNIQUE ("name"))`);
        await queryRunner.query(`CREATE TABLE "type" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "created" datetime NOT NULL DEFAULT (datetime('now')), "updated" datetime NOT NULL DEFAULT (datetime('now')), "name" varchar NOT NULL, "description" varchar NOT NULL, "asset" varchar CHECK( "asset" IN ('active','passive') ), CONSTRAINT "UQ_e23bfe7255ada131861292923fe" UNIQUE ("name"))`);
        await queryRunner.query(`CREATE TABLE "finance" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "created" datetime NOT NULL DEFAULT (datetime('now')), "updated" datetime NOT NULL DEFAULT (datetime('now')), "value" double NOT NULL, "description" varchar NOT NULL, "referenceId" integer, "date" date NOT NULL, "typeId" integer NOT NULL, "sourceId" integer NOT NULL, "destinationId" integer)`);
        await queryRunner.query(`CREATE TABLE "history" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "created" datetime NOT NULL DEFAULT (datetime('now')), "updated" datetime NOT NULL DEFAULT (datetime('now')), "earned" double, "spent" double, "current" double, "date" date NOT NULL, "sourceId" integer NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "temporary_finance" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "created" datetime NOT NULL DEFAULT (datetime('now')), "updated" datetime NOT NULL DEFAULT (datetime('now')), "value" double NOT NULL, "description" varchar NOT NULL, "referenceId" integer, "date" date NOT NULL, "typeId" integer NOT NULL, "sourceId" integer NOT NULL, "destinationId" integer, CONSTRAINT "FK_81eb95858881caf4c82363241aa" FOREIGN KEY ("typeId") REFERENCES "type" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_a6765c9dc50c341520dde8a4a42" FOREIGN KEY ("sourceId") REFERENCES "account" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_47cba6af87c0b837c146cb8cd5e" FOREIGN KEY ("destinationId") REFERENCES "account" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_ca6880b3df2eec52119b94f4bf1" FOREIGN KEY ("referenceId") REFERENCES "finance" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_finance"("id", "created", "updated", "value", "description", "referenceId", "date", "typeId", "sourceId", "destinationId") SELECT "id", "created", "updated", "value", "description", "referenceId", "date", "typeId", "sourceId", "destinationId" FROM "finance"`);
        await queryRunner.query(`DROP TABLE "finance"`);
        await queryRunner.query(`ALTER TABLE "temporary_finance" RENAME TO "finance"`);
        await queryRunner.query(`CREATE TABLE "temporary_history" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "created" datetime NOT NULL DEFAULT (datetime('now')), "updated" datetime NOT NULL DEFAULT (datetime('now')), "earned" double, "spent" double, "current" double, "date" date NOT NULL, "sourceId" integer NOT NULL, CONSTRAINT "FK_7a25496d0f369261e67a2a36fe9" FOREIGN KEY ("sourceId") REFERENCES "account" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_history"("id", "created", "updated", "earned", "spent", "current", "date", "sourceId") SELECT "id", "created", "updated", "earned", "spent", "current", "date", "sourceId" FROM "history"`);
        await queryRunner.query(`DROP TABLE "history"`);
        await queryRunner.query(`ALTER TABLE "temporary_history" RENAME TO "history"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "history" RENAME TO "temporary_history"`);
        await queryRunner.query(`CREATE TABLE "history" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "created" datetime NOT NULL DEFAULT (datetime('now')), "updated" datetime NOT NULL DEFAULT (datetime('now')), "earned" double, "spent" double, "current" double, "date" date NOT NULL, "sourceId" integer NOT NULL)`);
        await queryRunner.query(`INSERT INTO "history"("id", "created", "updated", "earned", "spent", "current", "date", "sourceId") SELECT "id", "created", "updated", "earned", "spent", "current", "date", "sourceId" FROM "temporary_history"`);
        await queryRunner.query(`DROP TABLE "temporary_history"`);
        await queryRunner.query(`ALTER TABLE "finance" RENAME TO "temporary_finance"`);
        await queryRunner.query(`CREATE TABLE "finance" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "created" datetime NOT NULL DEFAULT (datetime('now')), "updated" datetime NOT NULL DEFAULT (datetime('now')), "value" double NOT NULL, "description" varchar NOT NULL, "referenceId" integer, "date" date NOT NULL, "typeId" integer NOT NULL, "sourceId" integer NOT NULL, "destinationId" integer)`);
        await queryRunner.query(`INSERT INTO "finance"("id", "created", "updated", "value", "description", "referenceId", "date", "typeId", "sourceId", "destinationId") SELECT "id", "created", "updated", "value", "description", "referenceId", "date", "typeId", "sourceId", "destinationId" FROM "temporary_finance"`);
        await queryRunner.query(`DROP TABLE "temporary_finance"`);
        await queryRunner.query(`DROP TABLE "history"`);
        await queryRunner.query(`DROP TABLE "finance"`);
        await queryRunner.query(`DROP TABLE "type"`);
        await queryRunner.query(`DROP TABLE "account"`);
    }

}
