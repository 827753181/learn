import { Column, Index, PrimaryGeneratedColumn } from 'typeorm';
import { EntityModel } from '@midwayjs/orm';

@Index('num', ['num'], {})
@EntityModel('flb_test_create_table', { schema: 'flb_test_db' })
export class FlbTestCreateTable {
  @Column('int', { name: 'id' })
  id: number;

  @Column('varchar', { name: 'test_name', nullable: true, length: 255 })
  test_name: string | null;

  @PrimaryGeneratedColumn({ type: 'int', name: 'num' })
  num: number;

  @Column('date', {
    name: 'createdate',
    nullable: true,
    default: () => "'_utf8mb4'2021-04-02''",
  })
  createdate: string | null;
}
