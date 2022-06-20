import { MigrationInterface, QueryRunner } from "typeorm";

export class Event1655560008508 implements MigrationInterface {
  name = "Event1655560008508";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`events\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`type\` enum ('sms_notifications', 'email_notifications') NOT NULL DEFAULT 'email_notifications', \`enabled\` tinyint NOT NULL DEFAULT 0, \`userId\` varchar(255) NOT NULL, INDEX \`IDX_9929fa8516afa13f87b41abb26\` (\`userId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX \`IDX_9929fa8516afa13f87b41abb26\` ON \`events\``);
    await queryRunner.query(`DROP TABLE \`events\``);
  }
}
