import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserFavoriteProductTable1621146672338
  implements MigrationInterface
{
  name = 'UserFavoriteProductTable1621146672338';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user_favorite_product" ("product_id" character varying NOT NULL, "added_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "user_id" uuid NOT NULL, CONSTRAINT "PK_9793bfcc0eb12d94e61e54adbe2" PRIMARY KEY ("product_id", "user_id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_favorite_product" ADD CONSTRAINT "FK_2344991e4d811f048e1a6a94a0a" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_favorite_product" DROP CONSTRAINT "FK_2344991e4d811f048e1a6a94a0a"`,
    );
    await queryRunner.query(`DROP TABLE "user_favorite_product"`);
  }
}
