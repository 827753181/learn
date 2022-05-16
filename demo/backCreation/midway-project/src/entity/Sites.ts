import { Column, Index, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { EntityModel } from '@midwayjs/orm';
import { SitesLog } from './SitesLog';

@Index('name', ['name'], { unique: true })
@EntityModel('sites', { schema: 'flb_test_db' })
export class Sites {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', {
    name: 'name',
    nullable: true,
    unique: true,
    length: 255,
  })
  name: string | null;

  @Column('varchar', { name: 'url', nullable: true, length: 255 })
  url: string | null;

  @Column('int', { name: 'id_add', nullable: true })
  id_add: number | null;

  @Column('date', { name: 'date_createa', nullable: true })
  date_createa: string | null;

  @OneToMany(() => SitesLog, sites_log => sites_log.site_)
  sites_logs: SitesLog[];
}
