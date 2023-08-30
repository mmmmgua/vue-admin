/**
 * @param id 编号
 * @param parentId 父菜单ID
 * @param menuName 菜单名称
 * @param path 路由地址
 * @param component 组件路径
 * @param isFrame 是否为外链 0:是;1:否
 * @param menuType 菜单类型 1:目录;2:菜单;3:按钮
 * @param seq 显示顺序
 * @param status 菜单状态 0:正常;1:停用
 * @param perms 权限标识
 * @param icon 菜单图标
 * @param createTime 创建时间
 * @param updateTime 更新时间
 * @param child 子菜单
 */
type menuTree = {
  id: number,
  parentId: number,
  menuName: string,
  path: string,
  component: string,
  isFrame: 0 | 1,
  menuType: 1 | 2 | 3,
  seq: number,
  status: 0 | 1,
  perms: string,
  icon: string,
  createTime: string,
  updateTime: string
  child: menuTree[]
}

export type { menuTree }