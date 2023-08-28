type menuTree = {
  id: number,
  parentId: number,
  menuName: string,
  path: string,
  component: string,
  isFrame: boolean,
  menuType: number,
  seq: number,
  status: number,
  perms: string,
  icon: string,
  createTime: string,
  updateTime: string,
  child?: menuTree[]
}

export type { menuTree }