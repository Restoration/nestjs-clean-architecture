import {MigrationInterface, QueryRunner} from "typeorm";

export class users1632928219330 implements MigrationInterface {
    name = 'users1632928219330'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`dev\`.\`users\` ADD \`password\` varchar(255) NOT NULL`);
        await queryRunner.query(`DROP INDEX \`IDX_USERS\` ON \`dev\`.\`users\``);
        await queryRunner.query(`ALTER TABLE \`dev\`.\`users\` ADD UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_USERS\` ON \`dev\`.\`users\` (\`name\`, \`email\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_USERS\` ON \`dev\`.\`users\``);
        await queryRunner.query(`ALTER TABLE \`dev\`.\`users\` DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\``);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_USERS\` ON \`dev\`.\`users\` (\`name\`, \`email\`)`);
        await queryRunner.query(`ALTER TABLE \`dev\`.\`users\` DROP COLUMN \`password\``);
    }

}
