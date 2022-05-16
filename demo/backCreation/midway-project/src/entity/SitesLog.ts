import {
  Column,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EntityModel } from '@midwayjs/orm';
import { Sites } from './Sites';

@Index('sites_id', ['site_id'], {})
@EntityModel('sites_log', { schema: 'flb_test_db' })
export class SitesLog {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'info', nullable: true, length: 255 })
  info: string | null;

  @Column('int', { name: 'site_id', nullable: true })
  site_id: number | null;

  @ManyToOne(() => Sites, sites => sites.sites_logs, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'site_id', referencedColumnName: 'id' }])
  site_: Sites;
}
