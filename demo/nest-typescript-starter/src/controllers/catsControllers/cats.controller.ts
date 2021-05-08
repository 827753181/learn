import {
  Controller,
  Get,
  HttpCode,
  Post,
  Redirect,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AppService } from 'src/app.service';
import { CatsService } from 'src/cats/cats.service';
import { Cat } from 'src/cats/interfaces/cat.interface';
import { delay } from 'src/utils';

@Controller('cats')
export class catsController {
  constructor(
    private readonly appService: AppService,
    private catsService: CatsService,
  ) {}
  @Get('try/subRoute')
  async subRoute(@Res() res: Response, @Req() req: Request): Promise<Cat[]> {
    return this.catsService.findAll();
  }
  @Post('helloworld')
  async getHello(@Res() res: Response) {
    setTimeout(() => {
      res.send(
        JSON.stringify({
          data: [
            {
              auditId: 1,
              ticketTypeId: 111100005, //类型编码
              opId: '1111',
              ticketTypeName: 'before', //类型名称
              ticketRuleId: 0,
              ticketExpenseCollectionId: 0,
              originalPrice: 100,
              salePrice: 0, //售价
              period: null, //有效期
              periodUnit: null,
              priority: 0, //排序
              putOnTime: 1554863994000,
              putOffTime: 1555727998000,
              logoUrl: null,
              simpleDesc: null,
              commiter: null, //提交人
              auditor: null, //审核人
              auditFromStatus: 0,
              auditToStatus: 0, //审核状态
              commitTime: 1554863994000, //提交时间
              auditTime: 1555642323000, //审核时间
              auditOpDesc: '',
              auditMemo: null,
            },
            {
              ticketTypeId: '1234567881',
              ticketTypeName: '一日票1',
              price: 200,
              period: 2,
              priority: 1,
              isShow: '1', //(类型管理)
              auditToStatus: 1,
              auditMemo: '我是不通过原因',
              commiter: 'AA', //(审核管理)
              submitAuditTime: 1545967730000, //(审核管理)
              auditTime: 1545967730000, //(审核管理)
              createTime: 1545967730000, // (类型管理)
              updateTime: 1545967730000, //(类型管理)
            },
            {
              ticketTypeId: '1234567882',
              ticketTypeName: '一日票2',
              price: 200,
              period: 2,
              priority: 1,
              isShow: '1', //(类型管理)
              auditToStatus: 2,
              auditMemo: '我是不通过原因',
              commiter: 'AA', //(审核管理)
              submitAuditTime: 1545967730000, //(审核管理)
              auditTime: 1545967730000, //(审核管理)
              createTime: 1545967730000, // (类型管理)
              updateTime: 1545967730000, //(类型管理)
            },
            {
              ticketTypeId: '12345678821',
              ticketTypeName: '一日票21',
              price: 200,
              period: 2,
              priority: 1,
              isShow: '0', //(类型管理)
              auditToStatus: 2,
              auditMemo: '我是不通过原因',
              commiter: 'AA', //(审核管理)
              submitAuditTime: 1545967730000, //(审核管理)
              auditTime: 1545967730000, //(审核管理)
              createTime: 1545967730000, // (类型管理)
              updateTime: 1545967730000, //(类型管理)
            },
            {
              ticketTypeId: '1234567883',
              ticketTypeName: '一日票3',
              price: 200,
              period: 2,
              priority: 1,
              isShow: '1', //(类型管理)
              auditToStatus: 3,
              auditMemo: '我是不通过原因',
              commiter: 'AA', //(审核管理)
              submitAuditTime: 1545967730000, //(审核管理)
              auditTime: 1545967730000, //(审核管理)
              createTime: 1545967730000, // (类型管理)
              updateTime: 1545967730000, //(类型管理)
            },
          ],
          success: true,
          errMsg: 'success',
          total: 100,
        }),
      );
      res.end();
    }, 2 * 60 * 1000);
  }
  @Post(':id')
  findOne(@Req() req: Request, @Res() res: Response): Response<string> {
    return res.json({
      desc: `This action returns a #${req.params.id} cat`,
      params: JSON.stringify(req.params),
      body: JSON.stringify(req.body),
    });
  }
}
