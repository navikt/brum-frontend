interface UserInfo {
  oid: string;
  username: string;
  groups: string[];
  azp?: string;
  azp_name?: string;
  NAVident?: string;
  roles?: string[];
  scp?: string[];
  idtyp?: string;
}

export type { UserInfo };