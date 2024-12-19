export interface UnifiConfig {
  controllerUrl: string;
  username: string;
  password: string;
}

export interface UnifiUserData {
  name: string;
  note: string;
  usergroup_id: string;
  site_id: string;
}