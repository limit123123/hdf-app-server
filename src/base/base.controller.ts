import { Body, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';
import { BaseService } from './base.service';
export class BaseController {
  constructor(private readonly service: BaseService) {}

  @ApiQuery({
    name: 'page',
    description: '页码',
    required: false,
    schema: {
      type: 'integer',
      default: 1,
    },
  })
  @ApiQuery({
    name: 'per',
    description: '每页显示的数量',
    required: false,
    schema: {
      type: 'integer',
      default: 10,
    },
  })
  @Get()
  index(@Query() query) {
    const where: any = {};
    if (query.name) {
      where.name = { contains: query.name };
    }
    return this.service.findAll(where, query.page, query.per);
  }

  @ApiOperation({
    summary: '获取单条记录',
  })
  @ApiParam({
    name: 'id',
  })
  @Get(':id')
  one(@Param() params) {
    return this.service.findOne(params.id);
  }

  @ApiOperation({
    summary: '新增',
  })
  @Post()
  @ApiBody({ type: Object })
  async create(@Body() createData) {
    const data = await this.service.create(createData); // 新增的数据进行保存
    return data;
  }

  @ApiOperation({
    summary: '修改',
  })
  @Patch(':id')
  @ApiBody({ type: Object })
  update(@Param('id') id: string, @Body() updateData) {
    return this.service.update(id, updateData);
  }

  @ApiOperation({
    summary: '删除',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
