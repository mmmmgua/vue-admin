/**
 * @param id 编号
 * @param roleName 角色名称
 * @param roleKey 角色权限字符串
 * @param seq 显示顺序
 * @param status 角色状态 0:正常;1:停用
 * @param createTime 创建时间
 */
type role = {
  id?: number,
  roleName: string,
  roleKey: string,
  seq: number,
  status: 0 | 1,
  createTime: string
}

export type { role }