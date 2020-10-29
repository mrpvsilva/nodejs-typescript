// eslint-disable-next-line no-unused-vars
import { MigrationInterface, QueryRunner } from 'typeorm'

export class initial1603990176076 implements MigrationInterface {
  name = 'initial1603990176076'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE `estoque` (`id` varchar(36) NOT NULL, `valorPago` decimal(10,2) NOT NULL, `margem` decimal(5,2) NOT NULL, `quantidade` int NOT NULL, `quantidadeMinima` int NOT NULL, `notaFiscal` varchar(50) NOT NULL, `produtoId` varchar(36) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB'
    )
    await queryRunner.query(
      'CREATE TABLE `produto` (`id` varchar(36) NOT NULL, `nome` varchar(100) NOT NULL, `estoqueId` varchar(36) NULL, UNIQUE INDEX `IDX_1c1927cfd2f54756f9ed55289c` (`nome`), UNIQUE INDEX `REL_7d2a55a6681f08005b19373025` (`estoqueId`), PRIMARY KEY (`id`)) ENGINE=InnoDB'
    )
    await queryRunner.query(
      'ALTER TABLE `produto` ADD CONSTRAINT `FK_7d2a55a6681f08005b193730259` FOREIGN KEY (`estoqueId`) REFERENCES `estoque`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION'
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `produto` DROP FOREIGN KEY `FK_7d2a55a6681f08005b193730259`'
    )
    await queryRunner.query(
      'DROP INDEX `REL_7d2a55a6681f08005b19373025` ON `produto`'
    )
    await queryRunner.query(
      'DROP INDEX `IDX_1c1927cfd2f54756f9ed55289c` ON `produto`'
    )
    await queryRunner.query('DROP TABLE `produto`')
    await queryRunner.query('DROP TABLE `estoque`')
  }
}
