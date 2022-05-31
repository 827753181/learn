import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import { Sites } from '../entity/Sites';
import { ISitesOptions } from '../interface';

@Provide('SiteService')
export class SiteService {
  @InjectEntityModel(Sites)
  sitesModel: Repository<Sites>;
  async getSite(options: ISitesOptions) {
    const site = await this.sitesModel.findOne({
      where: {
        id: options.id,
      },
    });
    return {
      success: true,
      message: 'OK',
      data: site || {},
    };
  }
}
