export class BaseService {
  model: any;
  constructor(model: any) {
    this.model = model;
  }

  /**
   * 新增一条记录
   * @param data
   * @returns
   */
  create(data) {
    return this.model.create({
      data,
    });
  }

  /**
   * 统计数量
   * @returns
   */
  count() {
    return this.model.count();
  }

  /**
   * 分页查询
   * @param where 查询条件
   * @param page  页码
   * @param per   每页显示的数量
   * @returns
   */
  async findAll(where = {}, page = 1, per = 10) {
    page = isNaN(page) ? 1 : page * 1;
    per = isNaN(page) ? 10 : per * 1;
    const list = await this.model.findMany({
      where,
      skip: (page - 1) * per,
      take: per * 1,
    });
    const total = await this.model.count({ where });
    return {
      list,
      current: page,
      pageSize: per,
      total,
    };
  }

  /**
   * 根据id获取一个
   * @param id
   * @returns
   */
  findOne(id: string) {
    return this.model.findUnique({
      where: {
        id,
      },
    });
  }

  /**
   * 根据id修改一个
   * @param id
   * @param data
   * @returns
   */
  update(id: string, data) {
    return this.model.update({
      where: { id },
      data,
    });
  }

  /**
   * 根据id删除一个
   * @param id
   * @returns
   */
  remove(id: string) {
    return this.model.delete({ where: { id } });
  }
}